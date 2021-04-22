<template>
  <div class="pro-sty">
    <!-- <el-form-item label="所属区域：" prop="regionLongcode"> -->
    <el-input
      placeholder="请选择区域"
      v-model="projectName"
      clearable
      @click.native="deptogglePanel($event)"
    ></el-input>
    <!-- :default-expanded-keys="expandedRegionIds" -->
    <div v-if="showTree" class="treeDiv" ref="suoShuMenTree">
      <el-tree
        class="suoshubumen"
        :data="treeData"
        ref="proTree"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :default-expanded-keys="expandedRegionIds"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
  <!-- </el-form-item> -->
</template>

<script>
import pathToRegexp from "path-to-regexp";

import { mapGetters, mapMutations } from "vuex";
import common from "@/assets/js/common";

export default {
  data() {
    return {
      selProject: {},
      projectName: "",
      showTree: false,
      treeData: [],
      defaultProps: {
        children: "nodes",
        label: "text"
      },
      expandedRegionIds: []
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
    }
  },
  // created() {
  //   this.loadTree()
  // },
  mounted() {
    //const proj=sessionStorage.getItem('selProjectId')
    this.loadTree();
  },
  methods: {
    ...mapMutations({
      setProject: "user/SEL_PROJ"
    }),
    filterNotPark(node) {
      node.nodes &&
        node.nodes.forEach(n => {
          if (n.parkId != "") {
            if (n.nodes) {
              delete n.nodes;
            }
          } else {
            this.filterNotPark(n);
          }
        });
    },
    loadTree() {
      loadProjectTree().then(res => {
        this.treeData = res.data;
        console.log(this.treeData);
        if (this.treeData && this.treeData.length > 0) {
          let flatDetpTree = common.treeToFlat(this.treeData);
          flatDetpTree.map(node => {
            if (node.parkId) {
              delete node.nodes;
            }
          });
          //选中之前选中的部门
          const lastDeptId = sessionStorage.getItem("lastDeptId");
          this.selProject = lastDeptId
            ? flatDetpTree.find(function(n) {
                return n.id == lastDeptId;
              })
            : null;
          //如果部门为空，当前部门选中第一个根节点！
          if (!this.selProject) {
            this.selProject = this.treeData[0];
          }
          this.setProject(this.selProject);
          this.projectName = this.selProject.text;
          this.expandedRegionIds.push(this.selProject.id);
        }
      });
    },
    // 点击空白关闭下拉菜单
    deptogglePanel(event) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      this.showTree ? this.dephide() : this.depshow();
    },

    depshow() {
      this.showTree = true;
      this.$nextTick(() => {
        this.$refs["proTree"].setCurrentKey(this.selProject.id);
      });
      //this.$refs["proTree"].setCurrentKey(this.selProject.id);
      document.addEventListener("click", this.dephidePanel, false);
    },
    dephide() {
      this.showTree = false;
      document.addEventListener("click", this.dephidePanel, false);
    },

    dephidePanel(e) {
      if (
        this.$refs.suoShuMenTree &&
        !this.$refs.suoShuMenTree.contains(e.target)
      ) {
        this.dephide();
      }
    },
    handleNodeClick(node) {
      console.log("======", node);
      this.projectName = node.text;
      this.selProject = node;
      this.showTree = false;
      this.expandedRegionIds.push(node.id);
      sessionStorage.setItem("lastDeptId", this.selProject.id);
      //this.showRegionTree = false

      this.setProject(node);
    }
  }
};
</script>

<style lang="scss" scoped>
.pro-sty {
  width: 240px;
  float: left;
  line-height: 50px;
  margin-left: 31px;
  position: relative;
  /deep/.border-red {
    .el-input__inner {
      border: 1px solid rgba(255, 0, 0, 0.59);
      -moz-box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
      -webkit-box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
      box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
    }
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
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    cursor: text;
  }
}
</style>
