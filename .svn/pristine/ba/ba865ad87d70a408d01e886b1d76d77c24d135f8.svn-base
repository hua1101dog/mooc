/* eslint-disable no-empty */
<template>
  <div style="height:100%">
    <div style="height:100%">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <div class="pro-sty">
            <el-input
              v-model="listQuery.classname"
              placeholder="请选择分类"
              clearable
              read-only
              @change="changeTree"
              @click.native="deptogglePanel($event, 'classTree', selClassTree)"
            />
            <div v-if="showTree" ref="suoShuMenTree" class="treeDiv">
              <el-tree
                ref="classTree"
                class="suoshubumen"
                :data="nodes"
                :props="defaultProps"
                node-key="id"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
              />
            </div>
          </div>

          <el-input
            v-model="listQuery.coursename"
            style="margin-right: 5px;"
            placeholder="课程名称"
            class="filter-item"
          />
          <el-button
            v-waves
            type="primary"
            @click="handleFilter"
          >查询</el-button>
          <el-button v-waves type="default" @click="resetQuery">重置</el-button>
        </div>
        <div class="operate-panel_right">
          <el-button type="primary" @click="handleCreate">新增</el-button>
        </div>
      </div>
      <!-- 表格,数据循环list数组 -->

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        height="calc(100% - 119px)"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <!-- NO列 -->
        <el-table-column label="NO" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>
              {{
                (listQuery.currentPage - 1) * listQuery.pageSize +
                  scope.$index +
                  1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="封面" prop="coverimg" align="left">
          <template slot-scope="{ row }">
            <el-image
              v-if="row.coverimg"
              style="width: 164px; height: 90px;object-fit:contain"
              :src="processImgUrl(row.coverimg)"
              :preview-src-list="row.coverimg.split(',')"
            />
            <img
              v-if="!row.coverimg"
              style="width: 164px; height: 90px"
              src="@/assets/images/defaultImg.png"
              alt
            >
          </template>
        </el-table-column>
        <el-table-column
          label="课程"
          prop="coursename"
          align="left"
          show-overflow-tooltip
        />
        <el-table-column
          label="分类"
          prop="classNamePath"
          align="left"
          show-overflow-tooltip
        />

        <el-table-column label="类型" width="150px" align="left">
          <template slot-scope="{ row }">
            <span v-if="row.type">
              {{
                row.type == 1 ? "私有" : row.type == 2 ? "半公开" : "公开"
              }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建人/时间"
          align="left"
          show-overflow-tooltip
          min-width="150px"
        >
          <template slot-scope="{ row }">
            <div>
              {{ row.creatorName }}
            </div>
            <div>
              {{ row.createtime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" align="left">
          <template slot-scope="{ row }">
            <el-tooltip
               v-if="row.hasSort"
              class="item"
              effect="dark"
              content="回车保存"
              placement="right-end"
            >
              <el-input
                v-model="row.sort"
                style="margin-right: 5px;width:100px"
                class="filter-item"
                oninput="value=value.replace(/[^\d]/g,'')"
                @keyup.native.13="UpdateSort(row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="120px"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <!-- v-if="row.admin ? true : row.oneCompany" -->
            <el-link
              v-if="row.admin ? true : row.oneCompany"
              type="primary"
              :underline="false"
              style="padding: 0 3px;"
              @click="ToBaseInfo(row)"
            >管理</el-link>
            <!-- v-if="row.admin ? true : row.oneCompany" -->
            <el-link
              v-if="row.admin ? true : row.oneCompany"
              type="primary"
              :underline="false"
              style="padding: 0 3px;"
              @click="handleDelete(row)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="total > 0" class="panel-page">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
    </div>

    <el-dialog
      title="预览"
      :visible.sync="dialogImgVisible"
      width="300px"
      append-to-body
        :close-on-click-modal="false"
    >
      <div class="qrcodeimg">
        <el-image
          style="width: 100px; height: 80px"
          :src="tempImg"
          fit="contain"
        />
      </div>
      <div>
        <el-button
          type="primary"
          style="margin: 0 auto;display: inherit;"
          @click="saveImg(tempImg)"
        >保存二维码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findPage, deleteRow, getDataTree, editRow } from '@/api/mooc/course';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
const base64 = require('js-base64').Base64;
export default {
  components: { Pagination },
  directives: { waves },

  mixins: [settings],
  data() {
    return {
      courseList: [],
      tableKey: 0,
      list: [],
      total: 0,
      value: true,
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        coursename: '',
        classid: '',
        state: ''
      },
      selClassTree: {},
      nodes: [],
      defaultProps: {
        children: 'nodes',
        label: 'classname'
      },
      tempImg: '',
      stateList: [
        {
          value: '1',
          name: '未发布'
        },
        {
          value: '2',
          name: '审核中'
        },
        {
          value: '3',
          name: '已发布'
        }
      ],

      dialogImgVisible: false,
      showTree: false
    };
  },

  mounted: function() {
    this.handleFilter();
    this.getDataTree();
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        coursename: '',
        classid: '',
        state: ''
      };
    },
    async getDataTree() {
      try {
        this.loading = true;
        await getDataTree().then(res => {
          this.nodes = res.data;
        });
      } finally {
        this.loading = false;
      }
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      if (this.listQuery.coursename) {
        this.listQuery.currentPage = 1;
        this.listQuery.pageIndex = 0;
      }
      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
        this.list && this.list.length &&
          this.list.forEach(v => {
            if (v.admin) {
              v.hasSort = true;
            } else {
              if (v.oneCompany) {
                v.type == 1 ? '私有' : v.type == 2 ? '半公开' : '公开';
                if (v.type && v.type == 1) {
                  // 判断是否是自己创建的 如果是那么  公开与半公开课程不允许排序，私有课程允许排序；未设置课程权限类型的不允许排序
                  v.hasSort = true;
                } else {
                  v.hasSort = false;
                }
              } else {
                // 否则 不允许排序
                v.hasSort = false;
              }
            }
          });
      });
    },
    resetTemp() {
      this.form = { bannerlogo: '' };
    },
    handleCreate() {
      // 跳转到新增页面
      this.$router.push({ path: '/create/index' });
    },
    UpdateSort(row) {
      // 按下enter 键的时候 更新sort值
      row.sort = row.sort - 0;
      editRow(row).then(res => {
        if (res.code == 0) {
          this.$message.success('提交成功');

          this.handleFilter();
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      });
    },
    handleUpdate(row) {
      // 查询编辑信息
      this.dialogStatus = 'update';

      if (row.id) {
        this.form = Object.assign({}, row);

        this.dialogFormVisible = true;
      } else {
        handleCreate();
      }
    },
    ToBaseInfo(row) {
      var param = Object.assign({}, row);

      this.$delete(param, 'coverimg');

      this.$router.push({
        path: '/courseManage/index',
        query: {
          info: base64.encode(JSON.stringify(param)),
          coverimg: row.coverimg
        }
      });
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除;
          deleteRow(row.id).then(response => {
            this.$notify({
              title: 'Success',
              message: '删除成功!',
              type: 'success',
              duration: 2000
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleNodeClick(node) {
      this.listQuery.classname = node.classname;

      this.selClassTree = {
        id: node.id,
        classname: node.classname
      };
      this.showTree = false;
      this.listQuery.classid = node.id;
      this.$set(this.listQuery, 'classid', node.id);
      this.$set(this.listQuery, 'classname', node.classname);
    },
    changeTree() {
      this.listQuery.classname = '';
      this.listQuery.classid = '';
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
    },

    handleAvatarSuccess(res, file) {
      this.form.bannerlogo = this.processImgUrl(res.urls);
      this.$set(this.form, 'bannerlogo', this.processImgUrl(res.urls));
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }

      return isJPG;
    },

    removeImg(eve) {
      eve.stopPropagation();
      this.form.bannerlogo = '';
    },
    async updateData() {
      try {
        await editRow(this.form).then(res => {
          this.$message.success('提交成功');
          this.dialogFormVisible = false;
          this.getList();
        });
      } finally {
      }
    },
    showQRcodeing(img) {
      this.dialogImgVisible = true;
      this.tempImg = img;
    },
    handleFilter() {
      this.getList();
    },
    saveImg(imgURL) {}
  }
};
</script>
<style lang="scss" scoped>

.qrcodeimg {
  width: 111px;
  height: 117px;
  margin: 0 auto;
  display: inherit;
}
.pro-sty {
  width: 200px;
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
