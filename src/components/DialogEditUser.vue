<template>
  <div>
    <el-dialog title='修改资料' :visible.sync='dialogVisible' width='360px'>
      <el-form :model="userToEdit" :rules="userRules" id='editUser' ref="editUser" label-width="80px" inline>
        <el-form-item label='用户名：' prop='username'><el-input :disabled='true' v-model.trim='userToEdit.username'></el-input></el-form-item>
        <el-form-item label='密码：' prop='password'><el-input type='password' ref='password' v-model.trim='userToEdit.password' @focus="focusPwd"></el-input></el-form-item>
        <el-form-item label='姓名：' prop=nickname><el-input v-model.trim='userToEdit.nickname'></el-input></el-form-item>
        <el-form-item label='手机号：' prop='phone'><el-input v-model.trim='userToEdit.phone'></el-input></el-form-item>
        <el-form-item label='邮箱：' prop='email'><el-input v-model.trim='userToEdit.email'></el-input></el-form-item>
        <el-form-item v-if='editAuthority' prop=none label='权限：'>
          <el-select v-model='userToEdit.level' style='width:180px;'>
            <el-option v-for='l in userLevels' :label='l.label' :key='l.number' :value='l.number'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-input style='display:none;' type='password' v-model='strange' @focus='focusPwd'></el-input>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type=primary @click='saveUser'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '../api';

@Component({
  components: {},
})
export default class DialogEditUser extends Vue {
  $refs!:{
    editUser:HTMLFormElement
  }
  public dialogVisible: boolean = false;
  public myAccount: any = {};
  public userToEdit: any = {};
  public passwordGUID: string = '2c085cb6-7fdc-4c34-bb32-f62d1bf332c5';
  public strange: string = '';
  public user: any = {};
  public userLevels: any[] = API.user.levels;
  public data() {
    return {
      userRules: API.user.rules,
      userLevels: API.user.levels,
      userToEdit: {},
      passwordGUID: '2c085cb6-7fdc-4c34-bb32-f62d1bf332c5',
      strange: '',
      dialogVisible: false,
      user: {},
    };
  }

  public async mounted() {
    this.myAccount = await API.user.getMyAccount();
  }
  get editAuthority(){
    if(this.myAccount.data){
       return this.myAccount.data.username==='root'&& this.user.username!=='root'
    }else{
      return false;
    } 
  }
  public async saveUser() {
    const aaa = document.getElementById('editUser');
    console.dir(aaa);
    if (!await this.$refs.editUser.validate()) return;
    let res: any = {};
    const params = JSON.parse(JSON.stringify(this.userToEdit));
    for (const k in params) {
      if (params.hasOwnProperty(k) && (params[k] === this.user[k])) {
        delete params[k];
      }
    }
    if (params.password === this.passwordGUID) delete params.password;
    if (Object.getOwnPropertyNames(params).length === 0) {
      this.$message({message: '看得出来，你没做任何改动...', type: 'info'});
      return true;
    }
    params._id = this.user._id;
    if (params.level && params.level !== this.user.level) {
      try {
        res = await axios.put('/user/level/', params);
      } catch (error) {
        this.$message.error('程序异常！');
      }
    }
    try {
      res = await axios.put('/user/user/', params);
    } catch (error) {
      this.$message.error('程序异常！');
    }
    if (res.status === 200 && res.data && res.data.code === 0) {
      this.$message({message: '修改完成', type: 'success'});
      //如果更改的是当前账号的信息，则刷新账号信息。
      if (params._id === this.myAccount._id) this.myAccount = await API.user.getMyAccount();
      this.hide();
    } else {
      let msg = '修改失败';
      if (res.data) {
        switch (res.data.code) {
          case 'invalid_param':
            msg = msg + '，参数不合法';
            break;
          case 10001:
            msg = msg + '，用户名不可用';
            break;
          case 10002:
            msg = msg + '，邮箱不可用';
            break;
          default:
            break;
        }
      }
      this.$message({message: msg, type: 'warning'});
    }
  }

  public focusPwd() {
    this.strange = '';
    if (this.userToEdit.password === this.passwordGUID) {
      this.userToEdit.password = '';
      // this.$refs.password.value = '';
    }
  }

  public hide() {
    this.dialogVisible = false;
  }

  public popup(user: any) {
    console.log(user)
    this.user = user || {};
    this.userToEdit = JSON.parse(JSON.stringify(user));
    this.userToEdit.password = this.passwordGUID;
    this.strange = this.passwordGUID;
    this.dialogVisible = true;
    this.$nextTick(async () => await this.$refs.editUser.validate());
  }
}
</script>

<style lang='scss' scoped>
</style>
