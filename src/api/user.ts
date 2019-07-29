
import axios from 'axios';
import moment from 'moment';
const MODULE_URL = 'user/';
export default {
  async getMyAccount() {
    try {
      const res = await axios.get(`/api/${MODULE_URL}user`);
      if (res && res.status === 200) {
       return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getAllUsers() {
    let result: any[] = [];
    const res = await axios.get(`/api/${MODULE_URL}users`);
    if (res && res.status === 200) {
      result = res.data.map((user: any) => {
        user = JSON.parse(JSON.stringify(user));
        user.createTime = moment(user.createTime).format('YYYY-MM-DD HH:mm:ss');
        user.updateTime = moment(user.updateTime).format('YYYY-MM-DD HH:mm:ss');
        user.level = this.levels.find(l => l.number === user.level);
        return user;
      });
    }
    return result;
  },
  //TODO暂时不明白用途
  async delUser(userId: string) {
    try {
      const res = await axios.delete(`/api/${MODULE_URL}user/${userId}`);
      return res.status === 200 && res.data.code === 0;
    } catch (error) {
      console.log('删除用户异常！');
    }
  },
  //删除用户
  async delUsers(id){
    const res = await axios.delete(`/api/user/user/${id}/`);
    return res;
  },
  get levels() {
    return [{
         number: 0,  value: 'root',  label: 'ROOT',       // 唯一
      }, { number: 1,  value: 'manager1', label: '管理员 Ⅰ', // 任务结算
      }, { number: 2,  value: 'manager2', label: '管理员 Ⅱ', // 任务发布，资源配置
      }, { number: 3,  value: 'manager3', label: '管理员 Ⅲ', // 修改用户资料
      }, { number: 99, value: 'normal', label: '普通用户',
    }];
  },

  get rules() {
    return {
      none: [
        { message: '请选择', trigger: 'change' },
      ],
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 128, message: '长度在 6 到 128 个字符', trigger: 'blur' },
      ],
      nickname: [
        { max: 128, message: '最长为 128 个字符', trigger: 'blur' },
      ],
      phone: [
        { max: 32, message: ' Σ( ° △ °|||)︴确定是手机号？', trigger: 'blur' },
      ],
      email: [
        { type: 'email', required: true, message: '请输入邮箱账号', trigger: 'blur' },
      ],
    };
  },

};
