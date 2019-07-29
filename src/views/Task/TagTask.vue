<template>
  <div id="TagTask">
    <!-- <el-table :data="treeTableData" ref="filterTable" style="width: 100% ;height:100%" max-height="100%" @expand-change="expandRow">
      <el-table-column type="selection" width="55"></el-table-column>
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
      <el-table-column prop="description" label="描述" w_idth="180"></el-table-column>
    </el-table> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import API from "../../api";
import tagTable from "@/views/Tag/TagTable.vue";
@Component({
  components: { tagTable }
})
export default class TagTask extends Vue {
  // $refs!: {
  //   tagTable: tagTable;
  // };
  // public dialogVisible: boolean = false;
  // public tableData: any[] = [];
  // public treeTableData: any[] = [];
  // async mounted() {
  //   await this.getTagData();
  //   const firstData = this.firstData();
  //   this.mapTagData(firstData);
  //   this.treeTableData = firstData;
  // }
  // async getTagData() {
  //   try {
  //     const res = await API.tags.getTags();
  //     if (res && res.status === 200 && res.data) {
  //       this.tableData = res.data;
  //     }
  //   } catch (err) {
  //     // this.$message.error("获取标签页失败");
  //     console.log(err);
  //   }
  // }
  // echo(data) {
  //   const changeData = this.tableData[data.index];
  //   this.tableData.splice(data.index, 1, data);
  // }
  // //删除
  // handleDelete(index, row) {
  //   this.$confirm("确定要删除(" + row.label + ")?", row.label, {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning"
  //   })
  // }
  // //整理数据
  // firstData() {
  //   const data = this.tableData;
  //   let arrData: any[] = [];
  //   for (var b = 0; b < data.length; b++) {
  //     let isHasParent: boolean = false;
  //     let recordVal: any = null;
  //     for (var d = 0; d < data.length; d++) {
  //       if (data[b].parentId === data[d]._id) {
  //         isHasParent = true;
  //       }
  //       if (!isHasParent) {
  //         recordVal = data[b];
  //       } else {
  //         recordVal = null;
  //       }
  //     }
  //     if (!isHasParent && recordVal !== null) arrData.push(recordVal);
  //   }
  //   return arrData;
  // }
  // mapTagData(firstData) {
  //   const data = this.tableData;
  //   if (firstData instanceof Array && firstData.length > 0) {
  //     for (var i = 0; i < firstData.length; i++) {
  //       for (var a = 0; a < data.length; a++) {
  //         if (data[a].parentId === firstData[i]._id) {
  //           if (firstData[i].children === undefined) {
  //             firstData[i].children = [];
  //             firstData[i].children.push(data[a]);
  //           } else {
  //             firstData[i].children.push(data[a]);
  //           }
  //         }
  //       }
  //       if (firstData[i].children) {
  //         this.mapTagData(firstData[i].children);
  //       }
  //     }
  //   }
  // }

  // expandRow(row, expandedRows) {
  //   this.$nextTick(() => {
  //     try {
  //       this.$refs.tagTable.updataTagTableData(row.children);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }
}
</script>

<style lang='scss' scoped>
#TagTask {
  position: absolute;
  top: 44px;
  bottom: 0px;
  z-index: 300;
  width: 100%;
}
</style>