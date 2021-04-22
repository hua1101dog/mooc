<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-select
            v-model="listQuery.paperClassificationId"
            style="margin-right: 5px;"
            placeholder="请选择-分组"
            filterable
            value-key="id"
          >
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :value="item.id"
              :label="item.text"
            />
          </el-select>
          <el-input
            v-model="listQuery.text"
            placeholder="试卷名称"
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
          <el-button  :disabled="!ids" type="primary" @click="handleDeleteAll">批量删除</el-button>
        </div>
      </div>
      <!-- 表格,数据循环list数组 -->

      <div class="panel-body">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          height="100%"
          :default-sort="{ prop: 'id', order: 'descending' }"
          @selection-change="handleSelectionChange"
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
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="试卷分组"
            prop="paperClassificationName"
            align="left"
          />
          <el-table-column label="试卷名称" prop="text" align="left" show-overflow-tooltip />
          <el-table-column
            label="组卷方式"

            align="left"
          >
            <template slot-scope="{ row }">
              {{ row.type == 1 ? "手动" : "自动" }}
            </template>
          </el-table-column>
          <el-table-column
            label="使用次数"
            prop="usedNum"

            align="left"
          />
          <el-table-column label="创建人" prop="creator" align="left" width="180px" show-overflow-tooltip />
          <el-table-column label="创建日期" prop="createTime" align="left" width="200px" />
          <el-table-column label="发布" align="left">
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.ispublish"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ccc"
                @change="changePub(row)"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="200px"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-link type="primary" :underline="false" style="padding: 0 3px;" @click="handleDetail(row)">查看详情</el-link>
              <el-link
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="handleUpdate(row)"
              >编辑</el-link>

              <el-link
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="handleDelete(row.id)"
              >删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="total > 0" class="panel-page">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>

    </div>

  </div>
</template>

<script>
import { findPage, deleteRow, changStatu, findGroup } from '@/api/mooc/paper';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Utils from '../util.js';

export default {
  name: 'PaperManage',
  components: { Pagination },
  directives: { waves },
  mixins: [settings],
  data() {
    return {

      ids: '',
      groupList: [],

      tableKey: 0,
      list: [],
      total: 0,

      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        text: '',
        paperClassificationId: ''

      }

    };
  },

  mounted: function() {
    var that = this;
    this.getList();
    this.getGroupList();
    Utils.$on('getlist', function(msg) {
      that.getList();
      that.getGroupList();
    });
  },
  activated() {
    var that = this;
    this.getList();
    this.getGroupList();
    Utils.$on('getlist', function(msg) {
      that.getList();
      that.getGroupList();
    });
  },

  methods: {
    resetQuery() {
      this.listQuery = {

        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        paperClassificationId: '',

        text: ''
      };
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    getGroupList() {
      findGroup().then(res => {
        // this.groupList = res.data;
        var obj = { id: -1, text: '默认分组' };
        this.groupList = res.data || [];
        this.groupList.unshift(obj);
      });
    },

    handleCreate() {
      this.$router.push({ path: '/paper/addPaper' });
    },
    handleDetail(row) {
      this.$router.push({ path: '/paper/detail', query: {
        id: row.id

      }});
    },

    handleUpdate(row) {
      // 查询编辑信息
      this.$router.push({
        path: '/paper/addPaper',
        query: {
          id: row.id

        }
      });
    },

    handleDelete(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteRow(id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.getList();
            } else {
              this.$message.error(response.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleDeleteAll() {
      var that = this;
      this.handleDelete(that.ids);
    },

    handleSelectionChange(val) {
      if (val && val.length) {
        this.ids = val.reduce(function(ret, n) {
          ret.push(n.id);
          return ret;
        }, []).join(',');
      } else {
        this.ids = '';
      }
    },
    handleNodeClick(node) {
      this.listQuery.hierarchyClassificationsName = node.text;
      this.selClassTree = {
        id: node.id,
        hierarchyClassificationsName: node.text
      };
      this.showTree = false;
      this.listQuery.hierarchyClassificationId = node.id;
      this.$set(this.listQuery, 'hierarchyClassificationId', node.id);
      this.$set(this.listQuery, 'hierarchyClassificationsName', node.text);
    },
    changePub(row) {
      var num;
      if (row.ispublish == 0) {
        num = 1;
      } else {
        num = 0;
      }

      changStatu({ id: row.id, ispublish: row.ispublish }).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: 'Success',
            message: '操作成功!',
            type: 'success',
            duration: 2000
          });
          this.getList();
        } else {
          this.$message.error(res.msg);
          if (row.ispublish == 0) {
            row.ispublish == 1;
          } else {
            row.ispublish == 0;
          }
        }
      });
    }

  }

};
</script>
<style lang="scss" scoped>
 /deep/ .el-button--primary.is-disabled,
 .el-button--primary.is-disabled:hover,
  .el-button--primary.is-disabled:focus,
   .el-button--primary.is-disabled:active{
      color: #FFFFFF !important;
    background-color: #f4bd87 !important;
    border-color: #f4bd87 !important;
}
</style>
