<template>
  <div>
    <el-form :model='params' :rules='userRules' ref='signup' label-width='80px' inline>
      <el-form-item label='用户名：' prop='username'><el-input v-model.trim='params.username'></el-input></el-form-item>
      <el-form-item label=密码： prop='password'><el-input type=password v-model='params.password'></el-input></el-form-item>
      <el-form-item label='姓名：' prop='nickname'><el-input v-model.trim='params.nickname'></el-input></el-form-item>
      <el-form-item label="手机号：" prop="phone"><el-input v-model.trim="params.phone"></el-input></el-form-item>
      <el-form-item label='邮箱：' prop='email'><el-input v-model.trim='params.email'></el-input></el-form-item>
      <el-form-item style='float:right; padding-right:30px;'>
        <el-button type='primary' @click='signupSubmit'>注册</el-button>
        <el-button @click='signupReset'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue ,Emit  } from 'vue-property-decorator';
import axios from 'axios';
import API from '../api';
import { Form as ElForm } from 'element-ui';

@Component({
  components: {},
})
export default class DialogEditUser extends Vue {
  $refs!:{
    signup:ElForm
  }
  public params: any = {username: '', password: '', nickname: '', phone: '', email: ''};
  public data() {
    return {
      userRules: API.user.rules,
    };
  }
  public init() {
    this.params = {username: '', password: '', nickname: '', phone: '', email: ''};
  }
  public async signupSubmit() {
    if (!await this.$refs.signup.validate()) return;
    try {
      const res = await axios.post('/user/user/', this.params);
      console.log(res)
      if (res.status === 201) {
        this.$message({message: '注册完成', type: 'success'});
     
        ((this)as any).$parent.$parent.signupVisible=false;
         ((this)as any).$parent.$parent.getalluser();
      } else {
        let msg = '注册失败';
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
        this.$message({message: msg, type: 'warning'});
      }
    } catch (err) {
       console.log(err)
      // this.$message.error('程序异常！');
    }
  }

  public signupReset() {
    this.$refs.signup.resetFields();
  }
}
</script>

<style lang="scss" scoped>

</style>
