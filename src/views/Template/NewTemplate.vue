<template>
  <div id="newTemplate">
    <!-- <div class="templateName center">
      <span>模板名字 ：</span>
      <span v-show="show">
        <el-input
          @keyup.enter.native="submitTemplateName"
          v-model="templateName"
          placeholder="请输入模板名字"
        ></el-input>
      </span>
      <span v-show="!show">{{templateName}}</span>
      <span
        v-show="!show"
        @click="changTemplateName"
        class="deleteName el-icon-circle-close-outline"
        style="margin-left:100px;width:30xp;height:30xp;display:inline-block;align-items:felx-end;"
      ></span>
    </div>
    <div class="templateContent hide">
      <div style='display:flex;justify-content:space-between;'>
        <el-button type='primary' @click="addTemplate">添加</el-button>
        <el-button style='margin-right:10px;' type='success' @click='createTemplate'>创建模板</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%;" max-height="90%">
        <el-table-column prop="label" label="标注物" width="180"></el-table-column>
        <el-table-column prop="value" label="形状" width="180"></el-table-column>
        <el-table-column label="操作" prop>
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteSetTemplate(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <ul>
        <li style="display:flex;">
          <span style="margin-right:5px;">描述物 :</span>
          <span style>
            <el-input v-model="descroptGoods" placeholder="请输入描述物"></el-input>
          </span>
        </li>
        <li style="display:flex;margin-top:20px;">
          <span style="margin-right:px;">形&nbsp;&nbsp;状 :&nbsp;&nbsp;</span>
          <span style="display:inline-block;width:180px">
            <el-select v-model="defaultShape" placeholder="请选择形状">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialong">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Table, TableColumn } from "element-ui";
import API from '../../api';
const uuidv4 = require("uuid/v4");
TableColumn;
@Component({
  components: {}
})
export default class newTemplate extends Vue {
  // //options 单独数据
  // public templateName: string = "";
  // public show: boolean = true;
  // public dialogVisible: boolean = false;
  // public defaultShape: string = "rect";
  // public descroptGoods = "";
  // public templateID = uuidv4();
  // public options = [
  //   {
  //     value: "rect",
  //     label: "矩形"
  //   },
  //   {
  //     value: "circle",
  //     label: "圆"
  //   },
  //   {
  //     value: "line",
  //     label: "直线"
  //   }
  // ];
  // //表格数据
  // public tableData: any[] = [];
  // //模板数据
  // public createTemplateData: any[] = [];

  // //确定模板名字
  // submitTemplateName(e) {
  //   this.show = !this.show;
  //   const target = document.querySelector(".templateName");
  //   const templateContent = document.querySelector(".templateContent");
  //   if (target && templateContent) {
  //     target.classList.remove("center");
  //     target.classList.add("topName");
  //     setTimeout(() => {
  //       templateContent.classList.remove("hide");
  //     }, 1500);
  //   }
  // }
  // //改变模板名字
  // changTemplateName(e) {
  //   this.show = !this.show;
  //   const target = document.querySelector(".templateName");
  //   const templateContent = document.querySelector(".templateContent");
  //   if (target && templateContent) {
  //     target.classList.add("center");
  //     target.classList.remove("topName");
  //     templateContent.classList.add("hide");
  //   }
  // }
  // //添加模板
  // addTemplate(e) {
  //   this.dialogVisible = true;
  // }
  // //关闭弹窗
  // handleClose(done) {
  //   this.$confirm("确认关闭？")
  //     .then(_ => {
  //       done();
  //     })
  //     .catch(_ => {});
  // }
  // //关闭弹窗
  // closeDialong(e) {
  //   let obj: { label: string; value: string } = { label: "", value: "" };
  //   obj.label = this.descroptGoods;
  //   obj.value = this.defaultShape;
  //   this.tableData.push(obj);
  //   this.dialogVisible = false;
  // }
  // //获取创建模板的数据
  // async getCreateTemplateData(data){
  //   const res = API.template.addTemplate(data);
  //   return res;
  // }
  // //创建模板
  // async createTemplate(e){
  //   const obj:{name:string,data:any[],id:string} = {name: '',data: [],id:''};
  //   obj.name = this.templateName;
  //   obj.data = this.tableData;
  //   obj.id = this.templateID;
  //   if(obj.data && obj.data.length === 0){
  //     this.$message.error('请至少添加一个标注物');
  //     return;
  //   }
  //   try{
  //     const res:any = await this.getCreateTemplateData(obj);
  //     if(res.status === 200 && res.data && res.data.result === true){
  //       this.$message({
  //         type:'success',
  //         message:'创建模板成功'
  //       })
  //     }else{
  //       this.$message.error('创建模板失败');
  //     }
  //   }catch(err){
  //     this.$message.error('创建模板失败');
  //   }
  // }
  // //删除描述物
  // deleteSetTemplate(index){
  //   if(this.tableData instanceof Array && this.options.length>0){
  //     this.tableData.splice(index,1);
  //   }
  // }
}
</script>
<style lang='scss' scoped>
.topName {
  position: absolute;
  left: 10px;
  top: 10px;
  transition: all 0.5s ease 0.5s;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#newTemplate {
  height: 100%;
  .templateName {
    width: 300px;
    display: flex;
  }
  .templateContent {
    margin-top: 50px;
  }
}
</style>


