<template>
  <div>
    <el-dialog title='提示' :visible.sync='dialogVisible' width='30%' :before-close='handleClose' :modal-append-to-body='false'>
      <div>
        <el-form :model='formData' status-icon ref='formData' label-width='100px' class='demo-ruleForm'>
          <el-form-item label="描述 :" prop="label">
            <el-input type="text" :disabled="readonly" v-model="formData.label" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标签 :" prop="description">
            <el-input type="text" :disabled="readonly" v-model.number="formData.description"></el-input>
          </el-form-item>
          <el-form-item v-if="!readonly">
            <el-button type='primary' @click="submitForm('formData')" id='btn'>提交</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<style>
</style>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ElButton } from 'element-ui/types/button';
import { ElForm } from 'element-ui/types/form';
import API from '../../api';
const uuidv4 = require("uuid/v4");
@Component({
  components: {}
})
export default class TagController extends Vue {
  public dialogVisible = false;
  public readonly = false;
  public formData = {
           createdAt: '',
           label: '',
           description: '',
           name: '',
           parentId: '',
           select:'',
           _id:''
         };
  public tagID = uuidv4();
  public async mounted() {}
  public controller = '';
  created() {}
  show({index,data},controller) {
    this.dialogVisible = true;
    if(controller === 'add'){
      this.formData.description = '';
      this.formData.label = '';
      this.formData.parentId = data._id;
      this.formData._id = this.tagID;
    }else if(controller === 'edit'){
      this.formData.description = data.description;
      this.formData.label = data.label;
      this.formData.parentId = data.parentId;
      this.formData._id = data._id;
    }else if(controller === 'look'){
      this.readonly = true;
      this.formData.description = data.description;
      this.formData.label = data.label;
      this.formData.parentId = data.parentId;
      this.formData._id = data._id;
    }
    this.formData.createdAt = data.createdAt;
    this.formData.name = data.name;
    this.formData.select = data.select;
    this.controller = controller;
  }

  handleClose(done) {
    done();
  }

  resetForm(formName) {
    const formData = this.formData;
    for (var k in formData) {
      this.formData[k] = '';
    }
  }
  //添加标签
  async getAddTagData(data){
    try{
      const res = await API.tags.addTags(data);
      if(res.status === 200){
        return res;
      }else{
        this.$message.error('操作失败');
      }
    }catch(err){
      this.$message.error('操作失败');
    }
  }
   //编辑标签
  async getEditTagData(data){
    try{
      const res = await API.tags.editTags(data);
      if(res.status === 200){
        return res;
      }else{
        this.$message.error('操作失败');
      }
    }catch(err){
      this.$message.error('操作失败');
    }
  }
  async submitForm(formName) {
    await (this.$refs[formName] as ElForm).validate(async valid => {
      if (valid) {
        let res:any = null;
        switch(this.controller){
          case 'add':
          res = await this.getAddTagData(this.formData);
          break;
          case 'edit':
          res = await this.getEditTagData(this.formData);
          break;
        }
        
        if(res === undefined)  return;
        if(res.status && res.data.result === true){
           this.$message({
             type:'success',
             message:'操作成功'
           })
          if(this.controller === 'add'){
            this.$emit('addData',this.formData);
          }else{
            this.$emit('editData',this.formData);
          }
        }
      } else {
        return false;
      }
    });
    this.dialogVisible = false;
  }
}
</script>


