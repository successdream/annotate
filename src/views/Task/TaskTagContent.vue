<template>
  <div id='tag'>
    <el-table :data='treeTableData' ref='filterTable' style='overflow:auto' max-height='100%' @expand-change='expandRow'>
       <el-table-column type="selection" width="55"></el-table-column>
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
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import API from '../../api';
import tagTable from './TaskTagTable.vue';

@Component({
  components: {tagTable }
})
export default class Tag extends Vue {
  $refs!:{
    tagTable:tagTable
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
    console.log(firstData);
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
   //选择项变化的时候
  handleSelectionChange(selection) {
    if (selection instanceof Array && selection.length > 0) {
      this.$store.commit("selectData", selection);
    }
  }
}
</script>

<style lang='scss' scoped>
#tag {
  width: 100%;
  height: 100%;
}
</style>