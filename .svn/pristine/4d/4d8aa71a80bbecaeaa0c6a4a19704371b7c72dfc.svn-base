<template>
  <div class="pro-sty" :style="{'width':width+'px'}">
    <el-input
      v-model="selClassTree.text"
      placeholder="请选择-知识体系分类"
      clearable
      read-only
      @change="changeTree"
      @click.native="
        deptogglePanel($event, 'classTree', selClassTree)
      "
    />
    <div v-if="showTree" ref="suoShuMenTree" class="treeDiv">
      <el-tree
        ref="classTree"
        class="suoshubumen"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script>

import waves from '@/directive/waves'; // waves directive

// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination

export default {
  directives: { waves },
  props: ['treeData', 'width', 'defaultProps', 'selClassTree'],
  data() {
    return {

      showTree: false
    };
  },

  methods: {
    handleNodeClick(node) {
      this.showTree = false;

      this.selClassTree.id = node.id;
      this.selClassTree.text = node.text;

      this.$emit('handleNodeClick', node);
    },
    changeTree() {
      this.$emit('changeTree');
    },
    // 点击空白关闭下拉菜单
    deptogglePanel(event, ref, panel) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      this.showTree ? this.dephide(ref, panel) : this.depshow(ref, panel);
    },
    depshow(ref, panel) {
      this.showTree = true;
      this.$nextTick(() => {
        this.$refs[ref].setCurrentKey(panel.id);
      });

      document.addEventListener('click', this.dephidePanel, false);
    },
    dephide() {
      this.showTree = false;
      document.addEventListener('click', this.dephidePanel, false);
    },

    dephidePanel(e) {
      if (
        this.$refs.suoShuMenTree &&
        !this.$refs.suoShuMenTree.contains(e.target)
      ) {
        this.dephide();
      }
    }

  }

};
</script>
<style lang="scss" scoped>
.pro-sty {
  width: 300px;
  display: inline-block;
  position: relative;
  margin-right: 5px;
  /deep/.border-red {
    .el-input__inner {
      border: 1px solid rgba(255, 0, 0, 0.59);
      -moz-box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
      -webkit-box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
      box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
    }
  }
  /deep/ .el-tree-node > .el-tree-node__children {
    overflow: inherit;
    background-color: transparent;
  }
  .treeDiv {
    position: absolute;
    top: 45px;
    left: 0px;
    width: 240px;
    padding: 14px;
    line-height: 40px;
    background-color: #fff;
    border-radius: 4px;
    z-index: 100;
    max-height: 500px;
    overflow: auto;
    /deep/.el-tree-node__content {
      height: 40px;
    }
    /deep/.el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
    }
  }

}
</style>
