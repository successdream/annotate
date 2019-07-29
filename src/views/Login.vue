<template>
  <div class='eas-flex' v-loading.fullscreen.lock='fullscreenLoading'>
    <!-- <div v-if='tableVisible' class='eas-login-table'  @keyup.enter='loginSubmit'>
      <img src='/assets/images/logo-main-dark.png' style='width: 260px; height: auto;'>
      <div class='title'>图像标注系统</div>
      <el-tabs v-model='activeTab' style='height: auto;'>
        <el-tab-pane label='登录' name='login' style='display: flex;'>
          <el-form :model='loginParams' id='login' ref='login' label-width='80px' inline>
            <el-form-item label='用户名：' prop='username'><el-input v-model.trim='loginParams.username' :autofocus='true'></el-input></el-form-item>
            <el-form-item label='密码：' prop='password'><el-input type='password' v-model='loginParams.password'></el-input></el-form-item>
            <el-form-item style='float:right; padding-right:30px;'>
              <el-button type='text' @click='getBackPwdVisible=true'>忘记密码?</el-button>
              <el-checkbox style='padding:0px 10px 0px 10px;' v-model='rememberMe'>记住我</el-checkbox>
              <el-button type='primary' @click='loginSubmit'>登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title='找回密码' :visible.sync='getBackPwdVisible' width='460px'>
      <el-form :model='findPwdParams' :rules='userRules' ref='getBackPassword' label-width='120px' inline>
        <el-form-item label='你的注册邮箱：' prop='email'><el-input v-model.trim='findPwdParams.email' style='width:260px'></el-input></el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='getBackPwdVisible = false'>取 消</el-button>
        <el-button type='primary' @click="getBackPassword('getBackPassword')">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '../api';
import { Form as ElForm } from 'element-ui';

@Component({
  components: {},
})
export default class Login extends Vue {
  // $refs!:{
  //   login: HTMLFormElement
  // }
  // public myAccount: any = {};
  // public tableVisible: boolean = false;
  // public tokenSrorageKey: string = 'AUTH_TOKEN';
  // public activeTab: string = 'login';
  // public loginParams = { username: '', password: '', grant_type: 'password' };
  // public userRules = API.user.rules;
  // public rememberMe: boolean = true;
  // public fullscreenLoading: boolean = false;
  // public getBackPwdVisible: boolean = false;
  // public findPwdParams: any = { email: '' };

  // public data() {
  //   return {
  //     userRules: API.user.rules,
  //     loginParams: { login: { username: '', password: '', grant_type: 'password' } },
  //     findPwdParams: {email: ''},
  //   };
  // }

  // public async created() {
  //   const k = this.tokenSrorageKey;
  //   const auth = sessionStorage.getItem(k) || localStorage.getItem(k) || '';
  //   this.tableVisible = !await this.checkAuthorization(auth);
  // }

  // private async checkAuthorization(auth: string) {
  //   let result = false;
  //   if (!auth) return false;
  //   axios.defaults.headers.common.Authorization = auth;
  //   this.myAccount = await API.user.getMyAccount();
  //   if (this.myAccount) {
  //     this.$router.go(-1);
  //     result = true;
  //   }
  //   return result;
  // }

  // private async getLoginSubmitData(){
  //   const res = await API.login.loginSubmit(this.loginParams);
  //   return res;
  // }

  // private async loginSubmit() {
  //   try{
  //     const validate = !await this.$refs.login.validate();
  //     if(validate) return;
  //      const res = await this.getLoginSubmitData();
  //      if(res && res.status === 200){
  //        const {token_type, access_token} = res.data;
  //        const auth = `${token_type} ${access_token}`;
  //        await this.checkAuthorization(auth);
  //        sessionStorage.setItem(this.tokenSrorageKey, auth);
  //        if (this.rememberMe) localStorage.setItem(this.tokenSrorageKey, auth);
  //        else localStorage.removeItem(this.tokenSrorageKey)
  //      }
  //   }catch(error){
  //     this.$message.error('登陆失败');
  //   }
    
  //   const loginParams = this.loginParams;
  //   const rememberMe = this.rememberMe;
  //   const checkAuthorization = this.checkAuthorization;
  //   const tokenSrorageKey = this.tokenSrorageKey;
  //   const message = this.$message.error;
   
  // }
  
  // private async getBackPasswordData(){
  //   try{
  //     const res = await API.login.getBackPassword(this.findPwdParams);
  //     return res;
  //   }catch(err){
  //     this.$message.error('找回密码异常');
  //     return false;
  //   }
  // }

  // private async getBackPassword(formName: string) {
  //   if (!await (this.$refs[formName] as ElForm).validate()) return;
  //   try {
  //     this.fullscreenLoading = true;
  //     const res = await this.getBackPasswordData();
  //     if(!res) return;
  //     this.fullscreenLoading = false;
  //     if (res.status === 200) {
  //       let msg = '操作失败';
  //       switch (res.data.code) {
  //         case 0:
  //           msg = '密码重置完成，新密码已发送到你的邮箱';
  //           break;
  //         case 1:
  //           msg = '密码重置失败：';
  //           break;
  //         case 'invalid_param':
  //           msg = msg + '，参数不合法';
  //           break;
  //         case 10002:
  //           msg = msg + '，邮箱未注册';
  //           break;
  //         default:
  //           break;
  //       }
  //       this.$message({message: msg});
  //     }
  //   } catch (error) {
  //     this.fullscreenLoading = false;
  //     this.$message.error('操作失败！');
  //   }
  // }
  
}
</script>

<style scoped>
.eas-login-table {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: auto;
  background-color: #F9FAFC;
  padding: 32px;
  opacity: 0.9;
}
.title {
  margin: 20px 0 20px 0;
  color: #505458;
  font-size: 1.3em;
  font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}
</style>
