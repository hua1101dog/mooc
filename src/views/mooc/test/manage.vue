<template>
  <div class="app-container" style="height: calc(100% - 3px) !important;">
    <div class="filter-container">
      <div style="height: 100%;">
        <template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="测评设置" name="set">
              <EditTest />
            </el-tab-pane>
            <el-tab-pane label="考生成绩" name="result">
              <el-card
                name="second"
                class="box-card res"
                style="    margin-bottom: 10px;height: 60px;"
              >
                <el-row :gutter="20">
                  <el-col :span="12" style="border-right: 1px solid #ccc;">
                    <el-col :span="12">
                      <div style="line-height: 60px;">
                        通过率：
                        {{
                          resolveObj.passRate !== null
                            ? resolveObj.passRate
                            : "-"
                        }}
                      </div></el-col>
                    <el-col :span="12">
                      <div style="line-height: 33px;">
                        通过人数：{{
                          resolveObj.passCount !== null
                            ? resolveObj.passCount + "人"
                            : "-"
                        }}
                      </div>
                      <div>
                        考试人数：
                        {{
                          resolveObj.attendCount !== null
                            ? resolveObj.attendCount + "人"
                            : "-"
                        }}
                      </div>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col
                      :span="12"
                    ><div style="line-height: 60px;">
                      平均分：
                      {{
                        resolveObj.avgScore !== null
                          ? resolveObj.avgScore
                          : "-"
                      }}
                    </div></el-col>
                    <el-col
                      :span="12"
                    ><div style="line-height: 33px;">
                       最高分：{{
                         resolveObj.maxScore !== null
                           ? resolveObj.maxScore
                           : "-"
                       }}
                     </div>
                      <div>
                        最低分：{{
                          resolveObj.minScore !== null
                            ? resolveObj.minScore
                            : "-"
                        }}
                      </div>
                    </el-col>
                  </el-col>
                </el-row>
              </el-card>
              <div class="operate-panel_left" style="margin-bottom: 10px;">
                <el-input
                  v-model="listQuery.params"
                  placeholder="学员姓名/工号"
                  class="filter-item"
                  style="width:200px"
                />

                <el-button
                  v-waves
                  type="primary"
                  style="    vertical-align: top;"
                  @click="handleFilter"
                >查询</el-button>
                <el-button
                  v-waves
                  type="default"
                  style="    vertical-align: top;"
                  @click="resetQuery"
                >重置</el-button>
                <el-button
                  v-waves
                  type="default"
                  style="    vertical-align: top;float: right;"
                  @click="downloadFile"
                >导出成绩</el-button>
                <div
                  style="display:inline-block;float:right;line-height: 40px;margin-right: 10px;"
                >
                  <span
                    style="margin-right: 10px;"
                  >是否保留每个人的最高分</span>
                  <el-radio
                    v-model="listQuery.isSaveMaxScore"
                    label="1"
                    @change="handleFilter"
                  >是</el-radio>
                  <el-radio
                    v-model="listQuery.isSaveMaxScore"
                    label="0"
                    @change="handleFilter"
                  >否</el-radio>
                </div>
              </div>
              <div class="panel-body" style="width:100%;height: calc(100% - 190px);">
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

                  <el-table-column
                    label="姓名"
                    prop="personName"
                    align="left"
                  />
                  <el-table-column
                    label="工号"
                    prop="jobCode"
                    align="left"
                    show-overflow-tooltip
                  />
                  <el-table-column label="状态" align="left">
                    <template slot-scope="{ row }">
                      {{
                        row.isAttend == 0
                          ? "未参加"
                          : row.isSubmit == 0
                            ? " 未交卷"
                            : " 已交卷"
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column label="分数" align="left">
                    <template slot-scope="{ row }">
                      {{ row.isAttend == 0 || row.isSubmit == 0 ? " -" : row.totalScore }}
                    </template>
                  </el-table-column>
                  <el-table-column label="排名" prop="range" align="left" />
                  <el-table-column label="考试次数" align="left" prop="num" />
                  <el-table-column label="用时" align="left">
                    <template slot-scope="{ row }">
                      {{ row.time !== null ? row.time + "m" : "-" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="交卷时间"
                    prop="submitTime"
                    align="left"
                    width="200"
                  />

                  <el-table-column
                    label="操作"
                    align="center"
                    width="100px"
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
            </el-tab-pane>
            <el-tab-pane
              v-if="analyseList.length"
              label="答题分析"
              name="Analysis"
            >
              <div
                v-for="(item, i) in analyseList"
                :key="item.id"
                style="margin-bottom: 20px;"
              >
                <label
                  style="margin-bottom: 0;"
                ><span>{{ i + 1 }}.</span><span
                  style="white-space:normal; word-break:break-all;margin: 0 5px;"
                >{{ item.question }}</span><span>[{{ item.type | filterType }}]</span><span
                  style="font-weight:400;margin-left: 15px;"
                >({{ item.paperScore }}分)</span></label>
                <table
                  class="fxTabal table table-striped table-hover"
                  style="margin-top: 10px;"
                >
                  <thead>
                    <tr>
                      <th>{{ item.type == '5'?'关键字':'选项' }}</th>
                      <th style="width:130px">小计</th>
                      <th style="width:200px">比例</th>
                    </tr>

                  </thead>
                  <tbody v-if="item.type != '5'">
                    <tr v-for="(op, i) in item.optionDetail" :key="i">
                      <td v-if="item.type == 1 || item.type == 2">
                        <span
                          :class="{
                            active: item.answerList.indexOf(options[i]) != -1
                          }"
                        >{{ options[i] }} </span><span
                          style="margin-left: 10px;"
                          :class="{
                            active: item.answerList.indexOf(options[i]) != -1
                          }"
                        >{{ op.optionContent }}</span>
                      </td>
                      <td v-if="item.type == 3">
                        <span
                          style="margin-left: 10px;"
                          :class="{
                            active: item.answerList.indexOf(options[i]) != -1
                          }"
                        >{{ i == 0 ? "对" : "错" }}</span>
                      </td>

                      <td>
                        <span
                          :class="{
                            active: item.answerList.indexOf(options[i]) != -1
                          }"
                        >{{ op.count }}</span>
                      </td>
                      <td>
                        <el-progress :percentage="op.countRate" />
                      </td>
                    </tr>

                    <tr>
                      <td>正确率</td>

                      <td>{{ item.correctRate }}</td>
                      <td />
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-for="(op, i) in item.optionDetail" :key="i">
                      <td>{{ op.optionContent }}</td>
                      <td>{{ op.count }}</td>

                      <td>
                        <el-progress :percentage="op.countRate" />
                      </td>
                    </tr>

                    <tr>
                      <td>正确率</td>

                      <td>{{ item.correctRate }}</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <!-- 表格,数据循环list数组 -->
    </div>
    <Uploadform ref="dialogFormVisible" :item="form" />
  </div>
</template>

<script>
import { findResult, getResult, getAnalyse, findPage } from '@/api/mooc/test';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Uploadform from './uploadform';
import EditTest from './addTest';
const base64 = require('js-base64').Base64;
export default {
  components: { Pagination, Uploadform, EditTest },
  directives: { waves },
  filters: {
    filterType(val) {
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
      activeName: 'set',
      ids: '',
      groupList: [],
      courseList: [],
      tableKey: 0,
      list: [],
      test: {},
      total: 0,
      analyseList: [],
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        params: '',
        examineId: '',
        isSaveMaxScore: '0'
      },
      listQueryCopy: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        id: ''
      },
      form: {},
      resolveObj: {
        passRate: null,
        passCount: null,
        maxScore: null,
        attendCount: null,
        avgScore: null,
        minScore: null
      },
      options: []
    };
  },

  mounted: function() {
    this.listQueryCopy.id = this.$route.query.id - 0;
    this.listQuery.id = this.$route.query.id - 0;
    this.test.id = this.$route.query.id - 0;
    this.getList();

    findPage(this.listQueryCopy).then(response => {
      this.test = response.data.data[0];
      this.test.date = [
        new Date(this.test.startTime),
        new Date(this.test.endTime)
      ];
      if (this.test.personIds) {
        this.selectStuList = this.test.personIds.split(',');
      }
      if (this.test.testreport) {
        this.testreport = JSON.parse(this.test.testreport);
      }
      this.$set(this, 'test', response.data.data[0]);
    });

    getAnalyse(this.test.id).then(res => {
      if (res.data) {
        this.analyseList = res.data.subjectDetail || [];
      }
      this.analyseList.length &&
        this.analyseList.forEach(v => {
          v.optionDetail &&
            v.optionDetail.length &&
            v.optionDetail.forEach(op => {
              if (op.countRate) {
                op.countRate = op.countRate.replace(/%/g, '') - 0;
              }
            });
          if (v.type != '5') {
            v.answerList = v.answer.split('$');
          } else {
            v.answerList = v.answer;
            if (v.keyWord) {
              v.keyWordList = JSON.parse(v.keyWord);
            }
          }
        });
    });
    this.options = this.generateCode();
  },
  activated: function() {
    this.listQueryCopy.id = this.$route.query.id - 0;
    this.listQuery.id = this.$route.query.id - 0;
    this.test.id = this.$route.query.id - 0;
    this.getList();

    findPage(this.listQueryCopy).then(response => {
      this.test = response.data.data[0];
      this.test.date = [
        new Date(this.test.startTime),
        new Date(this.test.endTime)
      ];
      if (this.test.personIds) {
        this.selectStuList = this.test.personIds.split(',');
      }
      if (this.test.testreport) {
        this.testreport = JSON.parse(this.test.testreport);
      }
      this.$set(this, 'test', response.data.data[0]);
    });

    getAnalyse(this.test.id).then(res => {
      if (res.data) {
        this.analyseList = res.data.subjectDetail || [];
      }
      this.analyseList.length &&
        this.analyseList.forEach(v => {
          v.optionDetail &&
            v.optionDetail.length &&
            v.optionDetail.forEach(op => {
              if (op.countRate) {
                op.countRate = op.countRate.replace(/%/g, '') - 0;
              }
            });
          if (v.type != '5') {
            v.answerList = v.answer.split('$');
          } else {
            v.answerList = v.answer;
            if (v.keyWord) {
              v.keyWordList = JSON.parse(v.keyWord);
            }
          }
        });
    });

    this.options = this.generateCode();
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        examineId: '',
        isSaveMaxScore: '0',
        params: ''
      };
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      this.listQuery.examineId = this.test.id;
      findResult(this.listQuery).then(response => {
        if (response.data) {
          this.list = response.data.pageResult.data;
          this.total = response.data.pageResult.totalCount;
          this.resolveObj = response.data;
        }
        this.listLoading = false;

        // this.resolve
      });
    },
    // 26个大写字母
    generateCode() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      return str;
    },
    handleClick(tab, event) {
      // if(this.activeName=='set'){
      //   this.$router.push({
      //   path: "/test/addTest",
      //    query: {
      //         test: base64.encode(JSON.stringify(this.test)),
      //           }
      // });
      // }
    },
    downloadFile() {
      window.location.href =
        '/ovu-zuul/ovu-mooc/api/v1/newknowledge/result/export?examineId=' + this.test.id;
    },

    handleDetail(row) {
      // 查询信息

      getResult(row.id).then(res => {
        this.form = res.data;
      });
      this.$nextTick(() => {
        const $el = this.$refs['dialogFormVisible'];
        $el.dialog = true;
      });
    },
    handleTestNum() {},

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

    keepHighest() {
      this.$confirm(
        '此操作根据身份标识[手机]判决答卷归属于哪个学员,并只保留每个学员有效答卷中总分最高的答卷,其他答卷判为无效, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          // 删除
          deleteRow(that.ids).then(response => {
            this.$notify({
              title: 'Success',
              message: '操作成功!',
              type: 'success',
              duration: 2000
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-tabs {
  width: 100%;
  height: 100%;
}
/deep/.el-tabs__content {
 height: calc(100% - 41px);
  overflow: auto;
}
/deep/ .el-tab-pane {
  height: 100%;
}
.fxTabal {
  border-right: 1px solid #e1e6eb !important;
  border-bottom: 1px solid #e1e6eb !important;
}
.fxTabal td,
.fxTabal th {
  border-left: 1px solid #e1e6eb !important ;
  border-top: 1px solid #e1e6eb !important;
}
.active {
  color: #e87b0f;
}
.res {
  /deep/.el-card__body {
    padding: 0;
    height: 60px;
  }
}
</style>
