<template>
  <div id="newtask">
    <!-- <div class="outerBox">
      <el-tooltip placement="bottom-start" style="height:30px;flex:1;">
        <div slot="content" style="height:500px;width:800px;">
          <TagTask></TagTask>
        </div>
        <el-button style="display:inline-block;width:200px;">选择标签</el-button>
      </el-tooltip>
    </div>
    <div class="outerBox">
      <el-tooltip placement="bottom-start" style="height:30px;flex:1;">
        <div slot="content" style="height:500px;width:800px;">
          <TemplateTag @selectData="getSelectData" :data="templateTaskData"></TemplateTag>
        </div>
        <el-button style="display:inline-block;width:200px;">选择模板</el-button>
      </el-tooltip>
      <ul v-if="selectData.length!==0" style='padding-right:115px;'>
        <li v-for="(item,index) in selectData" :key="index" style='display:flex;justify-content:space-between;padding:5px 0px;border-bottom:1px solid #ccc'>
          <span>{{item.name}}</span>
          <span @click='deleteTemplate' class='el-icon-circle-close-outline'></span>
        </li>
      </ul>
    </div>
    <div class="outerBox">
      <el-tooltip placement="bottom-start" style="height:30px;flex:1;">
        <div slot="content" style="height:500px;width:800px;">
          <PicTask></PicTask>
        </div>
        <el-button style="display:inline-block;width:200px;">选择图片</el-button>
      </el-tooltip>
    </div> -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import TagTask from "./TagTask.vue";
import TemplateTag from "./TemplateTask.vue";
import PicTask from "./PicTask.vue";
import API from "../../api";
@Component({
  components: {
    TemplateTag,
    PicTask,
    TagTask
  }
})
export default class NewTask extends Vue {
  // @Watch("selectData")
  // selectDataChange(data) {
  //   this.selectData = data;
  // }
  // public templateTaskData: any = [];
  // public selectData: any[] = [];
  // created() {
  //   this.templateTaskData = this.$store.state.templateData;
  // }
  // mounted() {}
  // //显示内容
  // showContent(e) {
  //   const title = e.target;
  //   const box = title.nextElementSibling;
  //   box.classList.remove("hide");
  // }
  // //隐藏内容
  // hideContent(e) {
  //   const target = e.target;
  //   const box = target.lastElementChild;
  //   box.classList.add("hide");
  // }
  // //获取选中的数据
  // getSelectData(data) {
  //   this.selectData = data;
  // }
  // //点击删除按钮，删除模板
  // deleteTemplate(e){
  //   const target = e.target;
  //   console.dir(e)
  // }
}
</script>

<style lang='scss' scoped>
#newtask {
  height: 100%;
  background-color: #f0f2f5;
  display: flex;
  .outerBox {
    flex: 1;
    ul{
      padding:0;
      li{
        list-style: none;
      }
    }
  }
}
</style>
