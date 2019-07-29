<template>
  <div id='templates'  >
    <!-- <el-tabs tab-position='left' style='height:100%;' class='tabs-box' @tab-click='tabIt' >
      <el-tab-pane label='新建模板' v-model='newTab' style='height:100%;'>
        <newTemplate></newTemplate>
      </el-tab-pane>
      <el-tab-pane label='历史模板' v-model='historyTab' style='height:100%;'>
        <historyTemplate :tab='tabTitle'></historyTemplate>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import newTemplate from './NewTemplate.vue';
import historyTemplate from './HistoryTemplate.vue';
import { Tabs,TabPane  } from 'element-ui';

@Component({
  components: {
     newTemplate,
     historyTemplate
  }
})
export default class Template extends Vue {
  //    public newTab:string = '0';
  //    public historyTab:string = '1';
  //    public tabTitle:string = '0';
  //    created(){
    
  //    }
  //  tabIt(val){
  //     this.tabTitle = val.index;
  //  }
}
</script>
<style lang='scss'>
  #templates{
    //此类解决表格内容不显示的问题
    .el-tabs__content{
       height: 90%;
     }
     .el-tabs__item{
       width: 160px;
       text-align: center !important;
     }
  }
</style>
<style lang='scss' scoped>
#templates{

}

</style>


