import axios from 'axios';

export default{
  //新建模板页面，添加模板
  async addTemplate(data){
    const res = await axios.post(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31/main/addtemplate`,data);
    return res;
  },
  //历史模板页面，获取历史模板
  async getHistoryTemplateData(){
    const res = await axios.get(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31/main/gettemplate`);
    return res;
  },
  //历史模板页面，删除模板
  async deleteHistoryTemplateData(id){
    const res = await axios.post(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31/main/deletetemplate`,{id:id});
    return res;
  },
  //历史模板页面，编辑模板
  async editHistoryTemplateData(data,id){
    const res = await axios.post(`http://192.168.3.21:10001/mock/5c6f5495a63d160016226a31/main/edittemplate`,{id:id});
    return res;
  }

}