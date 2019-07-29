<template>
  <div id='annotation-left'>
    <el-card>
      <div slot='header' class='clearfix'>
        <span>当前图像</span>
      </div>
      <ul >
        <li v-for='(item,index) in currentPic' :key='index' style='display:flex;padding:5px 0'>
          <div style='width:60px;text-align:right;'>{{item.label}} :</div>
          <div style='margin-left:15px'>{{item.value}}</div>
        </li>
      </ul>
    </el-card>
    <el-card style='margin-top:20px'>
      <div slot='header' class='clearfix'>
        <span>任务统计</span>
      </div>
      <ul style='padding: 0'>
        <li v-for='(item,index) in currentTaskCensus' :key="index" style='display:flex;padding:5px 0'>
          <div style='width:75px;text-align:right;'>{{item.label}} :</div>
          <div style='margin-left:15px'>{{item.value}}</div>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class AnnotationLeft extends Vue {
  public currentPic: any[] = [
    {
      label: '序号',
      value: '0'
    },
    {
      label: '状态',
      value: '标注中'
    },
    {
      label: '步骤数',
      value: '0'
    }
  ];
  public currentTaskCensus = [
    {
      label: '标签',
      value: '标签1'
    },
    {
      label: '任务名',
      value: '非凡任务'
    },
    {
      label: '进度',
      value: '99%（99/100）'
    },
    {
      label: '步骤数',
      value: '6'
    },
    {
      label: '目标数',
      value: '100'
    },
    {
      label: '预计总额',
      value: '100'
    }
  ];
}
</script>
<style lang='scss' >
#annotation-left {
  .el-card__body{
      padding:0px;
  }
}
</style>
<style lang='scss' scoped>
#annotation-left {
  
}
</style>





