<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-select
            v-model="listQuery.projectid"
            style="margin-right: 5px;"
            placeholder="请选择-测评项目"
            filterable
            value-key="id"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
          <el-select
            v-model="listQuery.type"
            style="margin-right: 5px;"
            placeholder="请选择-测评类型"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
          <el-input
            v-model="listQuery.text"
            placeholder="测评名称"
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
          <el-button
            type="primary"
            @click="targetAdd"
          >新增</el-button>
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
          <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
          <el-table-column
            label="测评项目"
            prop="project"
            align="left"
          />
          <el-table-column
            label="测评名称"
            prop="text"
            align="left"
            show-overflow-tooltip
          />
          <el-table-column
            label="人数"

            align="left"
          >
            <template slot-scope="{ row }">
              {{ row.type ==1?'不限':row.personList.length }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="left" prop="state">
            <template slot-scope="{ row }">
              {{ row.state }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="left">
            <template slot-scope="{ row }">
              {{ row.type | filterType }}
            </template>
          </el-table-column>
          <el-table-column label="邀请码" prop="invitecode" align="left" />

          <el-table-column label="创建人" prop="creator" align="left" width="180px" show-overflow-tooltip />

          <el-table-column label="创建日期" prop="createTime" align="left" width="180px" />
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
          <el-table-column label="二维码" prop="sort" align="left" width="120px">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.qrcode"
                style="width: 100px; height: 100px"
                :src="row.qrcode"
                :preview-src-list="srcList"
                @click="srcList[0] = row.qrcode"
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
                @click="targetToManage(row)"
              >管理</el-link>
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
import { findPage, changStatu, deleteRow } from '@/api/mooc/test';
import { findList } from '@/api/mooc/project';
import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Utils from '../util.js';

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
      typeList: [
        { label: '公开', value: '1' },
        { label: '私有', value: '2' },
        { label: '邀请', value: '3' }
      ],

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
        text: '',
        type: '',
        projectid: ''
      },
      query: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        type: 1
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
    Utils.$on('getlist', function(msg) {
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
    Utils.$on('getlist', function(msg) {
      that.getList();
    });
  },

  methods: {
    resetQuery() {
      this.listQuery = {
       pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        text: '',
        type: '',
        projectid: ''
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
        this.list.length &&
          this.list.forEach(v => {
            // if (v.isAttend) {
            //   //已参加
            //   v.statusDetail = "已参加";
            //   if (v.isSubmit) {
            //     //已交卷
            //     v.statusDetail = "已交卷";
            //   } else {
            //     //未交卷
            //     v.statusDetail = "未交卷";
            //   }
            // } else {
            //   //未参加
            //   v.statusDetail = "未参加";
            // }
          });
      });
    },
    getPro() {
      findList(this.query).then(response => {
        this.projectList = response.data.data || [];
        var obj = { id: -1, name: '默认项目' };
        this.projectList.unshift(obj);
      });
    },
    resetTemp() {
      this.form = { bannerlogo: '', appview: 1 };
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
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.handleFilter();
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
      var num;

      changStatu({ id: row.id, ispublish: row.ispublish }).then(res => {
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
    targetAdd() {
      this.$router.push({
        path: '/test/addTest'

      });
      if (localStorage.getItem('testInfo')) {
        localStorage.removeItem('testInfo');
      }
      if (localStorage.getItem('id')) {
        localStorage.removeItem('id');
      }
    },
    targetToManage(row) {
      this.$router.push({
        path: '/test/manage',
        query: {
          id: row.id
        }
      });
      if (localStorage.getItem('id')) {
        localStorage.removeItem('id');
      }
      localStorage.setItem('id', row.id);
    }
  }
};
</script>
<style lang="scss" scoped></style>
