<template>
  <div style="height:100%">
    <div style="height:100%">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <template>
            <el-radio
              v-model="listQuery.isleaf"
              label=""
              @change="getList"
            >全部分类</el-radio>
            <el-radio
              v-model="listQuery.isleaf"
              label="0"
              @change="getList"
            >只看一级分类</el-radio>
            <el-radio
              v-model="listQuery.isleaf"
              label="1"
              @change="getList"
            >只看二级分类</el-radio>
          </template>

          <el-input
            v-if="listQuery.isleaf !== ''"
            v-model="listQuery.name"
            style="margin-right: 5px;"
            placeholder="分类名称"
            class="filter-item"
            @input="forceUpdate"
          />
          <el-button v-waves type="primary" @click="handleFilter">查询</el-button>
          <el-button v-waves type="default" @click="resetQuery">重置</el-button>
        </div>
        <div class="operate-panel_right">
          <el-button
            v-permission:add
            type="primary"
            @click="handleCreate"
          >新增一级分类</el-button>
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
          label="名称"
          prop="classname"
          align="left"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <template v-if="row.edit && row.parentid == '0'">
              <el-input
                v-model="row.classname"
                class="edit-input"
                maxlength="5"
                placeholder="最多可输入5个字符"
                show-word-limit
              />
            </template>
            <template v-if="row.edit && row.parentid !== '0'">
              <el-input
                v-model="row.classname"
                class="edit-input"
                maxlength="20"
                placeholder="最多可输入20个字符"
                show-word-limit
              />
            </template>
            <span v-else>{{ row.classname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上级分类" align="left" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <template v-if="row.edit && !row.parentName">
              <el-input
                readonly
                placeholder="系统自动带出"
                class="edit-input"
              />
            </template>
            <span v-else>{{ row.parentName || "/" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="creatorName" align="left">
          <template slot-scope="{ row }">
            <template v-if="row.edit && !row.creatorName">
              <el-input
                readonly
                placeholder="系统自动带出"
                class="edit-input"
              />
            </template>
            <span v-else>{{ row.creatorName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-permission:operation
          label="操作"
          align="center"
          width="300px"
          fixed="right"
        >

          <template slot-scope="{ row }">
            <el-link
              v-show="row.edit"
              type="primary"
              :underline="false"
              style="padding: 0 3px;"
              @click.native="confirmEdit(row)"
            >
              保存
            </el-link>

            <el-link
              v-show="!row.edit && row.parentid=='0'"
              v-permission:operation
              type="primary"
              :underline="false"
              style="padding: 0 3px;"
              @click.native="addChildNode(row)"
            >
              +二级分类
            </el-link>
            <el-link
              v-permission:operation
              type="primary"
              :underline="false"
              style="padding: 0 3px;"
              @click.native="isEdit(row)"
            >
              {{ row.edit ? "取消" : "编辑" }}
            </el-link>
            <el-link
              v-permission:operation
              type="primary"
              :underline="false"
              style="padding: 0 3px;"
              @click.native="handleDelete(row)"
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
  </div>
</template>

<script>
import {
  findMoocclassPage,
  deleteClassRow,
  editClassRow
} from '@/api/mooc/course';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
const base64 = require('js-base64').Base64;

export default {
  components: { Pagination },
  directives: { waves },
  mixins: [settings],
  props: ['courseid'],
  data() {
    return {
      courseList: [],
      tableKey: 0,
      list: [],
      topClassList: [],
      secondClassList: [],
      total: 0,
      value: true,
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        isleaf: ''
      },
      classid: '',
      classid2: ''

    };
  },

  mounted: function() {
    this.getList();
  },

  methods: {
    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      this.listQuery.nameLevel = this.listQuery.isleaf;
      if (!this.listQuery.isleaf) {
        this.listQuery.name = '';
      }

      findMoocclassPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
        if (this.list && this.list.length) {
          this.topClassList = this.list.filter(v => v.isleaf == 0);
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
          deleteClassRow(row.id).then(response => {
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
    handleCreate() {
      this.list.push({
        classname: '',
        edit: true,
        parentid: '0'
      });
    },
    resetQuery() {
      this.listQuery = {
        isleaf: '',
        name: '',
        nameLevel: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10
      };
    },

    addChildNode(row) {
      this.list.push({
        classname: '',
        edit: true,
        parentid: row.id,
        parentName: row.classname
      });
    },
    isEdit(row) {
      // row.edit = !row.edit;
      if (row.edit) {
        // 取消
        if (!row.id) {
          this.list.splice(this.list.length - 1, 1);
        } else {
          this.$set(row, 'edit', !row.edit); // 动态添加
        }
      } else {
        // 编辑
        this.$set(row, 'edit', !row.edit);
      }
    },

    confirmEdit(row) {
      if (!row.classname) {
        this.$message.error('请填写名称');
        return;
      }
      row.edit = false;
      editClassRow(row).then(res => {
        this.$message.success('提交成功');

        this.getList();
      });
    },
    chooseClass(id) {
      this.classid2 = '';
      this.listQuery.name = '';
      if (this.list && this.list.length) {
        if (this.list && this.list.length) {
          this.secondClassList = this.list.filter(v => v.parentid == id);
        }
      }
    },
    forceUpdate() {
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
 height: 100% !important;
}
.filter-container{
  height: 100%;
}
.qrcodeimg {
  width: 111px;
  height: 117px;
  margin: 0 auto;
  display: inherit;
}
</style>
