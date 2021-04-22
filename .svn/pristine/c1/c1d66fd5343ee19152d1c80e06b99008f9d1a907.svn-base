<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-select
            v-model="listQuery.projectid"
            style="margin-right: 5px;"
            placeholder="请选择-考试科目"
            filterable
            value-key="id"
            @change="chooseProject(listQuery.projectid)"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>

          <el-select
            v-model="listQuery.name"
            style="margin-right: 5px;"
            filterable
            value-key="examineName"
            placeholder="请选择-考试名称"

           
          >
            <el-option
              v-for="(item,i) in eduList"
              :key="i"
              :value="item.examineName"
              :label="item.examineName"
            />
          </el-select>
          <el-button
            v-waves
            type="primary"
            @click="handleFilter"
          >查询</el-button>
          <el-button v-waves type="default" @click="resetQuery">重置</el-button>
        </div>
        <div class="operate-panel_right">
          <el-button type="primary" @click="targetAdd">新增</el-button>
          <el-button
            :disabled="!ids"
            type="primary"
            @click="handleDeleteAll"
          >批量删除</el-button>
          <el-button
            :disabled="!ids"
            type="primary"
            @click="sendMsg(ids)"
          >发送考试通知</el-button>
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
          <el-table-column type="selection" width="55" />
          <el-table-column
            label="考试科目"
            prop="project"
            align="left"
            width="120px"
            show-overflow-tooltip
          />
          <el-table-column
            label="考试名称"
            prop="name"
            align="left"
            width="120px"
            show-overflow-tooltip
          />
          <el-table-column label="开始时间" prop="starttime" align="left" width="180px" />
          <el-table-column label="结束时间" prop="endtime" align="left" width="180px" />

          <el-table-column label="创建人" prop="creator" align="left" width="180px" show-overflow-tooltip />

          <el-table-column label="创建时间" prop="createtime" align="left"width="180px" />
          <el-table-column label="考试年份" prop="year" align="left" width="120px" />
          <el-table-column label="考试批次"  align="left" width="130px" >
              <template slot-scope="{ row }">
              {{row.year}}年第{{row.testbatch}}批次
            </template>
          </el-table-column>
          <el-table-column label="发布" prop="sort" align="left">
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
            width="160px"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-link
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="sendMsg(row.id)"
              >通知</el-link>
              <el-link
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="targetToManage(row)"
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
import {
  findList,

  deleteRow,
  sendMsgAll,
  findEduList,
  changStatu
} from '@/api/mooc/exam';
import { findList as findPro } from '@/api/mooc/project';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Utils from '../util.js';
const base64 = require('js-base64').Base64;
export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    filterType(val) {
      switch (val) {
        case 1:
          return '公开';
        case 2:
          return '私有';
        case 3:
          return '邀请';
      }
    }
  },
  mixins: [settings],
  data() {
    return {
      srcList: ['https://www.baidu.com'],
      ids: '',
      groupList: [],

      courseList: [],
      tableKey: 0,
      list: [],
      projectList: [],
      total: 0,
      value: true,
      listLoading: true,

      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        name: '',
        projectid: ''
      },
      examObj: {},
      query: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        type: 2
      },
      eduList: [],
      queryPro: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        projectid: ''
      }
    };
  },

  mounted: function() {
    var that = this;
    
    if (this.$route.query.id) {
      this.listQuery.projectid = this.$route.query.id - 0;
      this.$forceUpdate();
    }

    this.getList();
    this.getPro();
    Utils.$on('getExlist', function(msg) {
      that.getList();
    });
  },
  activated: function() {
    var that = this;
      
    if (this.$route.query.id) {
      this.listQuery.projectid = this.$route.query.id - 0;
      this.$forceUpdate();
    }

    this.getList();
    this.getPro();
    Utils.$on('getExlist', function(msg) {
      that.getList();
    });
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        projectid:null

      };
      this.examObj = {};
      this.listQuery.name = null;
      this.listQuery.testId = null;
       this.eduList=[]
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      findList(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    getPro() {
      findPro(this.query).then(response => {
        this.projectList = response.data.data || [];
        var obj = { id: -1, name: '默认科目' };
        this.projectList.unshift(obj);
        this.findEdu(this.listQuery.projectid);
      });
    },
    resetTemp() {
      this.form = { bannerlogo: '', appview: 1 };
    },
    sendMsg(id) {
      this.$confirm('此操作将发送通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          sendMsgAll(id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '操作成功!',
                type: 'success',
                duration: 2000
              });
            } else {
              this.$message.error(response.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通知'
          });
        });
    },

    handleDeleteAll() {
      var that = this;
      this.handleDelete(that.ids);
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
              this.handleFilter();
            } else {
              // this.$message.error(response.msg);
              var str = '';
              var res = eval('(' + response.msg + ')');
              if (Array.isArray(res)) {
                str = '<div>';
                res.forEach(v => {
                  str += '<div style="line-height: 20px;">' + v + '</div>';
                });
                str = str + '</div>';
              } else {
                str = response.msg;
              }

              this.$message({
                showClose: true,
                dangerouslyUseHTMLString: true,
                message: str,
                duration: 0
              });
              this.handleFilter();
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
    changePub(row) {
      changStatu({ id: row.id,  isPublish: row.ispublish }).then(res => {
        // changStatu(row.id).then(res => {
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
            row.ispublish = 1;
          } else {
            row.ispublish = 0;
          }
        }
      });
    },
    findEdu(id) {
      findEduList({ projectid: id }).then(response => {
        this.eduList = response.data || [];
      });
    },
    chooseProject(val) {
      this.examObj = {};

      this.findEdu(val);
      this.$forceUpdate();
    },
    chooseExam(val) {
      this.listQuery.name = val.examineName;
     

      this.$forceUpdate();
    },
    targetAdd() {
      this.$router.push({
        path: '/exam/addExam'
      });
      if (localStorage.getItem('examtInfo')) {
        localStorage.removeItem('examtInfo');
      }
      if (localStorage.getItem('examtid')) {
        localStorage.removeItem('examtid');
      }
    },
    targetToManage(row) {
      this.$router.push({
        path: '/exam/manage',
        query: {
          id: row.id
        }
      });
      if (localStorage.getItem('examtid')) {
        localStorage.removeItem('examtid');
      }
      localStorage.setItem('examtid', row.id);
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
