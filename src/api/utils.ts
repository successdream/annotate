import { Vue } from 'vue-property-decorator';
import { ElMessageBoxOptions } from 'element-ui/types/message-box';

export default {
  async confirm(vueInstance: Vue, msg: string) {
    try {
      const options: ElMessageBoxOptions = { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' };
      await vueInstance.$confirm(msg, '提示', options);
      return true;
    } catch (error) {
      return false;
    }
  }
};
