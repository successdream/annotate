<template>
  <div id='historyTemplate'>
    <el-table :data='tableDate' style='width: 100%' @expand-change="expandRow"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type='expand' style='height:500px'>
        <template slot-scope='props'>
            <history-table :title='props' ref='historys'></history-table >
        </template>
      </el-table-column>
      <el-table-column label='名字' prop='name'></el-table-column>
      <el-table-column label='操作'>
          <template slot-scope='scope'>
                <el-button type='danger' @click='deleteTemplate(scope)'>删除</el-button>    
          </template>  
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Table, TableColumn } from 'element-ui';
import historyTable from '@/components/HistoryTable.vue';
@Component({
  components: {
    historyTable
  }
})
export default class templateTask extends Vue {
  $refs!:{
    historys: historyTable
  }
  @Prop()data: any;
  public tableDate:any[] = [];
  public templateData:any[] = [];
  public currentRow:any[] = [];
  public selectData:any[] = []
  //默认不展开
  public count=0;
  public testArr=[1,2,3];
  created() {
    this.tableDate=this.data;
  }
  mounted(){
  }

  deleteTemplate(scope){
    const index = scope.$index;
    this.tableDate.splice(index,1);
  }

  expandRow(row,expandedRows){
    const name=row.name;
    this.$nextTick(()=>{
      try{
        this.$refs.historys.updataData(row)
      }catch(err){
        console.log(err)
      } 
    })   
  }

  handleSelectionChange(selection){
    if(selection instanceof Array && selection.length>0){
      this.selectData = selection;
      this.$emit('selectData',selection);
    }
  }
}
</script>
<style lang='scss' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
#historyTemplate {
  height: 100%;
}
</style>


