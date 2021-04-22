<template>
  <div>
    <el-dialog
      title="设置学员"
      width="60%"
      :visible.sync="dialog"
      append-to-body
      @open="getList"
        :close-on-click-modal="false"
    >
      <div class="operate-panel_left" style="margin-bottom:15px">
        <el-input
          v-model="listQuery.organizationName"
          style="margin-left: 15px;width:200px"
          placeholder="学员姓名"
          class="filter-item"
        />
        <el-button v-waves type="primary" @click="getList">查询</el-button>
        <el-button v-waves type="default" @click="resetQuery">重置</el-button>
      </div>
      <el-table
        :key="tableKey"
        ref="stuTab"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;height: calc(100% - 128px);"
        :default-sort="{ prop: 'relationid', order: 'descending' }"
        :row-key="getRowKey"
        @selection-change="changeFun"
        @select="triggerSelect"
        @select-all="triggerAllSelect"
      >
        <!-- NO列 -->
        <el-table-column type="selection" width="55" :reserve-selection="true" :row-key="getRowKeys" />
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

        <el-table-column label="组织架构" prop="depName" align="left" />
      </el-table>
      <div v-show="total > 0" class="panel-page">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
      <div style="margin-top: 20px">
        已选学员：
        <ul>
          <li v-for="(item, i) in selectList" :key="i" class="item">
            <span class="name">{{ item.organizationName }}</span><span
              class="el-icon-circle-close del"
              @click="deleteItem(selectList, item)"
            />
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>

        <el-button
          v-if="!listLoading"
          type="primary"
          @click="updateData()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findMooSsetraineePage } from '@/api/mooc/course';
import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
export default {
  components: { Pagination },
  directives: { waves },
  props: ['id', 'stuList'],
  data() {
    return {
      list: [],
      dialog: false,

      tableKey: 0,

      total: 0,
      listLoading: true,
      selectList: [],
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 20
      }

    };
  },
  methods: {
    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      this.listQuery.relationtype = 3;
      this.listQuery.courseid = this.id;
      findMooSsetraineePage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;

        if (this.stuList.length) {
          this.selectList = this.stuList;
          var ids = this.stuList.reduce(function(ret, se) {
            ret.push(se.relationid);
            return ret;
          }, []);
          this.list.forEach(v => {
            if (ids && ids.indexOf(v.relationid) !== -1) {
              this.$refs.stuTab.toggleRowSelection(v, true);
            } else {
              this.$refs.stuTab.toggleRowSelection(v, false);
            }
          });
        } else {
          this.$refs.stuTab.clearSelection();// 清空选择
          this.$refs.stuTab.toggleAllSelection(); // 默认全部选中
        }

        var arr1 = [];
        var arrcopy = [];
        this.selectList.forEach(v => {
          if (arr1.indexOf(v.relationid) == -1) {
            arr1.push(v.relationid);
            arrcopy.push(v);
          }
        });
        this.selectList = arrcopy;
      });
    },
    triggerAllSelect(selection) {
      if (selection.length) {
        this.handleSelectionChange(selection);
      } else {
        const currentIds = this.list.map(data => data.id);
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
    setSelection() {
      // 设置table勾选项
      this.$nextTick(() => {
        const selectedIds = this.selectList.map(data => data.id);
        this.list.forEach(row => {
          if (selectedIds.indexOf(row.id) !== -1) {
            this.$refs.stuTab.toggleRowSelection(row, true);
          } else {
            this.$refs.stuTab.toggleRowSelection(row, false);
          }
        });
      });
    },
    changeFun(data) {
      // 过滤重复项
      const selectedIds = this.selectList.map(data => data.id);
      const currentSelected = data.filter(
        data => !selectedIds.includes(data.id)
      );
      this.selectList = this.selectList.concat(currentSelected);
    },
    deleteItem(arr, item) {
      var index = arr.findIndex(v => {
        return v.id == item.id;
      });

      arr.splice(index, 1);
      this.setSelection();
    },

    getRowKeys(row) {
   		return row.id;
    },
    resetQuery() {
      this.listQuery = {
        organizationName: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        courseid: this.courseid
      };
    },

    getRowKey(row) {
      return row.id;
    },

    updateData() {
      // var arr=[]
      if (!this.selectList.length && this.list.length) {
        this.$message.error('请选择学员');
        return;
      }

      var arr =
        this.selectList &&
        this.selectList.length &&
        this.selectList.reduce((ret, n) => {
          ret.push(n.relationid);
          return ret;
        }, []);
      this.$emit('changStu', arr, this.selectList);
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/deep/.el-dialog__body {
  max-height: 600px;
  overflow: auto;
}
.item {
  display: inline-block;
  margin: 5px 15px;
  /* border: 1px solid #ccc; */
  padding: 5px;
  margin-right: 5px;
  .del {
    cursor: pointer;
    margin-left: 5px;
  }
  .name {
  }
}
</style>
