<template>
  <div style="height: 100%;">
    <div style="height: 100%;">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-input
            v-model="listQuery.materialname"
            style="margin-right: 5px;"
            placeholder="名称"
            class="filter-item"
          />
          <el-button
            v-waves
            type="primary"
            @click="search"
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
        style="width: 100%;height: calc(100% - 128px);"

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

        <el-table-column
          label="名称"
          prop="materialname"
          align="left"
          show-overflow-tooltip
        />

        <el-table-column
          label="上传人"
          prop="creatorName"

          align="left"
        />

        <el-table-column
          label="上传时间"
          prop="createtime"
          align="left"
          sortable
          show-overflow-tooltip
          min-width="150px"
        />

        </el-table-column>
        <el-table-column
          label="下载次数"
          prop="downloadTimes"

          align="left"
          sortable
        />
        <el-table-column
          label="操作"
          align="center"
          width="120px"
          fixed="right"
        >
          <template slot-scope="{ row }">

            <el-link
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
      v-if="dialogFormVisible"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="407px"
      append-to-body
      :close-on-click-modal="false"
    >

      <el-upload
        class="upload-demo"
        drag
        :action="baseUrl"
        accept="image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf"
        :on-success="handleAvatarSuccess"
        :on-remove="handleRemove"

        :on-progress="handFilePro"
        :file-list="fileList"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf文件</div>
        <div v-if="erroMessage" slot="tip" class=".el-upload__tip el-form-item__error">
          请上传文件
        </div>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :disabled="loading || imgLoading" @click="updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import { findSematerialPage, deleteSematerialRow, editSematerialRow } from '@/api/mooc/course';
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';

export default {
  components: { Pagination },
  directives: { waves },
  mixins: [settings],
  props: ['courseid'],
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      imgLoading: false,
      loading: false,
      listQuery: {
        materialname: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      fileList: [],

      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '新增'
      },
      baseUrl: '/ovu-zuul/ovu-mooc/api/v1/qiniu/uploadImg',
      erroMessage: false

    };
  },

  created: function() {
    this.getList();
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        materialname: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        courseid: this.courseid
      };
    },
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      this.listQuery.courseid = this.courseid;
      findSematerialPage(this.listQuery).then(response => {
        this.list = response.data.data;

        this.total = response.data.totalCount;

        this.listLoading = false;
      });
    },
    resetTemp() {
      this.imgLoading = false;
      this.fileList = [];
    },
    handleCreate() {
      this.resetTemp();

      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteSematerialRow(row.id).then(response => {
            this.$notify({
              title: 'Success',
              message: '删除成功!',
              type: 'success',
              duration: 2000
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handFilePro() {
      this.imgLoading = true;
    },

    handleAvatarSuccess(res, file) {
      this.imgLoading = false;
      this.fileList.push(file);
      this.erroMessage = false;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },

    async updateData() {
      if (!this.fileList.length) {
        this.erroMessage = true;
        return;
      }
      this.loading = true;
      var arr = [];
      this.fileList.forEach(v => {
        arr.push({ materialname: v.name, materialurl: v.url, courseid: this.courseid });
      });

      try {
        await editSematerialRow(arr).then(res => {
          this.$message.success('提交成功');
          this.dialogFormVisible = false;
          this.getList();
        });
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.dialogFormVisible = false;
      this.resetTemp();
    }

  }
};
</script>
<style lang="scss" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
  margin-bottom: -15px;
  position: relative;
  object-fit: fill;
}

.inline_block {
  display: inline-block;
  vertical-align: middle;
}
/deep/.el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    margin-top: 5px;
    position: relative;
}
</style>
