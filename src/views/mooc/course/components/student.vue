<template>
  <div v-loading="formLoading" style="height: 100%;">
    <div style="height: 100%;">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-form ref="form" label-width="78px">
            <el-form-item label="课程类型" required style="marign-top:4px">
              <el-tooltip class="item" effect="dark" placement="bottom-start">
                <div slot="content">
                  私有课程：上传后可指定所在的多个组织架构以及以下，或者指定组织内可看;<br>
                  半公开课程：上传后可指定所在的多个公司组织根节点以及多个公司;<br>
                  公开课程：全平台可看
                </div>
                <span
                  class="el-icon-question"
                
                />
              </el-tooltip>
              <el-radio-group v-model="typeCopy" required>
                <el-radio
                  :label="1"
                  :disabled="type !== null"
                >私有课程</el-radio>
                <el-radio
                  :label="2"
                  :disabled="type !== null"
                >半公开课程</el-radio>
                <el-radio
                  :label="3"
                  :disabled="type !== null"
                >公开课程</el-radio>
              </el-radio-group>
              <el-input
                v-if="typeCopy !== 3"
                v-model="listQuery.organizationName"
                style="width:120px"
                placeholder="学员姓名"
                class="filter-item"
              />
              <el-button
                v-if="typeCopy !== 3"
                v-waves
                type="primary"
                style="margin-left:5px"
                @click="search"
              >查询</el-button>
              <el-button
                v-if="typeCopy !== 3"
                v-waves
                type="default"
                @click="resetQuery"
              >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="operate-panel_right" style="margin-top:-23px">
          <el-button
            v-if="typeCopy !== 3"
            type="primary"
            @click="handleCreate"
          >新增学员</el-button>
          <el-button
            v-if="typeCopy !== 3"
            type="primary"
            @click="handleImport"
          >导入学员</el-button>
        </div>

      </div>
      <!-- 表格,数据循环list数组 -->
      <el-table
        v-if="typeCopy == 1 || typeCopy == 2"
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
          label="学员姓名"
          prop="organizationName"
          align="left"
          show-overflow-tooltip
        />

        <el-table-column
          label="组织架构"
          prop="depName"
          align="left"
        />

        <!-- <el-table-column
          label="学习人数"
          prop="createtime"
          align="left"
          sortable
          show-overflow-tooltip
          min-width="150px"
        />

        </el-table-column> -->

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
      <div v-show="total > 0 && typeCopy !== 3" class="panel-page">
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
      width="70%"
      append-to-body
        :close-on-click-modal="false"
    >
      <div
        style="    height: 600px;
       overflow-y: auto;
    overflow-x: hidden;"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input
              v-show="typeCopy == 2"
              v-model="companyQuery.companyName"
              style="width: 240px;
               margin-right: 5px;"
              placeholder="公司名称"
              class="filter-item"
            />
            <el-button
              v-show="typeCopy == 2"
              v-waves
              type="primary"
              @click="handFilter"
            >查询</el-button>
            <!-- <el-tree
              v-if="typeCopy == 2"
              :props="props"
              :load="loadNode"
              lazy
              show-checkbox
              @check-change="handleNodeChange"
              ref="tree"
              node-key="id"
              :key="treeKey"
              v-loading="treeLoading1"
              style="    margin-top: 15px;"
            >
            </el-tree> -->
            <el-tree
              v-if="typeCopy == 2"
              ref="tree"
              :key="treeKey"
              v-loading="treeLoading1"
              :props="props"
              :data="companyList"
              highlight-current
              show-checkbox
              node-key="id"
              style="    margin-top: 15px;"
              @check-change="handleNodeChange"
            />

            <div>
              <div v-show="total1 > 0 && typeCopy == 2" class="panel-page">
                <pagination
                  :total="total1"
                  :page.sync="companyQuery.currentPage"
                  :limit.sync="companyQuery.pageSize"
                  @pagination="getCompany"
                />
              </div>
            </div>
            <!-- 私有树 -->
            <el-tree
              v-if="typeCopy == 1"
              ref="tree1"
              v-loading="treeLoading"
              :data="orgTree"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
              @check="handleNodeCheck"
            />
          </el-col>

          <el-col :span="12">
            <el-table
              ref="personTab"
              :data="personList"
              style="width: 100%"
              :row-key="getRowKey"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              @select="triggerSelect"
              @select-all="triggerAllSelect"
            >
              <el-table-column type="selection" width="55" :reserve-selection="true" />
              <el-table-column label="姓名">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <!-- <el-table-column prop="" label="电话" >
                <template slot-scope="{ row }" >
                  <span v-if="typeCopy==2">
                     {{ row.phone | mobileFilter }}
                  </span>
                     <span v-else>
                     {{ row.phone }}
                  </span>
            </template>

              </el-table-column> -->
              <el-table-column prop="phone" label="电话" />
              <el-table-column v-if="typeCopy!==2" prop="jobCode" label="工号" />
              <el-table-column
                v-if="typeCopy!==2"
                prop="email"
                label="邮箱"
                show-overflow-tooltip
              />
            </el-table>
            <div v-show="total2" class="panel-page">
              <pagination
                :total="total2"
                :page.sync="personQuery.currentPage"
                :limit.sync="personQuery.pageSize"
                @pagination="getPerson(selectObj)"
              />
            </div>
            <div style="margin-top: 20px">
              已选学员：
              <ul>
                <li v-for="(item, i) in selectList" :key="i" class="item">
                  <span class="name">{{ item.name }}</span><span
                    class="el-icon-circle-close del"
                    @click="deleteItem(selectList, item)"
                  />
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer text-right">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          :disabled="loading"
          @click="updateData()"
        >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="dialogImportFormVisible"
      title="导入学员"
      :visible.sync="dialogImportFormVisible"
      width="40%"
      append-to-body
        :close-on-click-modal="false"
    >
      <el-form ref="newForm" :model="newForm" label-width="120px" :rules="rules">

        <el-form-item label="关联课程" prop="courseid">
          <el-select
            v-model="newForm.courseid"
            placeholder="请选择-关联课程"
            filterable
            value-key="id"
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :value="item.id"
              :label="item.coursename"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer text-right">
        <el-button @click="dialogImportFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          :disabled="loadingStu"
          @click="importStu"
        >确认</el-button>
      </div>
    </el-dialog>

    <el-button
      type="primary"
      style="margin-top:15px"
      @click="save()"
    >保存</el-button>
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import {
  findMooSsetraineePage,
  deleteSetraineeRow,
  editSetraineelRow,
  findcompanyPage,
  getDeptTree,
  findstaffPage,
  getperonalOrgTree,
  findPage,
  importStudent
} from '@/api/mooc/course';
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    filterRelationtype(val) {
      switch (val) {
        case 1:
          return '企业';
        case 2:
          return '部门';
        case 3:
          return '员工';
        case 4:
          return '群组';
      }
    },
    mobileFilter(val) {
      const reg = /^(.{3}).*(.{4})$/;
      return val.replace(reg, '$1****$2');
    }
  },
  mixins: [settings],
  props: ['courseid', 'type'],
  data() {
    return {
      tableKey: 0,
      list: [],
      courseList: [],
      total: 0,
      total1: 0,
      total2: 0,
      listLoading: true,
      loading: false,
      typeCopy: 3,
      strictly: false,
      selectList: [],
      personList: [],
      selectObj: {},
      props: {
        label: 'deptName',
        children: 'nodes'
        // isLeaf: "leaf"
      },
      defaultProps: {
        label: 'deptName',
        children: 'nodes'
      },

      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        organizationName: ''
      },
      newForm: {
        courseid: null
      },
      loadingStu: false,
      formLoading: false,
      dialogImportFormVisible: false,
      companyQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 20
      },
      personQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 20
      },
      treeKey: '1',
      dialogFormVisible: false,
      form: {},
      dialogStatus: '',
      orgTree: [],
      companyList: [],
      textMap: {
        update: '更新',
        create: '新增'
      },
      treeLoading: false,
      treeLoading1: false,
      rules: {
        courseid: [
          { required: true, message: '请选择课程', trigger: 'blur,change' }

        ]
      }
    };
  },

  created: function() {
    this.getList();

    this.typeCopy = this.type || 3;
  },

  methods: {
    getRowKey(row) {
      return row.id;
    },
    getCourse() {
      findPage({
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000000,
        type: this.typeCopy
      }).then(res => {
        this.courseList = res.data.data || [];
      });
    },
    resetQuery() {
      this.listQuery = {
        organizationName: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        courseid: this.courseid,
        courseType: this.typeCopy
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
      this.listQuery.courseType = this.typeCopy;
      //  this.listQuery.relationtype=3
      findMooSsetraineePage(this.listQuery).then(response => {
        this.list = response.data.data;

        this.total = response.data.totalCount;

        this.listLoading = false;
      });
    },
    handFilter() {
      this.companyQuery.currentPage = 1;
      this.companyQuery.pageSize = 10;
      this.companyQuery.pageIndex = 0;
      this.getCompany();
    },
    // 企业数据
    getCompany() {
      this.companyQuery.pageIndex = this.companyQuery.currentPage - 1;
      findcompanyPage(this.companyQuery).then(response => {
        this.treeLoading1 = false;
        this.companyList = response.data.data;

        this.total1 = response.data.totalCount;
        var idArr = [];
        var ids = '';
        if (this.selectList && this.selectList.length) {
          idArr = this.selectList.reduce(function(ret, n) {
            ret.push(n.id);
            return ret;
          }, []);
        }
        if (idArr) {
          ids = idArr.join(',');
        }

        if (this.companyList && this.companyList.length) {
          this.companyList.forEach(v => {
            v.deptName = v.companyName;
          });
        }
        this.treeKey = +new Date();
        this.$nextTick(() => {
          if (this.companyList && this.companyList.length) {
            this.companyList.forEach(v => {
              v.deptName = v.companyName;

              if (ids && ids.indexOf(v.id) !== -1) {
                this.$refs.tree.setChecked(v.id, true, false); //
              }
            });
          }
        });
      });
    },
    // 员工数据
    getPerson(obj) {
      this.personQuery.pageIndex = this.personQuery.currentPage - 1;

      if (obj.entryDeptId) {
        this.personQuery.entryDeptId = obj.entryDeptId;
      } else if (obj.companyId) {
        this.personQuery.companyId = obj.companyId;
      }

      findstaffPage(this.personQuery).then(response => {
        this.personList = response.data.data;

        this.total2 = response.data.totalCount;
        this.personList &&
          this.personList.length &&
          this.personList.forEach(v => {
            v.relationtype = 3;
          });
        var ids = this.selectList.reduce(function(ret, n) {
          ret.push(n.id);
          return ret;
        }, []).join(',');

        this.personList.forEach(v => {
          if (ids.indexOf(v.id) == -1) {
            this.selectList.push(v);
          }
        });
        //  this.selectList=this.personList
        this.setSelection();
      });
    },

    getAllLeaf(data) {
      const result = [];
      function getLeaf(data) {
        data.length && data.forEach(item => {
          result.push(item);
          if (item.nodes) {
            getLeaf(item.nodes);
          }
        });
      }
      getLeaf(data);
      return result;
    },
    handleNodeCheck(node, data) {
      // 私有
      this.personQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 20
      },
      node.setChecked = !node.setChecked;

      if (node.companyName) {
        // 公司
        this.selectObj = { companyId: node.id };
      } else {
        // 部门
        this.selectObj = { entryDeptId: node.id };
      }
      this.getPerson(this.selectObj);
    },
    handleNodeChange(node, hasCheck, hasNodeCheck) {
      this.personQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 20
      },
      // 半公开
      node.setChecked = !node.setChecked;

      if (node.companyName) {
        // 公司
        this.selectObj = { companyId: node.id };
      } else {
        // 部门
        this.selectObj = { entryDeptId: node.id };
      }
      this.getPerson(this.selectObj);
    },
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
      // 一级节点处理
      if (node.level === 0) {
        resolve(this.companyList);
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去

        this.getIndex(node, resolve);
      }
    },
    getIndex(node, resolve) {
      if (node.level == 1) {
        getDeptTree({ companyId: node.data.id }).then(res => {
          if (res.data.length) {
            node.data.nodes = res.data;
          }
          resolve(res.data);
        });
      }
      if (node.level > 1 && node.data.nodes) {
        resolve(node.data.nodes);
      } else {
        resolve([]);
      }
    },

    resetTemp() {
      this.selectList = [];
      this.personList = [];
    },
    handleCreate() {
      this.resetTemp();

      this.dialogStatus = 'create';

      this.dialogFormVisible = true;
      if (this.typeCopy == 1) {
        this.treeLoading = true;
        getperonalOrgTree().then(res => {
          this.orgTree = [
            {
              companyName: res.data.companyName,
              id: res.data.id,
              deptName: res.data.companyName,
              nodes: res.data.deptList || []
            }
          ];
          this.treeLoading = false;
        });
      } else if (this.typeCopy == 2) {
        this.treeLoading1 = true;
        this.getCompany();
      }
    },
    handleImport() {
      // 导入
      this.getCourse();
      this.newForm = {};
      this.dialogImportFormVisible = true;
      this.loadingStu = false;
    },
    deleteItem(arr, item) {
      var index = arr.findIndex(v => {
        return v.id == item.id;
      });

      arr.splice(index, 1);
      this.setSelection();
      if (this.typeCopy == 2) {
        this.$refs.tree.setChecked(item.id, false, false);
      } else {
        this.$refs.tree1.setChecked(item.id, false, false);
      }
    },

    setSelection() {
      // 设置table勾选项
      this.$nextTick(() => {
        const selectedIds = this.selectList.map(data => data.id);
        this.personList.forEach(row => {
          if (selectedIds.indexOf(row.id) !== -1) {
            this.$refs.personTab.toggleRowSelection(row, true);
          } else {
            this.$refs.personTab.toggleRowSelection(row, false);
          }
        });
      });
    },
    triggerAllSelect(selection) {
      if (selection.length) {
        this.handleSelectionChange(selection);
      } else {
        const currentIds = this.personList.map(data => data.id);
        this.selectList = this.selectList.filter(
          data => !currentIds.includes(data.id)
        );
      }
    },
    triggerSelect(selection, row) {
      // 移除取消的勾选项
      if (!selection.find(data => data.id === row.id)) {
        this.selectList = this.selectList.filter(data => data.id !== row.id);
        this.setSelection();
      }
    },
    handleSelectionChange(data) {
      // 过滤重复项
      const selectedIds = this.selectList.map(data => data.id);
      const currentSelected = data.filter(
        data => !selectedIds.includes(data.id)
      );
      this.selectList = this.selectList.concat(currentSelected);
    },

    handleCurrentChange(data) {
      this.selected = data;
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteSetraineeRow(row.id).then(response => {
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

    updateData() {
      this.loading = true;
      this.dialogFormVisible = false;
      this.save(true);
    },
    save(flag) {
      var arr = [];
      if (flag) {
        this.selectList.length &&
          this.selectList.forEach(v => {
            arr.push({ relationid: v.id, relationtype: v.relationtype });
          });
      }

      if (this.type && this.type !== this.typeCopy) {
        this.$message.error('类型不允许修改！');

        return;
      }

      var param = {
        courseId: this.courseid,
        trainees: arr,
        courseType: this.typeCopy
      };
      this.formLoading = true;

      editSetraineelRow(param).then(res => {
        if (res.code == 0) {
          this.$message.success('提交成功');
          this.search();
          this.loading = false;

          this.$emit('changeType', this.typeCopy);
        } else {
          this.$message.error(res.msg);
        }

        this.formLoading = false;
      });
    },
    importStu() {
      this.$refs['newForm'].validate(valid => {
        if (valid) {
          this.loadingStu = true;
          this.dialogImportFormVisible = false;
          var param = {
            newCourseId: this.courseid,
            oldCourseId: this.newForm.courseid,
            type: this.typeCopy || this.type

          };
          importStudent(param).then(res => {
            if (res.code == 0) {
              this.$message.success('导入成功');

              this.search();
              this.$emit('changeType', this.typeCopy);
            } else {
              this.$message.error(res.msg);
            }

            this.loadingStu = false;
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
  object-fit: unset;
}

.inline_block {
  display: inline-block;
  vertical-align: middle;
}
/deep/ .app-container {
  height: calc(100vh - 450px);
}
.item {
  display: inline-block;
 
  padding: 5px;
  margin-right: 5px;
  .del {
    cursor: pointer;
    margin-left: 5px;
  }
  .name {
  }
}
/deep/.el-tree-node__label {
  font-size: 14px;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  //超出部分以省略号显示: ;
  white-space: nowrap;
}
/deep/ .el-radio{
  margin-right: 20px;
}
</style>
