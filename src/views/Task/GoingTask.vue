<template>
  <div id='going-task'>
    <!-- <el-table :data='goingTasksData' style='width: 100%' v-loading="loading" element-loading-text='正在拼命加载中'>
      <el-table-column prop='owner.nickname' label='执行者'></el-table-column>
      <el-table-column prop='type' label='标签'></el-table-column>
      <el-table-column prop='name' label='任务名'></el-table-column>
      <el-table-column prop='progressLabel' label='进度'></el-table-column>
      <el-table-column prop='stepCount' label='步骤数'></el-table-column>
      <el-table-column prop='unitPrice' label='单价（元）'></el-table-column>
      <el-table-column prop='totalPrice' min-width='95px' label='预计总额（元）'></el-table-column>
      <el-table-column prop='updateTime' label='最后更新'></el-table-column>
      <el-table-column prop='createTime' label='创建时间'></el-table-column>
      <el-table-column prop='username' label='编辑'>
        <template slot-scope='scope'>
          <el-button type='success' :index='scope' @click='editGoingTask(scope)'>编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column prop='username' label='查验'>
        <template slot-scope='scope'>
          <el-button type='info' :index='scope' @click='taskReview(scope)'>查验</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 弹窗 -->
    <!-- <GoingTaskEdit ref='goingTaskEdit' :updataTasks="updataTasks"></GoingTaskEdit>
    <TaskReview ref='taskReview'></TaskReview> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import axios from 'axios';
import { State } from 'vuex-class';
import GoingTaskEdit from './GoingTaskEdit.vue';
import TaskReview from './TaskReview.vue';
import API from '../../api';
@Component({
  components: {
    GoingTaskEdit,
    TaskReview
  }
})
export default class GoingTask extends Vue {
  // $refs!:{
  //   goingTaskEdit:GoingTaskEdit,
  //   taskReview:TaskReview
  // }
  // @State("allUser") getAllUser;
  // public goingTasksData: any[] = [];
  // public status: string[] = ['none', 'doing'];
  // public selectUsers:any[]=[];
  // public loading:boolean=true;
  // public review:any= {taskOwnerName: '', url: ''};
  //  getSelectData(data) {
  //   this.selectUsers = data;
  //   this.filterTasks();
  //  }
  //  created() {
  //   this.filterTasks();
  //  }
  //  //获取过滤任务数据
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
  //   });
  //   const params = btoa(
  //     JSON.stringify({ ownerIds, ownerId, status: this.status })
  //   );
  //   // const res = await axios.get(`/management/tasks/${params}`);
  //   const res = await this.getFilterTasksData(params);
  //   if(!res) return;
  //   if (res.status === 200) {
  //     this.mapTasks(res.data.tasks);
  //   } else {
  //     this.$message({ message: '获取任务列表失败!', type: 'warning' });
  //   }
  // }
  
  // mapTasks(data: any[]) {
  //   this.goingTasksData = [];
  //   const allUsers = this.getAllUser;
  //   data.map(item => {
  //     allUsers.forEach(({ _id, nickname }) => {
  //       if (_id === item.ownerId) {
  //         const val={
  //             owner: {
  //               nickname: nickname
  //             },
  //             status: '已完成',
  //             createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
  //             updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
  //             progress:item.totalPicCount===0?0:Math.floor(10000*item.handledPicCount/item.totalPicCount)/100,
  //             totalPrice:Math.floor(item.unitPrice*item.stepCount*100)/100,
  //             progressLabel:''
  //           }
  //         val.progressLabel=`${val.progress} % ( ${item.handledPicCount} / ${item.totalPicCount} )`;  
  //         this.goingTasksData.push(
  //           Object.assign({}, item,val )
  //         );
  //       }
  //     });
  //   });
  //   this.loading=false;
  // }
  
  // editGoingTask(scope){
  //   this.$refs.goingTaskEdit.show(scope);
  // }
  
  // updataTasks(index){
  //   if( this.goingTasksData.length===0) return;
  //   this.goingTasksData.splice(index,1);
  // }
  
  // taskReview(){
  //   // this.$refs.taskReview.show(data);
  // }
}
</script>
<style lang='scss' scoped>
#going-task {
  position: absolute;
  left: 10px;
  right: 0px;
  height: 100%;
}
</style>


