<template>
  <div>
    <!-- <el-card
      class='absolute-full-fill'
      :body-style='cardBodyStyle'
      style='display:flex;flex-direction:column;'
    >
      <div style='flex:1;position:relative;'>
        <div class='absolute-full-fill'>
          <el-table :data='allUsers' :default-sort="{prop: 'nickname', order: 'ascending'}"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
          >
            <el-table-column type='index'></el-table-column>
            <el-table-column prop='nickname' label='姓名' sortable></el-table-column>
            <el-table-column prop='username' label='用户名' sortable></el-table-column>
            <el-table-column prop='email' label='邮箱' sortable></el-table-column>
            <el-table-column prop='phone' label='手机号' sortable></el-table-column>
            <el-table-column prop='updateTime' label='更新时间' sortable></el-table-column>
            <el-table-column prop='createTime' label='创建时间' sortable></el-table-column>
            <el-table-column prop='level.label' label='权限等级' sortable></el-table-column>
            <el-table-column label='编辑'>
              <template slot-scope='scope'>
                <el-button type='success' @click='editUser(scope.row)'>编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="myAccount.data?myAccount.data.username==='root':false" label='删除'>
              <template slot-scope='scope'>
                <el-button v-if="scope.row.username!=='root'" type="danger" @click="delUser(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-button round class='button-signup el-icon-plus' @click='signupUser' title='注册用户'></el-button>
    </el-card>
    <dialog-edit-user ref='dialogEditUser'></dialog-edit-user>
    <el-dialog title='注册用户' :visible.sync="signupVisible" width='360px'>
      <form-signup ref='formSignup'></form-signup>
      <span slot='footer' class='dialog-footer'></span>
    </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '../api';
import { Form as ElForm } from 'element-ui';
import DialogEditUser from '@/components/DialogEditUser.vue';
import FormSignup from '@/components/FormSignup.vue';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

@Component({
  components: { DialogEditUser, FormSignup }
})
export default class User extends Vue {
  // $refs!: {
  //   dialogEditUser: DialogEditUser;
  //   formSignup: FormSignup;
  // };
  // @State('allUser') getAllUsers;
  // @Mutation('allUsers') setAllUsers;
  // public cardBodyStyle: any = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'stretch',
  //   height: '100%'
  // };
  // public myAccount: any = {};
  // public signupVisible: boolean = false;
  // public allUsers: any[] = [];

  // public async created() {
  //   this.myAccount = await API.user.getMyAccount();
  //   this.allUsers = this.getAllUsers;
  // }

  // public async getalluser() {
  //   this.allUsers = (await API.user.getAllUsers()) || [];
  // }

  // public editUser(userInfo: any) {
  //   const params = JSON.parse(JSON.stringify(userInfo));
  //   params.level = params.level.number;
  //   this.$refs.dialogEditUser.popup(params);
  // }

  // public signupUser() {
  //   this.signupVisible = true;
  //   this.$nextTick(() => this.$refs.formSignup.init());
  // }
  
  // async getDelUserData(id){
  //    try{
  //      const res = await API.user.delUsers(id);
  //      return res;
  //    }catch(err){
  //      this.$message('删除异常');
  //      return false;
  //    }
  // }
  // public async delUser({ row, $index }) {
  //   const userStr = `[ ${row.username} ](${row.nickname})`;
  //   const msg1 = `此操作将永久删除账户${userStr}, 是否继续?`;
  //   let result: any = await API.utils.confirm(this, msg1);
  //   if (result === true) {
  //     try {
  //       const res = await this.getDelUserData(row._id);
  //       if(res === false) return;
  //       if (res.status === 200 && res.data.code === 0) {
  //         this.$message({
  //           message: `账户${userStr}已被删除！`,
  //           type: 'success'
  //         });
  //         this.allUsers.splice($index, 1);
  //         this.setAllUsers(this.allUsers);
  //       } else {
  //         this.$message({ message: '删除失败！', type: 'error' });
  //       }
  //     } catch (error) {
  //       this.$message.error('程序异常！');
  //     }
  //   }
  // }

  // beforeDestroy() {
  //   this.$store.commit('allUser', this.allUsers);
  // }

}
</script>

<style lang='scss' scoped>
  .button-signup {
    float: right;
    width: 100%;
    margin-top: 5px;
    font-size: 16px;
  }
</style>