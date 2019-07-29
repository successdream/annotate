<template>
  <div id='going-task-edit'>
    <!-- <el-dialog title='任务编辑' :visible.sync="dialogVisible">
      <el-row>
        <el-col :span="12">
          <div class='grid-content bg-purple' style='border-right:1px solid #ccc'>
            <el-form v-if='editData!==null'>
              <el-form-item label='任务名 :'>
                <span>{{editData.name}}</span>
              </el-form-item>
              <el-form-item label='执行者 : '>
                <span>{{editData.owner.nickname}}</span>
              </el-form-item>
              <el-form-item label='标签 : '>
                <span>{{editData.type}}</span>
              </el-form-item>
              <el-form-item label='进度 :' >
                <span>{{editData.progress}}</span>
              </el-form-item>
              <el-form-item label='单价 :' >
                <span>{{editData.unitPrice}}</span>
              </el-form-item>
              <el-form-item label='步骤数 :'>
                <span>{{editData.stepCount}}</span>
              </el-form-item>
              <el-form-item label='预计总额 : '>
                <span>{{editData.totalPrice}}</span>
              </el-form-item>
              <el-form-item label="发布时间 : ">
                <span>{{editData.createTime}}</span>
              </el-form-item>
              <el-form-item label='发布人 : '>
                <span>{{editData.name}}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12" style='padding-left:30px'>
          <div class='grid-content bg-purple-light'>
            <el-collapse v-model='activeName' accordion>
              <el-collapse-item title='结算' name="1">
                <el-form>
                  <el-form-item label='结算金额 :'>
                    <span>
                      <el-input-number v-model="TotalMoney" controls-position="right" @change="handleChange" :min="0"></el-input-number>
                    </span>
                  </el-form-item>
                  <el-form-item label='备注 : '>
                    <span>
                      <el-input type='textarea' :autosize='{ minRows: 2, maxRows: 4}' placeholder='请输入备注' v-model='remark'></el-input>
                    </span>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item title='撤销' name='2'>
                <label>原因说明 ：</label>
                <el-radio-group v-model='cancel.reasonIndex' style='display:flex;flex-direction:column;padding:10px 0;'>
                  <el-radio v-for="(value, i) in cancel.reasons" :key="i" :label="i" @change="radioChange" style="margin:5px;">{{value}}</el-radio>
                </el-radio-group>
                <el-input v-if="cancel.reasonIndex==3?true:false" type=textarea :autosize="{ minRows: 2, maxRows: 4}" placeholder='请输入内容'
                  v-model="cancel.elseReason"
                ></el-input>
                <el-row>
                  <el-col :span="24">
                    <el-button type='primary' style='float:right' @click='revoke'>撤销</el-button>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type="primary" @click='dialogVisible = false'>确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import axios from 'axios';
import { State } from 'vuex-class';
declare var window: Window;
@Component({
  components: {}
})
export default class GoingTaskEdit extends Vue {
  // public dialogVisible: boolean = false;
  // public activeName = '1';
  // public TotalMoney: number = 0;
  // public remark: string = '';
  // public editData: any = null;
  // public editTaskIndex: number = 0;
  // public cancel = {
  //   reasons: ['任务分配错误', '标注质量不理想', '标注资源有变动', '其他'],
  //   reasonIndex: 0,
  //   elseReason: ''
  // };
  // public handleChange() {}
  // public radioChange() {}
  // public show(data) {
  //   this.dialogVisible = true;
  //   this.editData = data.row;
  //   this.editTaskIndex = data.$index;
  // }

  // async editTask(taskId, params, msg) {
  //   try {
  //     const res = await axios.put(`/management/task/${taskId}`, params);
  //     if (res.status === 200 && res.data.code === 0) {
  //       this.$message({ message: `${msg}完成！`, type: 'success' });
  //       this.dialogVisible = false;
  //       this.$emit('updataTasks',this.editTaskIndex);
  //     }
  //   } catch (error) {
  //     this.$message.error('程序异常');
  //   }
  // }
  // //结算
  // async balanceTotalMoney() {
  //   const params = {
  //     status: 'done',
  //     totalPrice: this.TotalMoney
  //   };
  //   await this.editTask(this.editData._id, params, '结算');
  // }
  // //撤销
  // async revoke() {
  //   const params = {
  //     status: 'cancel',
  //     cancelledReason:
  //       this.cancel.reasonIndex === 3
  //         ? this.cancel.elseReason
  //         : this.cancel.reasons[this.cancel.reasonIndex]
  //   };
  //   await this.editTask(this.editData._id, params, '撤销');
  // }
}
</script>
<style lang='scss'>
#going-task-edit {
  .el-form-item__label {
    width: 80px !important;
  }
}
</style>


