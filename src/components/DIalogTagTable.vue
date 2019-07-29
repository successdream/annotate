
 <template>
  <div id=diatable>
    <el-dialog title=收货地址 :visible.sync=dialogTableVisible >
      <div class='list-box'>
        <ul class='ul-list'  @click='getTag' >
          <li class='li-style li-header' >
            <div>姓名</div>
            <div>描述</div>
            <div>标签</div>
          </li>
          <li class='li-style' v-for='(item,index) in tableData' :key='index'>
            <div>{{item.name}}</div>
            <div>{{item.description}}</div>
            <div>
               <el-tag>{{item.label}}</el-tag>
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Form as ElForm, Dialog } from 'element-ui';

@Component({
  components: {}
})
export default class DialogTagTable extends Vue {

  tableData:any[] = [];
  dialogTableVisible:boolean = false;
  dialogFormVisible:boolean =  false;
  form = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  };
  formLabelWidth= '120px'
 
  show(data) {
    this.dialogTableVisible = data.dialogTableVisible;
    this.tableData = this.$store.state.allTags;
  }
  
  getTag(e){
    const currentDOM=e.target.parentNode;
    const allLi=((document)as any).querySelector('.ul-list').children;
    const arr:any[]=[];
    const index=arr.indexOf.call(allLi,currentDOM);
    if(index==0) return;
    if(index) this.dialogTableVisible=false;
    this.$emit('tagindex',index);
  }
}
</script>
<style lang='scss' scoped>
#diatable {
  .list-box {
       height: 580px;
       overflow: auto;
    .ul-list {
      .el-dialog__body {
        padding-top: 10px;
      }
      .li-header {
        font-size: 18px;
        font-weight: bold;
      }
      .li-style {
        display: flex;
        list-style: none;
        div {
          flex: 1;
          padding: 15px;
        }
      }
    }
  }
}
</style>
