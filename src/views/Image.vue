<template>
  <div>
    <input multiple id="fileElem" type="file" @change="handFile"  style="display:none" accept="image/*">
    <label for="fileElem">Select some files</label>
    <button class="btn" @click="btnClick">按钮</button>
    <div id="content">

    </div>
  </div>
</template>

<script >
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '../api';
import { Upload } from 'element-ui';

@Component({
})
export default class Login extends Vue {

  //按钮点击
  async btnClick(){
    const fileItem = document.querySelector('#fileElem');
    if( fileItem === null) return;
    const formData  = new FormData();
    formData.append("file", fileItem.files[0]);
    formData.append("tagIds",'[]');
    formData.append("creatorId", '5c984456d488e2004988a986');
    axios.defaults.headers.common['Authorization'] = 'Bearer 575a71fa30685232fc3f3dc99ee7ef5f6d087028';
    // const res = axios.post('main/upload',formData,{headers: {'Content-Type': 'multipart/form-data'}})
    const res = await axios({
      method:'post',
      url:'/main/123',
      params:{'a':1},
      data:{
        'a':1
      }
    })
    // console.log(res);
  }
  //文件点击
  fileSelect(e){
    const fileElem = document.getElementById("fileElem");
    if (fileElem) {
     fileElem.click();
   }
   e.preventDefault(); // 避免导航到 "#"
  }
 //处理文件
 handFile(data){
  const filesList = data.target.files;
  const content = document.querySelector('#content');
  if(content === null) return;
  if(filesList.length<=0) return;
  for(let a = 0; a < filesList.length; a++){
    const file = filesList[a];
    const fileReader = new FileReader();
    const img = document.createElement('img');
    img.file = file;
    fileReader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    fileReader.readAsDataURL(file);
    img.classList.add('obj');
    content.appendChild(img);
    img.src = window.URL.createObjectURL(file);
    img.height = 60;
    img.onload = function() {
        window.URL.revokeObjectURL(this.src);
     }
      content.appendChild(img);

  }
 }
}
</script>

<style lang='scss'>
.obj{
  width: 100px;
  height: 100px;
}
</style>