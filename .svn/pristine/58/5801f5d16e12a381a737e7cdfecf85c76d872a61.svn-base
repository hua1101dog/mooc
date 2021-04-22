<template>
  <div>
    <el-dialog
      v-loading="loading"
      title="选择题库"
      width="60%"
      :visible.sync="dialog"
      append-to-body
      destroy-on-close
      :before-close="cancel"
      @open="getData"
        :close-on-click-modal="false"
    >

      <div class="filter-container">
        <div class="operate-panel">
          <div class="operate-panel_left">
            题目知识点分类：

            <Tree :tree-data="data" :width="200" :default-props="defaultProps" :sel-class-tree="selClassTree" @handleNodeClick="handleNodeClick" @changeTree="changeTree" />

            <el-input
              v-model="listQuery.question"
              placeholder="题目名称"
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
              @click="reset"
            >重置</el-button>
          </div>
        </div>
        <div class="operate-panel_left" style="margin: 0px 0px 10px 0;">
          题型
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            style="display: inline-block;margin-left:5px"
            @change="handleCheckAllChange"
          >全选</el-checkbox><el-checkbox-group
            v-model="checkedTypes"
            style="display: inline-block;margin-left:15px"
            @change="handleCheckedTypesChange"
          >
            <el-checkbox
              v-for="type in types"
              :key="type.value"
              :label="type.value"
              :value="type.value"
            >{{ type.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- 表格,数据循环list数组 -->

        <div class="panel-body" style="height:500px">
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :row-key="getRowKey"
            ref="subjectTab"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            height="100%"
            :default-sort="{ prop: 'id', order: 'descending' }"
            @selection-change="handleSelectionChange"
            @select="handleRowClick"
          >
            <!-- NO列 -->
            <el-table-column
              label="NO"
              type="index"
              width="50"
              align="center"
            >
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
            <el-table-column type="selection" width="55" :reserve-selection="true" />
            <el-table-column
              label="分类"
              prop="hierarchyClassificationName"
              align="left"
              show-overflow-tooltip
            />
            <el-table-column label="题型" align="left">
              <template slot-scope="{ row }">
                {{ row.type | filterSubtype }}
              </template>
            </el-table-column>
            <el-table-column
              label="题目"
              prop="question"
              align="left"
              show-overflow-tooltip
            />
            <el-table-column
              label="创建日期"
              prop="createTime"
              align="left"
              width="180"
            />

            <el-table-column
              label="操作"
              align="center"
              width="160px"
              fixed="right"
            >
              <template slot-scope="{ row }">
                <el-link
                  type="primary"
                  :underline="false"
                  style="padding: 0 3px;"
                  @click="handleDetail(row)"
                >查看详情</el-link>
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
        <div class="panel">
          已选题库
          <span style="color:red">
            当前已选中:{{ selectSubList.length }}道题</span>
          <div style="margin-top: 10px;">
            <div
              v-for="item in selectSubList"
              :key="item.id"
              class="subItem"
            >
              {{ item.question }}
              <span
                class="el-icon-circle-close del"
                @click="delSub(item)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-footer text-center" style="margin: 15px 0;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updata">确认</el-button>
      </div>

    </el-dialog>
    <Showloadform
      ref="dialogFormShowVisible"
      :item="form"
      :types="types"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive

import Pagination from '@/components/Pagination'; // secondary package based on el-pagination


import Showloadform from '../subjectManage/showloadform';
import Tree from '../components/tree';

import {
  findPage,
  getTree

} from '@/api/mooc/subject';

export default {
  directives: { waves },
  components: { Pagination, Showloadform, Tree },

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
  props: ['selectList'],
  data() {
    return {
      selClassTree: {},
      form: {},
      paperClassificationName: '',
      paperClassificationId: '',
      selectSubList: [],
      defaultProps: {
        children: 'nodes',
        label: 'text'
      },
      tableKey: 0,
      list: [],
      total: 0,
      loading: false,

      data: [],
      dialog: false,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        question: ''
      },

      listLoading: false,
      checkAll: false,
      checkedTypes: [],
      countList: [0, 0, 0, 0],
      scoreList: [0, 0, 0, 0],

      isIndeterminate: false,
      scoreData: [],
      types: [
        {
          label: '单选题',
          value: 1
        },
        {
          label: '多选题',
          value: 2
        },
        {
          label: '判断题',
          value: 3
        },
        {
          label: '问答题',
          value: 5
        }
      ]

    };
  },

  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;

      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;

        var ids = this.selectSubList && this.selectSubList.length && this.selectSubList.reduce(function(ret, se) {
          ret.push(se.id);
          return ret;
        }, []);

        if (this.selectList.length) {
          this.selectList.forEach(v => {
            if (ids && ids.indexOf(v.id) == -1) {
              this.selectSubList.push(v);
            }
          });
        }

        if (this.selectSubList.length) {
          this.list.length && this.list.forEach(v => {
            if (ids.indexOf(v.id) !== -1) {
              this.$refs.subjectTab.toggleRowSelection(v, true);
            }
          });
        }
      });
    },

    reset() {
      this.selClassTree = {};
      this.checkedTypes = [];
      this.isIndeterminate = false;
      this.checkAll = false;
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        hierarchyClassificationName: '',
        hierarchyClassificationId: ''
      };
    },
    delSub(row) {
      this.$refs.subjectTab.toggleRowSelection(row, false);
      this.selectSubList.splice(this.selectSubList.indexOf(row), 1);
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

      const selectedIds = this.selectSubList.map(data => data.id);
      const currentSelected = val.filter(
        data => !selectedIds.includes(data.id)
      );

      this.selectSubList = this.selectSubList.concat(currentSelected);
      // this.selectSubList=val
    },
    handleRowClick(selection, row) {
      // 如果已经选中的项里面 没有当前项 那么就从 this.selectSubList 里面去splice
      var index = this.selectSubList.findIndex(ret => {
        return ret.id == row.id;
      });
      var ids = '';
      if (selection && selection.length) {
        ids = selection
          .reduce(function(ret, n) {
            ret.push(n.id);
            return ret;
          }, [])
          .join(',');
      }
      if (ids.indexOf(row.id) == -1 && index !== -1) {
        this.selectSubList.splice(index, 1);
      }
    },

    handleCheckedTypesChange(value) {
      this.listQuery.typeList = value.join(',');
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.types.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.types.length;
      this.listQuery.typeList = this.checkedTypes.join(',');
      this.getList();
    },
    handleCheckAllChange(val) {
      if (val) {
        this.checkedTypes = this.types && this.types.length && this.types.reduce(function(ret, n) {
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
    handleNodeClick(node) {
      this.listQuery.hierarchyClassificationName = node.text;
      this.listQuery.hierarchyClassificationId = node.id;
      this.$set(this.listQuery, 'hierarchyClassificationId', node.id);
      this.$set(this.listQuery, 'hierarchyClassificationName', node.text);
    },
    changeTree() {
      this.listQuery.hierarchyClassificationName = undefined;
      this.listQuery.hierarchyClassificationId = undefined;
    },
    handleFilter() {
      this.listQuery.currentPage = 1;
      this.getList();
    },

    handleDetail(row) {
      // 查询编辑信息

      this.form = Object.assign({}, row);

      if (row.type == 2) {
        this.form.answerList = this.form.answer.split('$');
      }
      if (row.type == 5) {
        this.form.keyWordList = JSON.parse(this.form.keyWord);
      }
      this.form.type = this.form.type;
      this.$nextTick(() => {
        const $el = this.$refs['dialogFormShowVisible'];
        $el.dialog = true;
      });
    },

    cancel() {
      this.dialog = false;
    },
    getData() {
      var arr = this.selectList || [];

      this.$set(this, 'selectSubList', arr);

      this.getList();
      getTree().then(response => {
        var obj = { id: -1, nodes: null, parentId: 0, parentName: null, pids: '0', text: '默认分类' };
        this.data = response.data || [];
        this.data.unshift(obj);
      });
    },
    updata() {
      if (this.selectSubList.length == 0) {
        this.$message.error('请选择题目');
        return;
      }

      this.$emit('changSub', this.selectSubList);
      this.dialog = false;
    }
  }

};
</script>
<style lang="scss" scoped>
.el-card-header-title {
  font-size: 16px;
}
.panel {
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 10px;
}
.del {
  cursor: pointer;
}
.subItem {
  display: inline-block;

  margin: 5px 10px;
  padding: 5px;
}
.text-center {
  text-align: center;
}
.input_score {
  margin-right: 15px;
  width: 80px;
}
.inline_block {
  display: inline-block;
}
.group_item {
  margin: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
    padding: 0 10px;
  position: relative;
   i{
    position: absolute;
        right: -5px;
    top: 0;

  }
}
.saveGroup {
  cursor: pointer;
  font-size: 20px;
  margin: 5px;
  vertical-align: middle;
}

/deep/ .el-tag{

        background-color: #fff;

    color: #909399 ;
     .el-tag__close {
    color: #909399 ;
}
  }

.tag_active{
 color:#E87B0F;
    background-color: #fdf2e7;
    .el-tag__close{
 color:#E87B0F;
    background-color: #E87B0F;
}
}

</style>
