<template>
  <div id='tag'>
    <el-table :data='treeTableData' ref='filterTable' style='overflow:auto' max-height='100%' @expand-change='expandRow'>
      <el-table-column type='expand'>
        <template slot-scope='props'>
          <tag-table :title='props' ref='tagTable'></tag-table>
        </template>
      </el-table-column>
      <el-table-column prop='tag' label='标签'>
        <template slot-scope='scope'>
          <el-tag disable-transitions>{{scope.row.label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop='description' label='描述' w_idth='180'></el-table-column>
      <el-table-column label='操作'>
        <template slot-scope='scope'>
          <el-button size='mini' type='primary' @click='handleAdd(scope.$index, scope.row)'>添加</el-button>
          <el-button size='mini' type='success' @click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
          <el-button size='mini' type='danger' @click='handleDelete(scope.$index, scope.row)' :before-close='handleDelete'>删除</el-button>
          <el-button size='mini' type='info' @click='handleLook(scope.$index, scope.row)'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TagController @editData='editDataFn' @addData='addDataFn' ref='adel'></TagController>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import API from '../../api';
import TagController from './TagController.vue';
import tagTable from './TagTable.vue';

@Component({
  components: { TagController, tagTable }
})
export default class Tag extends Vue {
  $refs!:{
    adel: TagController,
    tagTable:tagTable
  }
  @Watch('addData')
    addDataChange(val){
      this.addData = val;
      this.mapAddData(this.treeTableData,this.addData);
    }
  @Watch('editData')
    editDataChange(val){
    
      this.editData = val;
      this.mapEditData(this.treeTableData,this.editData);
    }
  public dialogVisible: boolean = false;
  public tableData:any[] = [];
  public treeTableData:any[]=[];
  public addData:any = [];
  public editData:any = [];
  async mounted() {
    await this.getTagData();
    const firstData = this.firstData();
    this.mapTagData(firstData);
    this.treeTableData = firstData;
  }
  async getTagData(){
    try{
      const res = await API.tags.getTags();
      if(res && res.status === 200 && res.data){
        this.tableData = res.data;
      }
    }catch(err){
      this.$message.error('获取标签页失败');
    }
  }
  //得到编辑的数据
  getHandleEdit(){

  }
  //编辑数据
  handleEdit(index, row) {
    this.$refs.adel.show({ index: index,data: row },'edit');
  }
  //编辑数据
  mapEditData(data,item){
    for(let i=0;i<data.length;i++){
      if(data[i]._id===item._id){
        data[i] = Object.assign(data[i],item);
      }
    }
  }
   //从子页面接受数据
  editDataFn(data){
    this.editData = data;
  }

  //增
  handleAdd(index,row) {
    this.$refs.adel.show({ index: index,data: row },'add');
  }
  //添加数据
  mapAddData(data,item){
     console.log(data)
    for(let i=0;i<data.length;i++){
      console.log(data[i]._id,item.parentId)
      if(data[i]._id === item.parentId){
        if(data[i].children){
          console.log(item)
          data[i].children.push(item);
        }else{
          data[i].children = [];
          data[i].children.push(item);
        }
      }
      if(data[i].children && data[i].children.length>0){
        this.mapAddData(data[i].children,item)
      }
    }
  }
  //从子页面接受数据
  addDataFn(data){
    this.addData = data;
  }

  //得到删除数据
  async getHandleDeleteData(data){
    try{
      const res = await API.tags.deleteTags(data);
      return res;
    }catch(err){
      this.$message.error('删除标签失败');
    }
  }
  //删除
  async handleDelete(index, row) {
    const res = await API.utils.confirm(this,'确定要删除(' + row.label + ')?');
    const result = await API.tags.deleteTags(row._id);
    console.log(result)
    console.log(res === true)
    console.log(result.status === 200)
    console.log(result.data.result === true)
    if(res === true && result && result.status === 200 && result.data.result === true){
      this.mapDeleteData(this.treeTableData,row);
      this.$message({
        type:'success',
        message:'删除成功'
      });
    }else{
      this.$message.error('删除失败');
    }
  }
  //遍历数据，找到需要删除的数据
  mapDeleteData(data,item){
    console.log(data,item)
     for(let i = 0;i<data.length;i++){
       if(data[i]._id === item._id){
         data.splice(i,1);
       }
     }
  }

  //查看
  handleLook(index, row) {
    this.$refs.adel.show({ index: index,data: row },'look');
  }

  //获取第一轮数据
  firstData() {
    const data = this.tableData;
    let arrData: any[] = [];
    for (var b = 0; b < data.length; b++) {
      let isHasParent: boolean = false;
      let recordVal: any = null;
      for (var d = 0; d < data.length; d++) {
        if (data[b].parentId === data[d]._id) {
          isHasParent = true;
        }
        if (!isHasParent) {
          recordVal = data[b];
        } else {
          recordVal = null;
        }
      }
      if (!isHasParent && recordVal !== null){
         recordVal.select =false;
         arrData.push(recordVal);
      }
    }
    return arrData;
  }
  //遍历所有的数据
  mapTagData(firstData) {
    const data = this.tableData;
    if (firstData instanceof Array && firstData.length >0) {
      for (var i = 0; i < firstData.length; i++) {
        for (var a = 0; a < data.length; a++) {
          if (data[a].parentId === firstData[i]._id) {
            if (firstData[i].children === undefined) {
              firstData[i].children = [];
              data[a].select = false;
              firstData[i].children.push(data[a]);
            } else {
              data[a].select = false;
              firstData[i].children.push(data[a]);
            }
          }
        }
        if (firstData[i].children) {
          this.mapTagData(firstData[i].children);
        }
      }
    }
  }
  //展开或关闭数据
  expandRow(row, expandedRows) {
    this.$nextTick(() => {
      try {
        if(this.$refs.tagTable === undefined || row.children === undefined) return;
        this.$refs.tagTable.updataTagTableData(row.children);
      } catch (err) {
        console.log(err);
      }
    });
  }
  //组件销毁前把数据保存早vueX中，已备在上传图片页面使用
  beforeDestroy() {
    this.$store.commit('allTags', {
      data: this.tableData
    });
  }
}
</script>

<style lang='scss' scoped>
#tag {
  position: absolute;
  top: 44px;
  bottom: 0px;
  z-index: 300;
}
</style>