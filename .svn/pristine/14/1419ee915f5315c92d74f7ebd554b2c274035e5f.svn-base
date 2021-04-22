<template>
  <div>
    <div v-loading="loading" class="app-container">
      <el-page-header
        :content="form.id ? '编辑考试' : '新增考试'"
        title="返回"
        @back="$router.go(-1)"
      />

      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        style="margin-top:15px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">基本设置</span>
          </div>

          <el-form-item label="考试科目" prop="projectObj">
            <el-select
              v-model="form.projectObj"
              style="margin-right: 5px;width: 350px;"
              placeholder="请选择-考试科目"
              filterable
              value-key="id"
              @change="chooseProject(form.projectObj)"
            >
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :value="item"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考试名称" prop="examObj">
            <el-select
              v-model="form.examObj"
              style=" width: 350px;"
              clearable
              filterable
              allow-create
              default-first-option
              value-key="id"
              placeholder="请选择-考试名称"
              @change="chooseExam(form.examObj)"
            >
              <el-option
                v-for="item in eduList"
                :key="item.id"
                :value="item"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择试卷" prop="paperid">
            <el-select
              v-model="form.paperid"
              style=" width: 350px;"
              placeholder="选择试卷"
              @change="$forceUpdate()"
            >
              <el-option
                v-for="paper in paperList"
                :key="paper.id"
                :value="paper.id"
                :label="paper.text"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考试日期" prop="dateObj">
            <el-date-picker
              v-model="form.dateObj"
              type="date"
              align="right"
              unlink-panels
              style=" width: 350px;"
              :picker-options="pickerdateOptions"
              @blur="setMax(form.date)"
            />
          </el-form-item>
          <el-form-item label="考试时间" prop="timeObj">
            <el-time-picker
              v-model="form.timeObj"
              arrow-control
              is-range
              :editable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @blur="$forceUpdate()"
            />
          </el-form-item>
          <el-form-item label="通过条件" prop="passcondition">
            <el-select
              v-model="form.passcondition"
              placeholder="请选择-通过条件"
              style=" width: 350px;"
            >
              <el-option
                v-for="con in conditions"
                :key="con.label"
                :label="con.label"
                :value="con.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否公开" prop="ispublic">
            <el-radio v-model="form.ispublic" :label="1">是</el-radio>
            <el-radio v-model="form.ispublic" :label="0">否</el-radio>
          </el-form-item>
             <el-form-item
            v-if="form.ispublic == 0"
            label="开放网段"
            prop="openip"
          >
            <el-input
              v-model="form.openip"
              style=" width: 350px;"
              type="text"
              placeholder="多个网段请用逗号分隔"
              oninput="value=value.replace(/[^a-zA-Z0-9&=%#.,，:/]/g,'')"
            />
            <!-- <span
              style="margin-left: 5px;color: #bbb;font-size:13px">可使用公网ip,例如：116.211.5.50;也可使用内网私有ip,例如：172.16.16.148,也可输入网段,例如：192.168.0.x</span> -->
          </el-form-item>
          <el-form-item label="试题乱序" prop="topicscramble">

            <template>

              <el-checkbox v-model="form.topicscramble" @change="$forceUpdate()" />
              <el-tooltip class="item" effect="dark" content="提示：选中该项生成的考试,则该考试每个考生所拿到的试卷题目顺序为乱序，题型顺序不变" placement="top-start">
                <i class="el-icon-question" style="margin-left: 5px;margin-top: -5px;vertical-align: super;" />
              </el-tooltip>
            </template>
          </el-form-item>
       
          <el-form-item label="考试年份" prop="year">
            <el-input
              v-model="form.year"
              placeholder="系统自动生成"
              readonly=""
              style=" width: 350px;"
            />
          </el-form-item>
          <el-form-item label="考试批次" prop="copyTestBatch">
            <el-input
              v-model="form.copyTestBatch"
              placeholder="系统自动生成"
              readonly=""
              style=" width: 350px;"
            />
          </el-form-item>
          <el-form-item label="考试地点" prop="site">
            <el-input
              v-model="form.site"
              style=" width: 350px;"
            />
          </el-form-item>
        </el-card>

        <el-card class="box-card" style="margin:15px 0">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">其他设置</span>
          </div>
          <div>
            <el-form-item label="考试须知" prop="beforenotice">

              <div style="width:500px">
                <editor-bar v-model="form.beforenotice" />
              </div>
            </el-form-item>
            <el-form-item label="考后说明" prop="afterexplain">

              <div style="width:500px">
                <editor-bar v-model="form.afterexplain" />
              </div>
            </el-form-item>
            <el-form-item label="考试注意事项" prop="mattersNeedAttention">

              <div style="width:500px">
                <editor-bar v-model="form.mattersNeedAttention" />
              </div>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
      <div class="dialog-footer text-center" style="margin: 15px 0;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updateData()">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import EditorBar from '@/components/wangEnduit';

import { findPage as findPaper } from '@/api/mooc/paper';
import { editRow, findEduListCopy } from '@/api/mooc/exam';
import { findList as findAll } from '@/api/mooc/exam';
import { findList } from '@/api/mooc/project';
import Utils from '../util.js';

const base64 = require('js-base64').Base64;
export default {
  directives: { waves },
  components: { EditorBar },

  data() {
    return {
      conditions: [
        { value: 1, label: '提交试卷' },
        { value: 2, label: '分数达标' }
      ],
      project: {},
      projectList: [],
      selectStuList: [],
      testreport: [],
      eduList: [],
      list: [],
      total: 0,
      loading: false,
      form: {
        testId: '',
        project: '',
        projectid: '',
        openip: '',
        year: '',
        starttime: '',
        endtime: '',
        ispublic: 1,
        time: 0,
        passcondition: 2,
        testreport: '',
        beforenotice: '',
        afterexplain: '',
        site: '',
        date: '',
        projectObj: null,
        examObj: null,
        name: '',
        paperid: '',
        timeObj: null,
        dateObj: null,
        topicscramble: false,
        topicscramble: 0

      },

      queryPaper: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000,
        ispublish: 1
      },
      queryPro: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000

      },
      query: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000,
        status: 1
      },
      paperList: [],

      rules: {
        examObj: [
          { required: true, message: '请选择考试名称', trigger: 'change,blur' }
        ],
        projectObj: [
          { required: true, message: '请选择考试科目', trigger: 'change,blur' }
        ],
        dateObj: [
          { required: true, message: '请选择考试日期', trigger: 'change' }
        ],
        timeObj: [
          { required: true, message: '请选择考试时间', trigger: 'change' }
        ],
        ispublic: [
          { required: true, message: '请选择是否公开', trigger: 'change' }
        ],
        
        openid: [{ required: true, message: '请输入网段', trigger: 'blur' }],
        site: [{ required: true, message: '请输入考试地点', trigger: 'blur' }],
        passcondition: [
          { required: true, message: '请选择通过条件', trigger: 'blur' }
        ],

        mattersNeedAttention: [
          { required: true, message: '最输入考试注意事项', trigger: 'blur' }
        ],

        paperid: [{ required: true, message: '请选择试卷', trigger: 'change' }]
      },
      listLoading: false,

      pickerdateOptions: {
        disabledDate(time) {
          var preDate = new Date(new Date().getTime() - 86400000); // 前一天
          return time.getTime() < preDate;
        }
      },

      value2: '',
      value3: '',
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        id: ''
      }
    };
  },
  mounted: function() {
    if (this.$route.query.info) {
      this.project = JSON.parse(base64.decode(this.$route.query.info));
    }

    if (localStorage.getItem('examtid')) {
      this.listQuery.id = localStorage.getItem('examtid');
      this.getData();
    } else {
      this.getList();
      this.getPro();
      this.form.examObj = null;
  
    }
  },
  activated: function() {
    if (this.$route.query.info) {
      this.project = JSON.parse(base64.decode(this.$route.query.info));
    }

    if (localStorage.getItem('examtid')) {
      this.listQuery.id = localStorage.getItem('examtid');
      this.getData();
    } else {
      this.getList();
      this.getPro();

      
      this.$forceUpdate();
    }
  },

  methods: {
    // 试卷列表
    getList() {
      var that = this;
      this.query.pageIndex = this.query.currentPage - 1;

      findPaper(this.queryPaper).then(res => {
        this.paperList = res.data.data;
      });
    },

    getPro() {
      var params = this.queryPro;
      params.type = 2;
      findList(params).then(response => {
       
        this.projectList = response.data.data || [];
        var obj = { id: -1, name: '默认科目' };
        this.projectList.unshift(obj);

        this.projectList.length && this.projectList.forEach(v => {
            if (this.project && this.project.id && v.id == this.project.id) {
              this.form.projectObj = v;
              this.form.project = v.name;
              this.form.projectid = v.id;
            } else if (this.form.projectid && v.id == this.form.projectid) {
              this.form.projectObj = v;
              this.form.project = v.name;
              this.form.projectid = v.id;
            }
          });
            if( this.project && this.project.id){
              this.findEdu(this.project.id);
            }
        this.$forceUpdate();
      });
    },
    findEdu(id) {
      findEduListCopy({ projectid: id }).then(response => {
        this.eduList = response.data || [];

        this.eduList.length && this.form.name &&
          this.eduList.forEach(v => {
            if (v.name == this.form.name) {
              this.form.examObj = v;
            }
          });
      });

      this.$forceUpdate();
    },

    chooseProject(val) {
      this.form.project = val.name;
      this.form.projectid = val.id;
      this.form.examObj={}

      this.findEdu(this.form.projectid);
      this.$forceUpdate();
    },
    chooseExam(val) {
      if (val == '' || val == undefined) {
        this.form.name = '';
        this.examObj = {};
      } else {
        if (val && val.id) {
          this.form.name = val.name;
          this.form.testId = val.id;
        } else if (val) {
          this.form.name = val;
        }
      }

      this.$forceUpdate();
    },

    cancel() {
      if (!this.form.id) {
        this.$router.push('/exam/project');
      } else {
        this.getData();
      }
    },

    updateData() {
      this.$refs['form'].validate(valid => {
        var date = this.moment(new Date()).format(
          'YYYY-MM-DD HH:mm:ss'
        );

        if (valid) {
          this.form.starttime = this.moment(new Date(this.form.dateObj)).format(
            'YYYY-MM-DD'
          ) + ' ' + this.moment(new Date(this.form.timeObj[0])).format(
            'HH:mm:ss'
          );
          this.form.endtime = this.moment(new Date(this.form.dateObj)).format(
            'YYYY-MM-DD'
          ) + ' ' + this.moment(new Date(this.form.timeObj[1])).format(
            'HH:mm:ss'
          );

          if (date >= this.form.starttime || date >= this.form.endtime) {
            this.$message.error('考试开始时间和考试结束时间不得小于当前时间');
            return;
          }

          this.form.ispublish = 0; // 是否发布 默认否
          if (this.selectStuList.length) {
            this.form.personIds = this.selectStuList.join(',');
          }

          this.form.testreport = JSON.stringify(this.testreport);

          this.loading = true;
          if (this.form.topicscramble) {
            this.form.topicscrambled = 1;
          } else {
            this.form.topicscrambled = 0;
          }
          editRow(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              if (!this.form.id) {
                this.$refs['form'].clearValidate();
                this.$refs['form'].resetFields();

                Utils.$emit('getExlist');
              }
            } else {
              this.$message.error(res.msg);
            }
            this.loading = false;
            this.$router.push('/exam/examList');
          });
        } else {
          return false;
        }
      });
    },
    setMax(val) {
      this.form.year = this.moment(new Date(this.form.dateObj)).format('YYYY');
      this.$forceUpdate();
    },
    getData() {
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;

      findAll(this.listQuery).then(response => {
        this.form = response.data.data[0];
         this.form.copyTestBatch=  this.form.year+'年第'+this.form.testbatch+'批次'
        this.total = response.data.totalCount;

        if (this.form.starttime && this.form.endtime) {
          this.form.dateObj = new Date(this.form.starttime);
          this.form.timeObj = [
            new Date(this.form.starttime),
            new Date(this.form.endtime)
          ];
        }
        if (this.form.topicscrambled == 1) {
          this.form.topicscramble = true;
        } else {
          this.form.topicscramble = false;
          
        }

        if (this.form.testreport) {
          this.testreport = JSON.parse(this.form.testreport);
        }
        this.getList();
        this.getPro();
        this.findEdu(this.form.projectid);
      });

      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-popper {
  left: 300px !important;
}
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

  padding: 0 15px;
}
.saveGroup {
  cursor: pointer;
  font-size: 20px;
  margin: 5px;
  vertical-align: middle;
}
.inline_block {
  display: inline-block;
}
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
  width: 164px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 164px;
  height: 90px;
  display: inline-block;
  margin-bottom: -15px;
  position: relative;
  object-fit: fill;
}
.test_tip {
  margin-left: 10px;
  color: #aaa;
}
.addButtom {
  width: 200px;

  margin: 0 auto;
  display: inherit;
}
/deep/.tui-editor-defaultUI .te-switch-button {
  width: 100px;
  height: inherit;
  background: #e5e5e5;
  outline: 0;
  color: #a0aabf;
  cursor: pointer;
  border: 0;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
/deep/ .tui-editor-defaultUI .te-mode-switch-section {
  background-color: #f9f9f9;
  border-top: 1px solid #e5e5e5;
  height: 40px;
  font-size: 12px;
}
/deep/ .w-e-toolbar .w-e-menu {
  display: inline-block;
  text-align: center;
  padding: 0px 5px;
  cursor: pointer;
}
/deep/ .w-e-toolbar {
  display: block;

  padding: 0 5px;
}
</style>
