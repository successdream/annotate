
 <template>
  <div id='task'>
    <!-- <div id='task-left'>
      <el-table ref='multipleTable' :data='allUserData' style='width:100%' @selection-change='handleSelectionChange' max-height='100%'>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="nickname" label="姓名" width="80"></el-table-column>
        <el-table-column prop="username" label="登录名" width="80"></el-table-column>
      </el-table>
    </div>
    <div id='task-right'>
      <router-view></router-view>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class Task extends Vue {
  // tableData = [];
  // //选中的用户
  // public selectUsers:any=[];
  // get allUserData(){
  //   let data=this.$store.state.allUser;
  //    //非空校验
  //   if(!(data.length)) {
  //     data=[];
  //   }
  //   const filterData=data.filter((item)=>{
  //       return item.name!=='root'
  //   })
  //   return filterData;
  // }
  // //参数是选中的数据
  // handleSelectionChange(row) {
  //      this.selectUsers=row;
  //      ((this.$children[1])as any).getSelectData(row);  
     
  // }
}
</script>
<style lang='scss' scoped>
#task {
  position: absolute;
  top: 45px;
  bottom: 0px;
  #task-left {
    position: absolute;
    width: 200px;
    height: 100%;
    border-right: 1px solid #ccc;
  }
  #task-right {
    position: absolute;
    left: 200px;
    right: 10px;
    height: 100%;
  }
}
</style>
