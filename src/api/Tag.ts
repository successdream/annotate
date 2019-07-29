import axios from 'axios';
const MODULE_URL = '/main/';
export default{
  async getTags(){
    const res = await axios.get(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31${MODULE_URL}tags`);
    return res;
  },
  async addTags(data){
    const res = await axios.post(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31${MODULE_URL}addtag`,{data:data});
    return res;
  },
  async deleteTags(data){
    const res = await axios.post(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31${MODULE_URL}deletetags`);
    return res;
  },
  async editTags(data){
    const res = await axios.post(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31${MODULE_URL}edittags`);
    return res;
  }
}