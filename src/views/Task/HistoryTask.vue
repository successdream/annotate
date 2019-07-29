<template>
  <div id='history-task'>
    <!-- <el-table :data='histortyTasks' style='width: 100%' v-loading='loading' element-loading-text='正在拼命加载中'>
      <el-table-column prop='owner.nickname' label='执行者'></el-table-column>
      <el-table-column prop='type' label='标签'></el-table-column>
      <el-table-column prop='name' label='任务名'></el-table-column>
      <el-table-column prop='stepCount' label='步骤数'></el-table-column>
      <el-table-column prop='totalPicCount' label='图片数'></el-table-column>
      <el-table-column prop='unitPrice' label='单价（元）'></el-table-column>
      <el-table-column prop='totalPrice' label='结算金额'></el-table-column>
      <el-table-column prop='status' label='任务状态'></el-table-column>
      <el-table-column prop='updateTime' label='最后更新'></el-table-column>
      <el-table-column prop='createTime' label='创建时间'></el-table-column>
      <el-table-column prop='username' label='查验'>
        <template slot-scope='scope'>
          <el-button type='info' :index='scope'>查验</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import axios from 'axios';
import API from '../../api'
import { State } from 'vuex-class';
@Component({
  components: {}
})
//TODO 标签有个ID 替换类型ID
export default class HistoryTask extends Vue {
  // @State("allUser") getAllUser;
  // public histortyTasks: any[] = [];
  // public selectUsers: any[] = [];
  // public status = ['done', 'cancel'];
  // public loading: boolean = true;
  // //获取选中的人员
  // getSelectData(data) {
  //   this.selectUsers = data;
  //   this.filterTasks();
  // }

  // created() {
  //   this.filterTasks();
  // }
  // //获取过滤任务数据
  // async getFilterTasksData(params){
  //   try{
  //     const res = API.task.getFilterTasksData(params);
  //     return res;
  //   }catch(err){
  //     this.$message.error('获取历史任务数据异常');
  //     return false;
  //   }
  // }
  // async filterTasks() {
  //   let ownerId: any = null;
  //   let ownerIds: any = null;
  //   if (this.selectUsers.length === 1) ownerId = this.selectUsers[0]._id;
  //   else if (this.selectUsers.length > 1)
  //     ownerIds = this.selectUsers.map(({ _id }) => {
  //       return _id;
  //     });
  //   const params = btoa(
  //     JSON.stringify({ ownerIds, ownerId, status: this.status })
  //   );
  //   const res = await this.getFilterTasksData(params);
  //   if(!res) return;
  //   if (res.status === 200) {
  //     this.mapTasks(res.data.tasks);
  //   } else {
  //     this.$message({ message: '获取任务列表失败!', type: 'warning' });
  //   }
  // }

  // mapTasks(data: any[]) {
  //   this.histortyTasks = [];
  //   const allUsers = this.getAllUser;
  //   data.map(item => {
  //     allUsers.forEach(({ _id, nickname }) => {
  //       if (_id === item.ownerId) {
  //         const val = Object.assign({}, item, {
  //           owner: {
  //             nickname: nickname
  //           },
  //           createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
  //           updateTime: moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")
  //         });
  //         if(item.status==='done')
  //            val.status='已完成';
  //         else if(item.status==='cancel')
  //            val.status='已撤销';
  //         this.histortyTasks.push(val);
  //       }
  //     });
  //   });
  //   this.loading = false;
  // }
}
</script>
<style lang='scss' scoped>
#history-task {
  position: absolute;
  left: 10px;
  right: 0px;
  height: 100%;
}
</style>


