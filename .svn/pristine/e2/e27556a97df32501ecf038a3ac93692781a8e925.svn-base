<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-input
            v-model="listQuery.name"
            placeholder="测评项目名称"
            class="filter-item"
          />
          <el-button v-waves type="primary" @click="handleFilter">查询</el-button>
          <el-button v-waves type="default" @click="resetQuery">重置</el-button>
        </div>
      </div>
      <div class="box-card">
        <span class="addProject" @click="addProject">
          + &nbsp;&nbsp;新增测评项目
        </span>
      </div>
      <div v-for="(item, i) in list" :key="i" class="box-card">
        <div class="card_body" @click="goList(item.id)">
          <h3 style="word-break: break-all;">
            {{ item.name }}
          </h3>
          <div style="word-break: break-all;">
            {{ item.describe }}
          </div>
        </div>
        <div class="card_bottom">
          <el-link
            type="primary"
            :underline="false"
            @click="addTest(item)"
          >新增测评</el-link>
          <el-dropdown v-if="item.id!== -1">
            <el-link
              type="primary"
              :underline="false"
              style="border-left: 1px solid #ccc;width:93px"
            >更多<i class="el-icon-arrow-down el-icon--right" /></el-link>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="editPro(item)"
              >编辑项目</el-dropdown-item>
              <el-dropdown-item
                @click.native="delPro(item)"
              >删除项目</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div />

      <el-dialog
        v-loading="loading"
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        width="40%"
        append-to-body
          :close-on-click-modal="false"
      >
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="项目描述" prop="describe">
            <el-input v-model="form.describe" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateData()">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { findList, editProject, deleteProject } from '@/api/mooc/project';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
const base64 = require('js-base64').Base64;
import settings from '@/mixins/SettingMixin';
export default {
  components: { Pagination },
  directives: { waves },
  mixins: [settings],
  data() {
    return {
      listQuery: {
        name: '',
        type: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '新增'
      },
      form: {},
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' },
          { max: 32, message: '最多可输入32个字符', trigger: 'blur' }
        ],
        describe: [
          { max: 150, message: '最多可输入150个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      list: []
    };
  },

  mounted: function() {
    this.getList();
  },
  activated: function() {
    this.getList();
  },

  methods: {
    resetQuery() {
      this.listQuery = { type: 1,name:null };
    },

    // 项目数据
    getList() {
      this.listLoading = true;
      var $this = this;
      findList($this.listQuery).then(response => {
        $this.list = response.data.data || [];
        var obj = { id: -1, name: '默认项目' };
        $this.list.unshift(obj);
        $this.$set($this, 'list', $this.list);
        $this.listLoading = false;
      
        $this.$forceUpdate();
      });
    },
    resetTemp() {
      this.form = { bannerlogo: '', appview: 1 };
    },
    handleCreate() {
      this.$router.push({ path: '/paper/addPaper' });
    },

    handleUpdate(row) {
      // 查询编辑信息

      this.loading = false;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
      this.form = Object.assign({}, row);

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
          deleteRow(row.id).then(response => {
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
    handleDeleteAll() {
      var that = this;
      this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteRow(that.ids).then(response => {
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
    addProject() {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.form = {};
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    },
    editPro(row) {
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    },
    delPro(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteProject(row.id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.getList();
            } else {
              this.$message.error(res.msg);
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
    addTest(row) {
      if (localStorage.getItem('testInfo')) {
        localStorage.removeItem('testInfo');
      }
      if (localStorage.getItem('id')) {
        localStorage.removeItem('id');
      }
      this.$router.push({
        path: '/test/addTest',
        query: {
          info: base64.encode(JSON.stringify(row))
        }
      });
    },
    goList(id) {
      this.$router.push({
        path: '/test/testList',
        query: {
          id: id
        }
      });
    },
    updateData() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.dialogFormVisible = false;
          this.form.type = 1;
          editProject(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              this.getList();
            } else {
              this.$message.error(res.msg);
            }

            this.loading = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  display: inline-block;
  width: 200px;
  height: 200px;
  border: 1px dashed #aaa;
  margin: 15px 5px;
  vertical-align: top;
}
.addProject {
  cursor: pointer;
  line-height: 200px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  width: 100%;
}
/deep/ .el-card {
  display: inline-block;
}
.filter-container {
  display: inline-block;
}
.card_body {
  height: 159px;
  padding: 20px;
  cursor: pointer;
  overflow: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/

    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/

    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    border-radius: 5px;

    -webkit-box-shadow: inset005pxrgba(0, 0, 0, 0.2);

    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/

    -webkit-box-shadow: inset005pxrgba(0, 0, 0, 0.2);

    border-radius: 0;

    background: rgba(0, 0, 0, 0.1);
  }
}
.card_bottom {
  height: 40px;
  line-height: 36px;
  border-top: 1px solid #ccc;
  text-align: center;

  a {
    cursor: pointer;
    width: 94px;
  }
}
</style>
