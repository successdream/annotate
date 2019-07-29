<template>
  <div ref='container' id='annotation-right' onselectstart='return false' style='position:relative; overflow:hidden'>
    <img ref='img' :style='imgStyle.style' :src='imgStyle.src' alt='标注图片'>
    <canvas
      ref='myCanvas'
      id='myCanvas'
      style='position:absolute;z-index:100'
      :width='`${canvasStyle.width}px`'
      :height='`${canvasStyle.height}px`'
      @mousemove='drawCanvasDashed($event)'
      @contextmenu.prevent='showRightList'
      @click='drawCanvasAnnotation'
      @mouseout='removeCnavasDashed'
    ></canvas>
    <ul ref=list
      :style='`position:absolute;top:${popmenu.top}px;left:${popmenu.left}px;z-index:100;list-style:none;width:100px;background-color:#ccc;padding:10px 10px;`'
      v-if='popmenu.isShow'
    >
      <li v-for='(item,index) in this.targetTypes' :key='index' v-text='item.label' @click.stop='chooseText($event,item)' style='padding:5px 0px;z-index:200;'></li>
    </ul>
  </div>
</template>
<script lang='ts'>

import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
@Component({
  components: {}
})
export default class AnnotationCenter extends Vue {
  @Mutation('allAnnotationData') getAllAnnotationData;
  @Watch('naturalData',{deep:true})
    checkNaturalDataChange(val) {
      this.getAllAnnotationData(val);
    }
  $refs!: {
    container: HTMLElement,
    img: HTMLImageElement,
    myCanvas: HTMLCanvasElement,
    list: HTMLUListElement
  };
  public canvasStyle = {
    width: 0,
    height: 0
  };
  public imgStyle = {
    src: '/assets/images/1.jpg',
    style: {
      position: 'absolute',
      width: '500px',
      height: '500px'
    }
  };
  //第一次点击数据
  public lastClick: { x: number, y: number } = { x: 0, y: 0 };
  //当前点击数据
  public currentClick: { x: number, y: number } = { x: 0, y: 0 };
  // 自然数，储存
  public naturalData: { x: number, y: number, height: number, width: number} = { x: 0, y: 0, height: 0, width: 0 };
  //初始化注释框
  public initializeAnnotationData: any[] = [];
  //比例
  public imgScale: { x: number, y: number } = { x: 1, y: 1 };
  //当前注释框，自然数据，为了放进初始化注释框中
  public drawCurrentRect: { x: number, y: number, width: number, height: number, font:string } = { x: 0, y: 0, width: 0, height: 0 ,font:''};
  // 鼠标位置 为了画随鼠标移动的注释框
  public mousePosition: { x: number, y: number } = { x: 0, y: 0 };
 // 选择列表
  public targetTypes = [
    { type: 'rect', name: 'person', label: '人员', attributes: [] },
    {
      type: 'rect',
      name: 'person_upper_body',
      label: '上半身',
      attributes: []
    },
    { type: 'rect', name: 'person_down_body', label: '下半身', attributes: [] },
    { type: 'rect', name: 'person_head', label: '人头', attributes: [] },
    {
      type: 'rect',
      name: 'person_head_shoulder',
      label: '头肩',
      attributes: []
    },
    { type: 'rect', name: 'bicycle', label: '自行车', attributes: [] },
    { type: 'rect', name: 'non_motor_cart', label: '电动车', attributes: [] },
    { type: 'rect', name: 'tricycle', label: '三轮车', attributes: [] }
  ];
  public popmenu: { top: number, left: number, isShow: boolean } = { top: 100, left: 100, isShow: false };

  mounted() {
    this.initializeStyle();
    window.onresize = () => {
      this.initializeStyle();
    };
  }

  //初始化样式 初始化，图片和canvas大小为可是容器大小
  initializeStyle() {
    const containerHeight = this.$refs.container.clientHeight;
    const containerWidth = this.$refs.container.clientWidth;
    this.canvasStyle = Object.assign({}, this.canvasStyle, {
      width: containerWidth,
      height: containerHeight
    });
    this.imgStyle = Object.assign({}, this.imgStyle, {
      style: {
        width: containerWidth + 'px',
        height: containerHeight + 'px',
        position: 'absolute'
      }
    });
  }

  //画虚线
  drawCanvasDashed(e) {
    let myCanvas = this.$refs.myCanvas;
    const containerHeight = this.$refs.myCanvas.clientHeight;
    const containerWidth = this.$refs.myCanvas.clientWidth;
    this.$refs.myCanvas.width = containerWidth;
    this.$refs.myCanvas.height = containerHeight;
    const x = e.offsetX;
    const y = e.offsetY;
    const ctx = myCanvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#f36';
      ctx.setLineDash([5, 15]);
      ctx.moveTo(0, y);
      ctx.lineTo(myCanvas.clientWidth, y);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, myCanvas.clientHeight);
      ctx.stroke();
    }
    this.mousePosition.x = e.offsetX;
    this.mousePosition.y = e.offsetY;
    //画虚线矩形
    this.drawRect(e, {
      x: this.mousePosition.x,
      y: this.mousePosition.y,
      isSave: false
    });
    //画矩形
    this.initializeAnnotation();
    //画字体
  }
  
  //移除canvas虚线
  removeCnavasDashed(e) {
    let myCanvas = this.$refs.myCanvas;
    const containerHeight = this.$refs.container.clientHeight;
    const containerWidth = this.$refs.container.clientWidth;
    this.$refs.myCanvas.width = containerWidth;
    this.$refs.myCanvas.height = containerHeight;
    this.initializeAnnotation();
  }

  //画标注线，应该是鼠标每移动一次，画一次
  drawCanvasAnnotation(e) {
    const ev = e || event;
    let myCanvas = this.$refs.myCanvas;
    if (ev.button === 0) {
      //1 获取点击的位置
      const clickX = ev.offsetX;
      const clickY = ev.offsetY;
      //1-2 获取上次点击的值，根据上次点击的值是否是零，判断是否已经点击过一次了
      if ( this.lastClick.x === 0 && this.lastClick.y === 0 && this.lastClick.x! == this.currentClick.x ) {
        this.lastClick = Object.assign({}, this.lastClick, { x: clickX, y: clickY });
        this.currentClick = Object.assign({}, this.currentClick, { x: clickX, y: clickY });
      } else {
        this.currentClick = Object.assign({}, this.currentClick, { x: clickX, y: clickY });
        //2 获取图片的自然宽高,当前宽度
        const { picNaturalHeight, picNaturalWidth, picCurrentHeight, picCurrentWidth } = this.getHeightWidth();
        //4 获取比值
        const currentToNaturalHeight = picCurrentHeight / picNaturalHeight;
        const currentToNaturalWidth = picCurrentWidth / picNaturalWidth;
        this.imgScale.x = currentToNaturalWidth;
        this.imgScale.y = currentToNaturalHeight;
        this.drawRect(e, { x: this.currentClick.x, y: this.currentClick.y, isSave: true });
       
        let popmenuX = this.drawCurrentRect.x;
        let popmenuY = this.drawCurrentRect.y;
        const popmenuWidth = this.drawCurrentRect.width;
        const popmenuHeight = this.drawCurrentRect.height;
        popmenuX = popmenuX + popmenuWidth;
        popmenuY = popmenuY + popmenuHeight;
        //显示弹窗
        this.promptPoupShowPosition();
      }
    } else {
      console.log('点击了右键');
    }
  }

  //初始化注释框
  initializeAnnotation() {
    const myCanvas = this.$refs.myCanvas;
    const ctx = myCanvas.getContext('2d');
    //1 获取自然数据
    let x = this.naturalData.x;
    let y = this.naturalData.y;
    let width = this.naturalData.width;
    let height = this.naturalData.height;
    //2 获取当前的图片的宽和高
    const currentHeight = this.$refs.img.clientHeight;
    const currentWidth = this.$refs.img.clientWidth;
    const naturalHeight = this.$refs.img.naturalHeight;
    const naturalWidth = this.$refs.img.naturalWidth;
    const currentToNaturalHeight = currentHeight / naturalHeight;
    const currentToNaturalWidth = currentWidth / naturalWidth;
    this.imgScale.x = currentToNaturalWidth;
    this.imgScale.y = currentToNaturalHeight;
    width = width / this.imgScale.x;
    height = height / this.imgScale.y;
    x = x / this.imgScale.x;
    y = y / this.imgScale.y;
    if (this.initializeAnnotationData.length < 1) return;
    this.initializeAnnotationData.forEach(item => {
      if (ctx) {
        ctx.setLineDash([]);
        ctx.strokeStyle = '#00008B';
        ctx.strokeRect(item.x, item.y, item.width, item.height);
        if(item.font){
          ctx.font='30px Microsoft YaHei';
          ctx.fillText(item.font,item.x,item.y-30);
        }
      }
    });
  }

  //画（随鼠标移动和双击后的矩形）
  drawRect(e, data) {
    //1 x,y ,第二个点，
    const myCanvas = this.$refs.myCanvas;
    const ctx = myCanvas.getContext("2d");
    if (this.lastClick.x === 0) return;
    let annotationDot: { x: number;y: number;width: number;height: number;font:string} = { x: 0, y: 0, width: 0, height: 0, font:'' };
    let annotationWidth = data.x - this.lastClick.x;
    let annotationHeight = data.y - this.lastClick.y;
    if (annotationWidth < 0 && annotationHeight < 0) {
      annotationDot.x = data.x;
      annotationDot.y = data.y;
    }
    if (annotationWidth > 0 && annotationHeight < 0) {
      annotationDot.x = this.lastClick.x;
      annotationDot.y = data.y;
    }
    if (annotationWidth < 0 && annotationHeight > 0) {
      annotationDot.x = data.x;
      annotationDot.y = this.lastClick.y;
    }
    if (annotationWidth > 0 && annotationHeight > 0) {
      annotationDot.x = this.lastClick.x;
      annotationDot.y = this.lastClick.y;
    }
    //标注物的宽高
    annotationWidth = Math.abs(annotationWidth);
    annotationHeight = Math.abs(annotationHeight);
    //处理超越边界的数据
    const maxWidth = annotationDot.x + annotationWidth;
    const maxHeight = annotationDot.y + annotationHeight;
    if (maxWidth > myCanvas.width)
      annotationWidth = myCanvas.width - annotationDot.x - 5;
    if (maxHeight > myCanvas.height)
      annotationHeight = myCanvas.height - annotationDot.y - 5;
    annotationDot.width = annotationWidth;
    annotationDot.height = annotationHeight;
    if (data.isSave) {
      //转换自然数据
      this.naturalData.width = this.imgScale.x * annotationWidth;
      this.naturalData.height = this.imgScale.y * annotationHeight;
      this.naturalData.y = this.imgScale.y * annotationDot.y;
      this.naturalData.x = this.imgScale.x * annotationDot.x;
      //标注点
      this.drawCurrentRect = Object.assign({}, annotationDot);
      this.initializeAnnotationData.push(this.drawCurrentRect);
      this.initializeAnnotation();
      //清空上次点击和当前点击为初始状态
      this.lastClick = { x: 0, y: 0 };
      this.currentClick = { x: 0, y: 0 };
    } else {
      //画矩形
      if (ctx) {
        ctx.setLineDash([]);
        ctx.strokeStyle = "#00008B";
        const maxWidth = annotationDot.x + annotationWidth;
        const maxHeight = annotationDot.y + annotationHeight;
        if (maxWidth > myCanvas.width)
          annotationWidth = myCanvas.width - annotationDot.x - 5;
        if (maxHeight > myCanvas.height)
          annotationHeight = myCanvas.height - annotationDot.y - 5;
        ctx.strokeRect(
          annotationDot.x,
          annotationDot.y,
          annotationWidth,
          annotationHeight
        );
        this.drawCurrentRect = Object.assign({}, annotationDot);
      }
    }
  }

  //显示弹窗
  showPoup(position) {
    this.popmenu = Object.assign({}, this.popmenu, {
      top: position.y,
      left: position.x
    });
  }

  //确定弹窗显示的位置
  promptPoupShowPosition() {
    Vue.set(this.popmenu,'isShow',true)
    this.$nextTick(() =>{
       this.poupPosition()
    })
  }

  poupPosition(){
    const leftTopX = this.drawCurrentRect.x;
    const leftTopY = this.drawCurrentRect.y;
    //标注框宽高
    const popmenuWidth = this.drawCurrentRect.width;
    const popmenuHeight = this.drawCurrentRect.height;
    const rightBottomX = leftTopX + popmenuWidth;
    const rightBottomY = leftTopY + popmenuHeight;
    const leftBottomX = leftTopX;
    const leftBottomY = leftTopY + popmenuHeight;
    const rightTopX = rightBottomX;
    const rightTopY = leftTopY;
    //列表宽高 canvas宽高
    let { canvasWidth, canvasHeight } = this.getHeightWidth();
    const listHeight=this.$refs.list.clientHeight;
    const listWidth=this.$refs.list.clientWidth;
    //弹窗默认位置
    const poupLeftTopX = rightBottomX;
    const poupLeftTopY = rightBottomY;
    const poupRightBottomX = rightBottomX + listWidth;
    const poupRightBottomY = rightBottomY + listHeight;
    const poupTopRightX = rightBottomX + listWidth;
    const poupTopRightY = rightBottomY;
    const poupLeftBottomX = poupLeftTopX;
    const poupLeftBottomY = poupRightBottomY;
    if (poupRightBottomX < canvasWidth && poupRightBottomY < canvasHeight) {
      this.showPoup({ x: poupLeftTopX, y: poupLeftTopY });
    } else if ( poupRightBottomX > canvasWidth && poupRightBottomY < canvasHeight
    ) {
      this.showPoup({ x: poupLeftTopX - listWidth, y: poupLeftTopY });
    } else if ( poupRightBottomX < canvasWidth && poupRightBottomY > canvasHeight
    ) {
      this.showPoup({ x: poupLeftTopX, y: poupLeftTopY - listHeight });
    } else if ( poupRightBottomX > canvasWidth && poupRightBottomY > canvasHeight
    ) {
      this.showPoup({ x: leftTopX-listWidth, y: leftTopY - listHeight });
    } else {
      console.log('没地方放了');
    }
  }

  //选择内容,并渲染
  chooseText(e, data) {
    const myCanvas = this.$refs.myCanvas;
    const ctx = myCanvas.getContext('2d');
    if( ctx ){
      ctx.fillText(data.label,this.currentClick.x+0,this.currentClick.x+0);
      this.drawCurrentRect.font=data.label;
      this.initializeAnnotationData.push(this.drawCurrentRect);
      Vue.set(this.popmenu,"isShow",false);
    }
  }

  //获取宽高
  getHeightWidth() {
    
    //1 获取图片的自然宽高
    const naturalHeight: number = this.$refs.img.naturalHeight;
    const naturalWidth: number = this.$refs.img.naturalWidth;

    //2 获取图片的可视宽高
    const currentHeight: number = this.$refs.img.clientHeight;
    const currentWidth: number = this.$refs.img.clientWidth;

    //3 获取canvas的可视宽高
    const myCanvasWidth: number = this.$refs.myCanvas.width;
    const myCanvasHeight: number = this.$refs.myCanvas.height;
    return {
      picNaturalHeight: naturalHeight,
      picNaturalWidth: naturalWidth,
      picCurrentHeight: currentHeight,
      picCurrentWidth: currentWidth,
      canvasWidth: myCanvasWidth,
      canvasHeight: myCanvasHeight,
    };

  }

}
</script>
<style lang="scss" scoped>
#annotation-right {
  width: 100%;
  height: 100%;
}
</style>
