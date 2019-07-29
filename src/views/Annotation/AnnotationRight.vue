<template>
  <div id="tree">
    <el-tree
      default-expand-all
      :data="data"
      node-key="id"
      :props="defaultProps"
      :render-content="renderTreeNode"
      @node-expand="expandNode"
      @node-collapse="expandCollapse"
      @node-drop='dragComplete'
      @node-drag-over='dragOver'
      draggable
      @allow-drop='allowDrop'
      v-if='show'
    ></el-tree>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class tree extends Vue {
  data = [
    {
      id: 1,
      label: "一级 1",
      children: [
        {
          id: 4,
          label: "二级 1-1",
          children: [
            {
              id: 9,
              label: "三级 1-1-1"
            },
            {
              id: 10,
              label: "三级 1-1-2"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: "一级 2",
      children: [
        {
          id: 5,
          label: "二级 2-1"
        },
        {
          id: 6,
          label: "二级 2-2"
        }
      ]
    },
    {
      id: 3,
      label: "一级 3",
      children: [
        {
          id: 7,
          label: "二级 3-1"
        },
        {
          id: 8,
          label: "二级 3-2",
          children: [
            {
              id: 11,
              label: "三级 3-2-1"
            },
            {
              id: 12,
              label: "三级 3-2-2"
            },
            {
              id: 13,
              label: "三级 3-2-3"
            }
          ]
        }
      ]
    }
  ];
  defaultProps = {
    children: "children",
    label: "label"
  };
  show = true;
  iconHtml = null;
  mounted() {
    const child = this.$children;
  }
  renderTreeNode(h, { node, data, store }) {
    // return (
    //   <div class="fool">
    //     <span
    //       class={{
    //          icon: data.children && data.children.length,
    //         "icon-pic-close": true,
    //       }}
    //       ref="icon"
    //     />
    //     <span class="fool-content">{data.label}</span>
    //   </div>
    // );
    return (<div></div>)
  }
  handleDragStart(node, ev) {
    console.log("drag start", node);
  }
  handleDragEnter(draggingNode, dropNode, ev) {
    console.log("tree drag enter: ", dropNode.label);
  }
  handleDragLeave(draggingNode, dropNode, ev) {
    console.log("tree drag leave: ", dropNode.label);
  }
  handleDragOver(draggingNode, dropNode, ev) {
    console.log("tree drag over: ", dropNode.label);
  }
  handleDragEnd(draggingNode, dropNode, dropType, ev) {
    console.log("tree drag end: ", dropNode && dropNode.label, dropType);
  }
  handleDrop(draggingNode, dropNode, dropType, ev) {
    console.log("tree drop: ", dropNode.label, dropType);
  }
  allowDrop(draggingNode, dropNode, type) {
    
  }
  allowDrag(draggingNode) {
    return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
  }
  expandNode(data, node, item) {
    const iconHtml = item.$children[0].$el.children[0];
    if (iconHtml.classList.contains("icon-pic-close")) {
      iconHtml.classList.remove("icon-pic-close");
      iconHtml.classList.add("icon-pic-open");
    } else {
      iconHtml.classList.remove("icon-pic-open");
      iconHtml.classList.add("icon-pic-close");
    }
  }
  expandCollapse(data, node, item) {
    const iconHtml = item.$children[0].$el.children[0];
    if (iconHtml.classList.contains("icon-pic-close")) {
      iconHtml.classList.remove("icon-pic-close");
      iconHtml.classList.add("icon-pic-open");
    } else {
      iconHtml.classList.remove("icon-pic-open");
      iconHtml.classList.add("icon-pic-close");
    }
  }
  //只打开某个节点
  dragComplete(isDragNode,dragNode,position){
    //当vue数据层次过深，但是数据已经更新DOM没有跟新的时候，可用slice方法，重新赋值一个数组
    this.data =this.data.slice(0);
  }
  dragOver(isDragNode,Node,event){
    console.log(isDragNode,Node,event)
  }
}
</script>
<style lang='scss'>

</style>

<style lang='scss' >
#tree {
  .fool {
    width: 300px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid #ccc;
  }
  .tree-icon {
    display: inline-block;
  }
  .icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }
  .icon-pic-close {
    background-image: url("../../../public/assets/images/down-circle-fill.svg");
    background-size: cover;
  }
  .icon-pic-open {
    background-image: url("../../../public/assets/images/right-circle-fill.svg");
    background-size: cover;
  }
  .el-icon-caret-right:before {
    content: "" !important;
  }
  .fool-content {
    padding-left: 20px;
    width: 200px;
    display: inline-block;
  }
  .el-tree-node__content {
    height: 40px !important;
  }
}
</style>


