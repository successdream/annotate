<template>
  <div>
    <el-table :data='tableData' stripe style='overflow:auto' max-height='100%'>
      <el-table-column prop='date' label='序号' width='180'>
        <template slot-scope='{row,$index}'>
          <span>{{$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop='name' label='描述物' width='180'>
        <template slot-scope='{row,$index}'>
          <el-input  class='edit-cell' v-model='row.value' v-if='showEdit[$index]' placeholder='请输入内容' ></el-input>
          <span v-if='!showEdit[$index]'>{{row.value}}</span>
        </template>
      </el-table-column>
      <el-table-column prop='address' label=操作>
        <template slot-scope='{row,$index}'>
          <el-button type='text' size='small' @click.native='handleUpdate($index, row)' v-if='showBtn[$index]'>更新</el-button>
          <el-button type='text' size='small' @click.native='handelCancel($index, row)' v-if='showBtn[$index]'>取消</el-button>
          <el-button type="text" size='small' @click.native='handleEdit($index, row)' v-if='!showBtn[$index]' >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import API from '../api';
@Component({
  components: {}
})
export default class HistoryTable extends Vue {
  public tableData:{ [propName: string]: any }[] = [
    {
      label: 'triangle',
      value: '自行车'
    },
    {
      label: 'rect',
      value: '汽车'
    }
  ];
  public showEdit:any[] = []; //显示编辑框
  public showBtn: any[] = [];
  public showBtnOrdinary: boolean = true;
  public id: number = 0;
  public beforeUpdateData: string = '';
  created() {
    if (this.tableData && this.tableData.length > 0) {
      this.tableData.forEach(item => {
        this.showEdit.push(false);
      });
      this.tableData.forEach(item => {
        this.showBtn.push(false);
      });
    }
  }
  //点击编辑
  handleEdit(index, row) {
    let data = this.tableData;
    data = data.slice(0);
    const dealData = JSON.stringify(data)
    this.beforeUpdateData = dealData;
    this.showEdit.splice(index, 1, true);
    this.showBtn.splice(index, 1, true);
  }
  //取消编辑
  handelCancel(index, row) {
      this.showEdit.splice(index, 1, false);
      this.showBtn.splice(index, 1, false);
  }
  //获取编辑数据
   async getEditHistoryTemplateData(data,id){
    try{
      const res = await API.template.editHistoryTemplateData(data,id);
      if(res.status === 200) {
        return res
      }else {
        this.$message.error('编辑模板失败');
        return false;
      }
    }catch(err){
       this.$message.error('编辑模板失败');
       return false;
    }
  }
  //点击更新
  async handleUpdate(index, row) {
    const data = await this.getEditHistoryTemplateData(this.tableData,this.id);
    this.showEdit.splice(index, 1, false);
    this.showBtn.splice(index, 1, false);
    console.log(data)
    if(!data) {
      const oldData = JSON.parse(this.beforeUpdateData);
      this.tableData = oldData;
      this.$message.error('更新失败');
      return;
    }else{
      if(data.data.result){
        this.beforeUpdateData = JSON.stringify(this.tableData);
        this.$message({
          type:'success',
          message:'更新成功'
        });
      }else{
        this.$message.error('更新失败');
      }
    }
  }
  //更新数据
  updataData(data){
    this.id = data.id;
    this.tableData=data.data
  }
}
</script>
