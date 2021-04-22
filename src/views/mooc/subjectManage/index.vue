<template>
  <div class="app-container">
    <el-row :gutter="20" style="height:100%">
      <el-col :span="6" style="height:100%">
        <div style="line-height: 30px;">
          <div class="inline-block tree_title">知识体系分类</div>
          <el-link
            type="primary"
            :underline="false"
            style="float: right;"
            @click="append"
          >+一级分类</el-link>
          <el-divider />
        </div>
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
        />
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="nodeclick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <!-- 如果是编辑状态 -->
            <template v-if="data.isEdit == 1">
              <el-input
                ref="input"
                v-model="data.text"
                placeholder="最多可输入32位字符"
                @keyup.native.13.stop="() => submitEdit(node, data)"
              />
              <!-- 放弃、提交按钮废弃，改为失去焦点自动提交 -->
              <el-button
                type="text"
                size="mini"
                @click.stop="() => cancelEdit(node, data)"
              >
                <i class="el-icon-refresh-left" />
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => submitEdit(node, data)"
              >
                <i class="el-icon-check" />
              </el-button>
            </template>
            <!-- 如果不是编辑状态 -->
            <span
              v-else
              style="display: inline-block;width: 100%;"
              v-text="data.text"
            />
            <span
              v-if="data.isEdit !== 1 && data.id!== -1"
              style="    width: 70px;margin-right: 20px;"
            >
              <el-button
                type="text"
                size="mini"
                @click.stop="() => edit(node, data)"
              >
                <i class="el-icon-edit" />
              </el-button>
              <el-button
                v-if="data.parentId == 0"
                type="text"
                size="mini"
                @click.stop="() => append(node, data)"
              >
                <i class="el-icon-plus" />
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(node, data)"
              >
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18" style="height:100%">
        <div class="panel-body" style="margin-bottom: 15px;">
          <template>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 5px 0;" />

            <el-checkbox-group
              v-model="checkedTypes"
              @change="handleCheckedTypesChange"
            >
              <el-checkbox
                v-for="type in types"
                :key="type.value"
                :label="type.value"
                :value="type.value"
              >{{ type.label }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
        <div class="operate-panel">
          <div class="operate-panel_left">
            <el-input
              v-model="listQuery.question"
              placeholder="输入题干"
              class="filter-item"
            />
            <el-button
              v-waves
              type="primary"
              @click="handleFilter"
            >查询</el-button>
            <el-button
              v-waves
              type="default"
              @click="resetQuery"
            >重置</el-button>
          </div>
          <div class="operate-panel_right">

            <el-button type="primary" @click="handleCreate">新增</el-button>
            <el-button
              :disabled="!ids"
              type="primary"
              @click="handleMove"
            >移动</el-button>
            <el-button
             :disabled="!ids"
              type="primary"
              @click="handleDeleteAll"
            >批量删除</el-button>
            <el-button
              type="primary"
              @click="downloadFile"
            >下载模板</el-button>
            <el-upload
              ref="upload"
              style="display: inline-block;margin-left: 10px;"
              class="upload-demo"
              :action="baseUrl"
              :on-success="importTemp"
              accept=".xls,.xlsx"
            >
              <el-button type="primary">导入</el-button>
            </el-upload>
          </div>
        </div>
        <!-- 表格,数据循环list数组 -->

        <div class="panel-body" style="  height: calc(100% - 174px);">
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
            <el-table-column type="selection" width="55" />
            <el-table-column
              label="类型"
              prop=""
              align="left"
              show-overflow-tooltip
              width="120"
            >
              <template slot-scope="{ row }">
                {{ row.type | filterSubtype }}
              </template>
            </el-table-column>
            <el-table-column
              label="题干"
              prop="question"
              align="left"
              show-overflow-tooltip
            />
            <el-table-column label="创建日期" prop="createTime" align="left" width="200" />
            <el-table-column
              label="操作"
              align="center"
              width="200px"
              fixed="right"
            >
              <template slot-scope="{ row }">
                <el-link
                  type="primary"
                  :underline="false"
                  style="padding: 0 3px;"
                  @click="handleDetail(row)"
                >查看详情</el-link>
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
      </el-col>
    </el-row>
    <el-dialog
      v-loading="treeLoading"
      class="treeDialog"
      title="移动分类"
      :visible.sync="dialogFormTreeVisible"
      width="40%"
      append-to-body
        :close-on-click-modal="false"
    >
      <el-form label-width="120px">
        <el-form-item label="知识体系分类">
          <div class="pro-sty">
            <el-input
              v-model="hierarchyClassificationName"
              placeholder="请选择-分类"
              clearable
              read-only
              @change="changeTree1"
              @click.native="deptogglePanel1($event, 'classTree1', selClassTree1)"
            />
            <div v-if="showTree1" ref="suoShuMenTree1" class="treeDiv">
              <el-tree
                ref="classTree1"
                class="suoshubumen"
                :data="data"
                :props="defaultProps"
                node-key="id"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick1"
              />
            </div>
          </div>

        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTreeVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="moveData()"
        >确认</el-button>
      </div>
    </el-dialog>
    <Uploadform
      ref="dialogFormVisible"
      :item="form"
      :data="data"
      :types="types"
      :default-props="defaultProps"
      @getList="getList"
    />
    <Showloadform
      ref="dialogFormShowVisible"
      :item="form"
      :types="types"
    />

  </div>
</template>

<script>
import {
  findPage,
  deleteRow,
  getTree,

  editTreeNode,
  removeNode,
  moveSub
} from '@/api/mooc/subject';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Uploadform from './uploadform';
import Showloadform from './showloadform';

const typeOptions = [
  {
    label: '单选题',
    value: '1'
  },
  {
    label: '多选题',
    value: '2'
  },
  {
    label: '判断题',
    value: '3'
  },
  {
    label: '问答题',
    value: '5'
  }
];

export default {
  name: 'SubjectManage',
  components: { Pagination, Uploadform, Showloadform },
  directives: { waves },
  filters: {
    filterSubtype(val) {
      switch (val) {
        case 1:
          return '单选题';
        case 2:
          return '多选题';
        case 3:
          return '判断题';
        case 5:
          return '问答题';
      }
    }
  },
  mixins: [settings],
  data() {
    return {
      baseUrl: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/subject/importSubject',
      data: [],
      ids: '',
      newText: '',
      filterText: '',
      courseList: [],
      defaultProps: {
        children: 'nodes',
        label: 'text'
      },
      dialogFormTreeVisible: false,
      hierarchyClassificationName: '',
      treeLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      value: true,
      listLoading: true,
      selClassTree1: {},
      showTree1: false,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        question: '',
        hierarchyClassificationId: '',
        typeList: null
      },
      checkAll: false,
      checkedTypes: [],
      types: typeOptions,
      isIndeterminate: false,

      form: {}
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  mounted: function() {
 if(this.listQuery.typeList){
       this.checkedTypes =this.listQuery.typeList.split(',')
    }else{
       this.checkedTypes = [];
    }
    this.checkAll =  this.checkedTypes.length === 4;
      this.isIndeterminate =
     this.checkedTypes.length > 0 && this.checkedTypes.length < 4;
  

    
    this.findTree();
  },
  activated: function() {
    if(this.listQuery.typeList){
       this.checkedTypes =this.listQuery.typeList.split(',')
    }else{
       this.checkedTypes = [];
    }
   
  
   this.checkAll =  this.checkedTypes.length === 4;
      this.isIndeterminate =
     this.checkedTypes.length > 0 && this.checkedTypes.length < 4;
    
    this.findTree();
  },

  methods: {
    getBlankTmpl(url, type) {
      var elemIF = document.createElement('iframe');
      elemIF.src = url + '?type=' + type;
      elemIF.style.display = 'none';
      document.body.appendChild(elemIF);
    },
    findTree() {
      getTree().then(response => {
        var obj = { id: -1, nodes: null, parentId: 0, parentName: null, pids: '0', text: '默认分类' };
        this.data = response.data || [];
        this.data.unshift(obj);

        // if( response.data.length){
        //    this.listQuery.hierarchyClassificationId = response.data[0].id;
        // }

        this.getList();
      });
    },
    filterNode(value, data) {
      if (!value) return true;

      return data.text.indexOf(value) !== -1;
    },
    resetQuery() {
      this.checkedTypes = [];
      this.isIndeterminate = false;
      this.checkAll = false;
      this.listQuery = {
        question: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        typeList: ''
      };
    },

    append(node, data) {
      const newChild = {
        isEdit: 1,
        text: '',
        nodes: [],
        parentId: data ? data.parentId : '0'
      };
      if (data) {
        // 编辑
        if (!data.nodes) {
          this.$set(data, 'nodes', []);
        }
        data.nodes.push(newChild);
      } else {
        // 新增
        this.data.push(newChild);
      }

      // 保存
    },

    remove(node, data) {
      if (data.nodes && data.nodes.length) {
        this.$message.error('此节点有下级节点,不能删除！');
        return;
      }
      this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          removeNode(data.id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.findTree();
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

    edit(node, data) {
      this.newText = data.text;
      this.$set(data, 'isEdit', 1);

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    submitEdit(node, data) {
      this.$set(data, 'isEdit', 0);

      var obj = {
        text: data.text
      };

      if (data.id) {
        // 编辑
        obj = {
          text: data.text,
          id: data.id,
          parentId: data.parentId
        };
      } else {
        // 新增
        if (Array.isArray(node.parent.data)) {
          obj.parentId = 0;
        } else {
          obj.parentId = node.parent.data.id;
        }
      }

      this.updateApiGroup(obj, node, data);
    },

    cancelEdit(node, data) {
      if (data.id) {
        // 如果是编辑撤销,那么返回原来的数据
        this.$set(data, 'text', this.newText);
        this.$set(data, 'isEdit', 0);
      } else {
        var arr = [];
        if (node.parent.data.nodes) {
          arr = node.parent.data.nodes;
          // 如果是二级，那么删除当前节点的父节点中的当前节点
        } else {
          // 如果是一级,那么直接删除当前树的当前项
          arr = this.data;
        }
        var index = arr.findIndex(v => {
          return v.$treeNodeId == data.$treeNodeId;
        });
        arr.splice(index, 1);
      }
    },

    updateApiGroup(data, node, d) {
      if (!data.text || data.text == '') {
        this.$message.error('请填写分类名称!');
        this.cancelEdit(node, data);
        return;
      }

      data.text = data.text.substr(0, 32);
      editTreeNode(data).then(response => {
        if (response.code == 0) {
          this.$message.success('提交成功');
          this.findTree();
        } else {
          this.cancelEdit(node, d);
          this.$message.error(response.msg);
        }
      });
    },

    nodeclick(node, data, obj) {
      this.listQuery.hierarchyClassificationId = node.id;

      this.getList();
    },

    // 表格数据
    getList() {
      this.ids = '';
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      
      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    resetTemp() {
      this.form = {
        type: '1',
        answer: 'A',
        answerList: ['A'],
        optionDetail: [
          { optionContent: '', option: 'A' },
          { optionContent: '', option: 'B' },
          { optionContent: '', option: 'C' },
          { optionContent: '', option: 'D' }
        ],
        keyWordList: []
      };
    },
    handleCreate() {
      this.resetTemp();
      this.$nextTick(() => {
        const $el = this.$refs['dialogFormVisible'];
        $el.dialog = true;
      });
    },
    handleCheckAllChange(val) {
      if (val) {
        this.checkedTypes = typeOptions && typeOptions.length && typeOptions.reduce(function(ret, n) {
          ret.push(n.value);
          return ret;
        }, []);
      } else {
        this.checkedTypes = [];
      }

      this.isIndeterminate = false;
      this.listQuery.typeList = this.checkedTypes.join(',');
      this.getList();
    },
    handleCheckedTypesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.types.length;
      this.isIndeterminate =
     checkedCount > 0 && checkedCount < this.types.length;
      this.listQuery.typeList = this.checkedTypes.join(',');
      this.getList();
    },
    handleSelectionChange(val) {
      if (val && val.length) {
        this.ids = val
          .reduce(function(ret, n) {
            ret.push(n.id);
            return ret;
          }, [])
          .join(',');
      } else {
        this.ids = '';
      }
    },
    handleNodeClick1(node) {
      this.hierarchyClassificationName = node.text;
      this.selClassTree1 = {
        id: node.id,
        hierarchyClassificationName: node.text
      };
      this.showTree1 = false;
      this.hierarchyClassificationId = node.id;
      this.$set(this, 'hierarchyClassificationId', node.id);
      this.$set(this, 'hierarchyClassificationName', node.text);
    },
    changeTree1() {
      this.hierarchyClassificationName = undefined;
      this.hierarchyClassificationId = undefined;
    },
    // 点击空白关闭下拉菜单
    deptogglePanel1(event, ref, panel) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      this.showTree1 ? this.dephide1(ref, panel) : this.depshow1(ref, panel);
    },
    depshow1(ref, panel) {
      this.showTree1 = true;
      this.$nextTick(() => {
        this.$refs[ref].setCurrentKey(panel.id);
      });

      document.addEventListener('click', this.dephidePanel1, false);
    },
    dephide1() {
      this.showTree1 = false;
      document.addEventListener('click', this.dephidePanel1, false);
    },

    dephidePanel1(e) {
      if (
        this.$refs.suoShuMenTree1 &&
        !this.$refs.suoShuMenTree1.contains(e.target)
      ) {
        this.dephide1();
      }
    },

    setForm(row) {
      this.form = JSON.parse(JSON.stringify(row)); // 深拷贝

      if (row.type == 2) {
        this.form.answerList = this.form.answer.split('$');

        // 过滤掉重复的选项
        var arr = [];
        this.form.answerList.forEach(v => {
          if (arr.indexOf(v) == -1) {
            if (v.length == 1) {
              arr.push(v);
            }
          }
        });

        this.form.answerList = arr;
      }
      if (row.type == 5) {
        this.form.keyWordList = JSON.parse(this.form.keyWord);
      }
      this.form.type = this.form.type + '';
    },
    handleUpdate(row) {
      // 查询编辑信息

      this.setForm(row);

      this.$nextTick(() => {
        const $el = this.$refs['dialogFormVisible'];
        $el.dialog = true;
      });
    },

    handleDetail(row) {
      // 查询编辑信息

      this.setForm(row);
      this.$nextTick(() => {
        const $el = this.$refs['dialogFormShowVisible'];
        $el.dialog = true;
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
            } else {
              this.$message.error(response.msg);
            }
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
      this.handleDelete(that.ids);
    },
    handleMove() {
      this.dialogFormTreeVisible = true;
      this.hierarchyClassificationId = '';
      this.hierarchyClassificationName = '';
    },

    importTemp(e) {
      const _this = this;

      if (e.success) {
        _this.$message({
          type: 'success',
          message: '导入成功！'
        });
        this.findTree();
      } else {
        var str = '';
        if (Array.isArray(e.error)) {
          str = '<div>';
          e.error.forEach(v => {
            str += '<div style="line-height: 20px;">' + v + '</div>';
          });
          str = str + '</div>';
        } else {
          str = e.error;
        }

        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: str,
          duration: 0
        });
      }
    },
    moveData() {
      if (!this.hierarchyClassificationId) {
        this.$message.error('请选择分类');
        return;
      }
      this.treeLoading = true;
      moveSub({ subjectIds: this.ids, hierarchyId: this.hierarchyClassificationId }).then(response => {
        if (response.code == 0) {
          this.$notify({
            title: 'Success',
            message: '操作成功!',
            type: 'success',
            duration: 2000
          });

          this.getList();
        } else {
          this.$message.error(response.msg);
        }
        this.treeLoading = false;
        this.dialogFormTreeVisible = false;
        this.ids = '';
      });
    },
    downloadFile() {
      window.location.href = '/ovu-zuul/ovu-mooc/api/v1/newknowledge/subject/downloadExcel';
    }
  }
};
</script>
<style lang="scss" scoped>
.inline-block {
  display: inline-block;
}
.el-tree {
  position: relative;
  cursor: default;
  background: #ffffff;
  color: #606266;
  margin-top: 5px;
  height: calc(100% - 107px);
  overflow: auto;
  /deep/ .el-input__inner {
    height: 24px;
    line-height: 24px;
  }
}

/deep/.tree_title {
  line-height: 30px;
  margin-left: 5px;
}
/deep/.el-divider--horizontal {
  margin: 11px 0 16px 0;
}
.pro-sty {
  width: 100%;
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
  /deep/.el-dialog__body{
      height: 300px;
    overflow: auto;
    }
     /deep/.el-upload-list{
       display: none;

    }
  /deep/ .el-button--primary.is-disabled,
 .el-button--primary.is-disabled:hover,
  .el-button--primary.is-disabled:focus,
   .el-button--primary.is-disabled:active{
      color: #FFFFFF !important;
    background-color: #f4bd87 !important;
    border-color: #f4bd87 !important;
}
 
</style>
