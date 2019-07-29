<template>
  <div id='historyTemplate'>
    <!-- <el-table :data='tableDate' max-height='100%' style='overflow:auto' @expand-change="expandRow">
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
    </el-table> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Table, TableColumn } from 'element-ui';
import historyTable from '@/components/HistoryTable.vue';
import API from '../../api';
const uuidv4 = require("uuid/v4");
@Component({
  components: {
    historyTable
  }
})
export default class HistoryTemplate extends Vue {
  // $refs!:{
  //   historys: historyTable
  // }
  // @Prop()tab:any;
  // @Watch('tab',{deep:true})
  //   tabChange(val){
  //     if(val === '1'){
  //       this.isShowMessage = true;
  //     }else{
  //       this.isShowMessage = false;
  //     }  
  // }
  // tableDate:any = [];
  // templateData:any[] = [];
  // currentRow:any[] = [];
  // isShowMessage = false;
  // //默认不展开
  // count=0;
  // templateID = uuidv4();
  // async created() {
  //   this.tableDate = await this.getHistoryTemplateData();
  // }
  // mounted(){
    
  // }
  // async getHistoryTemplateData(){
  //   try{
  //     const res = await API.template.getHistoryTemplateData();
  //     if(res.status === 200){
  //       return res.data;
  //     }else{
  //       console.log(res.status);
  //     }
      
  //   }catch(err){
  //     if(!this.isShowMessage) return;
  //     this.$message.error('获取历史模板数据失败')
  //   }
  // }
  // //获取删除模板数据
  // async getDeleteTemplate(id){
  //   try{
  //     const res = await API.template.deleteHistoryTemplateData(id);
  //     if(res.status === 200){
  //       return res.data;
  //     }else{
  //       console.log(res.status);
  //     }
  //   }catch(err){
  //     if(!this.isShowMessage) return;
  //     this.$message.error('获取历史模板数据失败')
  //   }
  // }

  // async deleteTemplate(scope){
  //   const id = scope.row.id;
  //   const res = await this.getDeleteTemplate(id);
  //   if(res && res.status === 200 && res.data.result === true){
  //     const index = scope.$index;
  //     this.tableDate.splice(index,1);
  //   }else{
  //     this.$message.error('删除模板失败')
  //   }
  // }

  // expandRow(row,expandedRows){
  //   const name=row.name;
  //   this.$nextTick(()=>{
  //     try{
  //       this.$refs.historys.updataData(row)
  //     }catch(err){
  //       console.log(err)
  //     } 
  //   })   
  // }
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


