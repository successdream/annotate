<template>
  <div id="TagTable" v-show="show">
    <el-table
      :data="tableData"
      ref="filterTable"
      max-height="100%"
      style="overflow:auto"
      @expand-change="expandRow"
      @selection-change="handleSelectionChange"
      :show-header="false"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <tag-table :title="props" ref="tagTable"></tag-table>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="标签">
        <template slot-scope="scope">
          <el-tag disable-transitions>{{scope.row.label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :before-close="handleDelete"
          >删除</el-button>
          <el-button size="mini" type="info" @click="handleLook(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TagController @editData="editDataFn" @addData="addDataFn" ref="adel"></TagController>
  </div>
</template>
<script lang=ts>
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";
import API from "../../api";
import TagController from "./TagController.vue";

@Component({
  components: {
    TagController
  }
})
export default class TagTable extends Vue {
  $refs!: {
    adel: TagController;
    tagTable: TagTable;
  };
  @Watch("tableData", { deep: true })
  tableDataChange(val) {
    if (this.tableData && this.tableData.length > 0) {
      this.show = true;
    }
  }
  @Watch("addData")
  addDataChange(val) {
    this.addData = val;
    this.mapAddData(this.tableData, this.addData);
  }
  @Watch("editData")
  editDataChange(val) {
    this.editData = val;
    this.mapEditData(this.tableData, this.editData);
  }
  public dialogVisible: boolean = false;
  public tableData: any[] = [];
  public selectData: any[] = [];
  public show: boolean = false;
  public addData: any = [];
  public editData: any = [];

  async created() {}
  //改
  handleEdit(index, row) {
    this.$refs.adel.show({ index: index, data: row }, "edit");
  }
  mapEditData(data, item) {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]._id, item._id);
      if (data[i]._id === item._id) {
        console.log(data[i], item);
        data[i] = Object.assign(data[i], item);
      }
    }
  }
  editDataFn(data) {
    this.editData = data;
  }

  //增
  handleAdd(index, row) {
    this.$refs.adel.show({ index: index, data: row }, "add");
  }
  //从子页面接受数据
  addDataFn(data) {
    this.addData = data;
  }
  
  mapAddData(data, item) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === item.parentId) {
        if (data[i].children) {
          data[i].children.push(item);
        } else {
          data[i].children = [];
          data[i].children.push(item);
        }
      }
    }
  }
 
   async handleDelete(index, row) {
    const res = await API.utils.confirm(this,'确定要删除(' + row.label + ')?');
    const result = await API.tags.deleteTags(row._id);
    console.log(result)
    console.log(res === true)
    console.log(result.status === 200)
    console.log(result.data.result === true)
    if(res === true && result && result.status === 200 && result.data.result === true){
      this.mapDeleteData(this.tableData,row);
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
    this.$refs.adel.show({ index: index, data: row }, "look");
  }

  mounted() {
    const firstData = this.firstData();
    this.mapTagData(firstData);
    this.tableData = firstData;
  }
  //整理数据
  firstData() {
    const data = this.tableData;
    let arrData: any[] = [];
    for (var b = 0; b < data.length; b++) {
      let isHasParent: boolean = false;
      let recordVal: any = null;
      for (var d = 0; d < data.length; d++) {
        if (data[b].parentId === data[d].Id) {
          isHasParent = true;
        }
        if (!isHasParent) {
          recordVal = data[b];
        } else {
          recordVal = null;
        }
      }
      if (!isHasParent && recordVal !== null) {
        recordVal.select = false;
        arrData.push(recordVal);
      }
    }
    return arrData;
  }

  mapTagData(firstData) {
    const data = this.tableData;
    if (firstData instanceof Array && firstData.length > 1) {
      for (var i = 0; i < firstData.length; i++) {
        for (var a = 0; a < data.length; a++) {
          if (data[a].parentId === firstData[i].Id) {
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

  expandRow(row, expandedRows) {
    this.$nextTick(() => {
      try {
        if (this.$refs.tagTable === undefined || row.children === undefined)
          return;
        this.$refs.tagTable.updataTagTableData(row.children);
      } catch (err) {
        console.log(err);
      }
    });
  }
  updataTagTableData(data) {
    this.tableData = data || [];
  }
  //选择项变化的时候
  handleSelectionChange(selection) {
    if (selection instanceof Array && selection.length > 0) {
      this.$store.commit("selectData", selection);
    }
  }
}
</script>
<style lang='scss'>
#TagTable {
}
</style>

