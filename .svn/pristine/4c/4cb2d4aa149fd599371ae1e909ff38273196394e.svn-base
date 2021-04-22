<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-input
            v-model="listQuery.name"
            placeholder="姓名"
            class="filter-item"
          />
          <el-input
            v-model="listQuery.idCard"
            placeholder="账号"
            class="filter-item"
          />

          <el-input
            v-model="listQuery.phone"
            placeholder="手机号"
            class="filter-item"
          />
          <el-select
            v-model="listQuery.projectId"
            placeholder="考试科目"
            filterable
            value-key="id"
            class="filter-item"
            @change="chooseProject(listQuery.projectId)"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
          <el-select
            v-model="listQuery.examine"
            placeholder="考试名称"
            filterable

            class="filter-item"
          >
            <el-option
              v-for="(item,i) in eduList"
              :key="i"
              :value="item.examineName"
              :label="item.examineName"
            />
          </el-select>
          <el-select
            v-model="listQuery.isPass"
            placeholder="是否通过"
            filterable

            class="filter-item"
          >
            <el-option
              v-for="(item,i) in [[1,'是'],[0,'否']]"
              :key="i"
              :value="item[0]"
              :label="item[1]"
            />
          </el-select>
          <el-date-picker
            v-model="dateObj"
            style="width:329px"
            class="filter-item"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            :clearable="false"
            start-placeholder="考试开始日期"
            end-placeholder="考试结束日期"
            @blur="$forceUpdate()"
          />

          <el-button
            v-waves
            type="primary"
            @click="handleFilter"
          >查询</el-button>
          <el-button v-waves type="default" style="margin-right:5px" @click="resetQuery">重置</el-button>
        </div>
        <div class="operate-panel_right">
          <el-button type="primary" @click="downloadFile">批量导出</el-button>
        </div>
      </div>

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
            label="姓名"
            prop="name"
            align="left"
            show-overflow-tooltip
          />

          <el-table-column label="账号" prop="IdCard" align="left" width="180px" />
          <el-table-column label="手机号" prop="phone" align="left" width="120px" />
          <el-table-column label="考号" prop="code" align="left" width="200px" />
          <el-table-column label="交卷时间" prop="submitTime" align="left" width="180px" />
          <el-table-column label="考试科目" prop="project" align="left" width="180px" show-overflow-tooltip />
          <el-table-column label="考试名称" prop="examine" align="left" width="120px" show-overflow-tooltip />
          <el-table-column label="报考批次" align="left" width="130px">

            <template slot-scope="{ row }">
              {{ row.year }}年第{{ row.testBatch }}批次
            </template>
          </el-table-column>
          <el-table-column label="考试年份" prop="year" align="left" width="120px" />
          <el-table-column label="考试分数" prop="totalScore" align="left" width="120px" />
          <el-table-column label="是否通过" align="left" width="120px">

            <template slot-scope="{ row }">
              <span :style="{'color':row.isPass=='是'?'red':''}">{{ row.isPass }}</span>
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
                @click="handleDetail(row)"
              >查看详情</el-link>

              <el-link
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="handleDelete(row)"
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
import { findPage, deleteRow } from '@/api/mooc/answer';
import { findPage as getCourseListNoPage } from '@/api/mooc/course';
import { findEduList } from '@/api/mooc/exam';
import { findList as findPro } from '@/api/mooc/project';
import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Crop from '../moocTeacher/crop';
import ShowTicket from '../components/showTicket';
export default {
  components: { Pagination, Crop, ShowTicket },
  directives: { waves },
  mixins: [settings],
  data() {
    return {
      courseList: [],
      tableKey: 0,
      list: [],
      dateObj: '',
      total: 0,
      value: true,
      listLoading: true,
      activeName: 'manual',
      eduList: [],
      projectList: [],
      query: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        type: 2
      },
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        name: '',
        phone: '',
        idCard: '',
        projectid: null,
        examine: null,
        isPass: null,
        createStartTime: null,
        createEndTime: null

      }

    };
  },

  mounted: function() {
    this.getList();
    this.getPro();
  },
  activated: function() {
    this.getList();
    this.getPro();
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        name: '',
        phone: '',
        projectid: null,
        examine: null,
        isPass: null,
        createStartTime: null,
        createEndTime: null,
        idCard: null
      };
      this.dateObj = '';
      this.eduList = [];
    },
    getPro() {
      findPro(this.query).then(response => {
        this.projectList = response.data.data || [];
        var obj = { id: -1, name: '默认科目' };
        this.projectList.unshift(obj);
        this.findEdu(this.listQuery.projectid);
      });
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      if (this.dateObj) {
        this.listQuery.startTime = this.moment(
          new Date(this.dateObj[0])
        ).format('YYYY-MM-DD HH:mm:ss');
        this.listQuery.endTime = this.moment(
          new Date(this.dateObj[1])
        ).format('YYYY-MM-DD HH:mm:ss');
      } else {
        // this.listQuery.startTime = "";
        // this.listQuery.endTime = "";
      }
      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },

    handleDetail(row) {
      this.$router.push({ path: '/answer/detail', query: {
        id: row.resultId

      }});
    },
    getCourse() {
      getCourseListNoPage({
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000000
      }).then(res => {
        this.courseList = res.data.data || [];
      });
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteRow(row.resultId).then(response => {
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
    findEdu(id) {
      findEduList({ projectid: id }).then(response => {
        this.eduList = response.data || [];
        this.$forceUpdate();
      });
    },
    chooseProject(val) {
      this.examObj = {};
      this.findEdu(val);
      this.$forceUpdate();
    },

    handleSelectionChange(val) {
      if (val && val.length) {
        this.ids = val
          .reduce(function(ret, n) {
            ret.push(n.resultId);
            return ret;
          }, [])
          .join(',');
      } else {
        this.ids = '';
      }
    },
    downloadFile() {
      if (this.list.length === 0) {
        this.$message.error('暂无数据，无法导出');
      } else {
        const url = `/ovu-zuul/ovu-mooc/api/v1/newknowledge/examResult/batchExport`;

        var params = this.listQuery;
        params.url = this.downUrl + window.location.pathname + '#/showTicket';
        if (this.ids) {
          params.ids = this.ids;
        }

        this.openForm(url, params, 'POST');
      }
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
  width: 103px;
  height: 156px;
  line-height: 156px;
  text-align: center;
}
.avatar {
  width: 103px;
  height: 156px;
  display: inline-block;
  margin-bottom: -15px;
  position: relative;
  object-fit: fill;
}
/deep/ .el-timeline {
  margin: 20px;
}
.filter-item{
  width: 15%;
}
</style>
