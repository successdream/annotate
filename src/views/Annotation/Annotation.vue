<template>
  <div>
    <el-row style='height:100%;display:flex;'>
      <el-col  class='heightFullParent' style='width:300px'>
        <div class='grid-content bg-purple heightFullParent widthFullParent'>
          <AnnotationLeft></AnnotationLeft>
        </div>
      </el-col>
      <el-col :span='24' class='heightFullParent'>
        <div class='grid-content bg-purple-light heightFullParent widthFullParent' >
          <AnnotationCenter></AnnotationCenter>
        </div>
      </el-col>
      <el-col  class='heightFullParent' style='width:300px;display:inline-block'>
        <div class='grid-content bg-purple heightFullParent widthFullParent'>
           <AnnotationRight bar='3'></AnnotationRight>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import AnnotationLeft from './AnnotationLeft.vue';
import AnnotationCenter from './AnnotationCenter.vue';
import AnnotationRight from './AnnotationRight.vue';
@Component({
  components: {
    AnnotationLeft,
    AnnotationCenter,
    AnnotationRight
  }
})
export default class Annotation extends Vue {
  
}
</script>

<style lang='scss' scoped>
#annotation {
  position: absolute;
  top: 45px;
  bottom: 0px;

  .left {
    position: absolute;
    width: 200px;
    height: 100%;
    border-right: 1px solid #ccc;
  }
  .center {
    position: absolute;
    left: 200px;
    right: 10px;
    height: 100%;
  }
  .right {
    
  }
}
</style>


