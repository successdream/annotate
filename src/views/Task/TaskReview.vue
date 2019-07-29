<template>
  <div id='task-review'>
    <el-dialog
      :title='`任务查验 ( ${review.taskOwnerName} )`'
      :visible.sync='reviewDialogVisible'
      fullscreen
    >
      <div style='position:absolute;left:0px;top:40px;right:0px;bottom:40px;'>
        <iframe class='absolute-full-fill' frameborder='0' :src='review.url'></iframe>
      </div>
      <span slot='footer' class='dialog-footer' style='position:absolute;right:40px;bottom:10px;'>
        <el-button type='primary' @click='reviewDialogVisible = false'>关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { State } from 'vuex-class';
@Component({
  components: {}
})
export default class TaskReview extends Vue {
  public reviewDialogVisible: boolean = false;
  public review: any = { taskOwnerName: '', url: '' };
  show({ row,$index }) {
    this.reviewDialogVisible=true;
    this.review.taskOwnerName = row.owner.nickname;
    this.review.url = `http://${location.hostname}:8012/review/${row._id}`;
  }
}
</script>
<style lang='scss'>
#task-review {
    
}
</style>


