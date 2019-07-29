import { Message } from 'element-ui';
import axios from 'axios';
export default{
  async loginSubmit(loginParams) {
      const { username, password, grant_type } = loginParams;
      const res = await axios({
        method: 'post', url: '/api/user/token/',
        headers: {Authorization: 'Basic Yzpz'},
        data: `username=${username}&password=${password}&grant_type=${grant_type}`,
      });
      return res
  },
  async getBackPassword(formName: string) {
    const res = await axios.put('/user/resetpwd/', formName);
    return res;
  }

}