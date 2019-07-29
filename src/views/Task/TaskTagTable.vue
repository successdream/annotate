<template>
  <div id="TagTable" v-show="show">
    <el-table :data="tableData" ref="filterTable" max-height="100%" style="overflow:auto" @expand-change="expandRow" @selection-change="handleSelectionChange" :show-header="false">
       <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <TaskTagTable :title="props" ref="tagTable"></TaskTagTable>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="标签">
        <template slot-scope="scope">
          <el-tag disable-transitions>{{scope.row.label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
    </el-table>
  </div>
</template>
<script lang=ts>
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {
  }
})
export default class TaskTagTable extends Vue {
  $refs!: {
    tagTable: TaskTagTable;
  };
  @Watch("tableData", { deep: true })
  tableDataChange(val) {
    if (this.tableData && this.tableData.length > 0) {
      this.show = true;
    }
  }
  public dialogVisible: boolean = false;
  public tableData: any[] = [];
  public selectData: any[] = [];
  public show: boolean = false;
  public addData: any = [];
  public editData: any = [];

  async created() {}
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
  width: 100%;
}
</style>

