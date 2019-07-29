<template>
  <div id="pic-task">
    <!-- <ul style="padding:0;margin:0;padding-left:20px;">
      <li style="display:flex;align-items:center; padding:10px 0px;">
        <div style="width:90px;margin-right:10px">图片数目 :</div>
        <div class="block" style="flex:1">
          <el-slider v-model="picNum" show-input></el-slider>
        </div>
      </li>
      <li style="display:flex; padding:10px 0px;align-items:center;">
        <div style="width:90px;margin-right:10px">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价 ：</div>
        <div>
          <el-input-number
            size="small"
            v-model="priceNum"
            controls-position="right"
            :precision="2"
            :step="0.1"
          ></el-input-number>
        </div>
      </li>
      <li style="display:flex;padding:10px 0px;align-items:center;">
        <div style="width:90px;margin-right:10px">任务名 :</div>
        <div>
          <el-input
            @blur="taskName=!taskName"
            v-if="taskName"
            v-model="taskNameValueIs"
            placeholder="请输入内容"
          ></el-input>
          <div
            v-else
            @dblclick="taskName=!taskName"
            style="padding:5px 30px; border-bottom:1px solid #ccc;"
          >{{taskNameValueIs}}</div>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import TagTask from "./TagTask.vue";
import TemplateTag from "./TemplateTask.vue";
import API from "../../api";
import moment from "moment";

@Component({
  components: {
    TemplateTag,
    TagTask
  }
})
export default class PicTask extends Vue {
  // public picNum: number = 0;
  // public priceNum: number = 0;
  // public taskName: boolean = true;
  // public selectTemplate: any[] = [];
  // public selectTag: any[] = [];
  // public sendData: any = {};
  // public taskNameValueIs: any = "";
  // //任务名
  // //标签+模板+时间
  // mounted() {
  //   API.bus.$on("selectTemplate", msg => {
  //     this.selectTemplate = msg;
  //   });
  //   API.bus.$on("selectTag", msg => {
  //     this.selectTag = msg;
  //   });
  // }

  // get taskNameValue() {
  //   let val = "(";
  //   if (this.selectTag.length > 1) {
  //     for (var i = 0; i < this.selectTag.length; i++) {
  //       if (i != this.selectTag.length - 1) {
  //         val += this.selectTag[i].name + "-";
  //       } else {
  //         val += this.selectTag[i].name + ")";
  //       }
  //     }
  //   } else {
  //     val = "";
  //     if (this.selectTag[0]) {
  //       val += this.selectTag[0].name;
  //     }
  //   }

  //   if (this.selectTemplate.length > 1) {
  //     if (val === "") {
  //       val += "(";
  //     } else {
  //       val += "-(";
  //     }
  //     for (var a = 0; a < this.selectTemplate.length; a++) {
  //       if (a != this.selectTemplate.length - 1) {
  //         val += this.selectTemplate[a].name + "-";
  //       } else {
  //         val += this.selectTemplate[a].name + ")";
  //       }
  //     }
  //   } else {
  //     if (this.selectTemplate[0]) {
  //       if (val === "") {
  //         val += this.selectTemplate[0].name;
  //       } else {
  //         val += "-" + this.selectTemplate[0].name;
  //       }
  //     }
  //   }
  //   let time = moment().format("YYYY-MM-DD");
  //   if (val != "") {
  //     val += "-(" + time + ")";
  //   } else {
  //     time = "";
  //   }
  //   return val;
  // }
  
  // @Watch("taskNameValueIs")
  // sendtaskNameValueIs() {
  //   this.AllPicData();
  // }

  // @Watch("taskNameValue")
  // sendPicData() {
  //   this.taskNameValueIs = this.taskNameValue;
  //   this.AllPicData();
  // }

  // @Watch("priceNum")
  // sendPriceNum() {
  //   this.AllPicData();
  // }

  // @Watch("picNum")
  // sendPicNum() {
  //   this.AllPicData();
  // }
  
  // AllPicData() {
  //   this.sendData.picNum = this.picNum;
  //   this.sendData.priceNum = this.priceNum;
  //   this.sendData.taskNameValue = this.taskNameValueIs;
  //   API.bus.$emit("selectPic", this.sendData);
  // }
}
</script>
<style lang='scss' scoped>
</style>
