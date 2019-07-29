import axios from 'axios';
export default{
  async getFilterTasksData(params){
    const res = await axios.get(`/api/management/tasks/${params}`);
    return res;
  }
}