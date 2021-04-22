<template>
  <div>
    <div v-loading="loading" class="app-container">
      <el-page-header
        :content="form.id?'编辑测评':'新增测评'"
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
          <div>
            <div class="inline_block">
              <div>

                <el-form-item label="测评项目" class="inline_block" prop="projectObj">
                  <el-select
                    v-model="form.projectObj"
                    style="margin-right: 5px;"
                    placeholder="请选择-测评项目"
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
                <el-form-item label="测评名称" prop="text" class="inline_block">
                  <el-input
                    v-model="form.text"
                    type="text"
                    placeholder="最多可输入32个字符"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="关联课程"

                  class="inline_block"
                >
                  <el-select
                    v-model="form.courseObj"
                    filterable
                    placeholder="选择课程"
                    value-key="id"
                    clearable
                    @change="checkCourse(form.courseObj)"
                    @clear="clearObj"
                  >
                    <el-option
                      v-for="co in list"
                      :key="co.id"
                      :value="co"
                      :label="co.coursename"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="有效期"
                  prop="date"
                  class="inline_block"
                >
                  <el-date-picker
                    v-model="form.date"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @blur="$forceUpdate()"
                  />
                </el-form-item>
                <el-form-item label="测评类型" prop="type">
                  <el-radio
                    v-model="form.type"
                    :label="1"
                    :disabled="type == 1 || type==2"
                    @change="changeType"
                  >公开</el-radio>
                  <el-radio
                    v-model="form.type"
                    :label="2"
                    @change="changeType"
                  >私有</el-radio>
                  <el-radio
                    v-model="form.type"
                    :label="3"
                    :disabled="type == 1"
                    @change="changeType"
                  >邀请</el-radio>
                </el-form-item>
              </div>
              <el-form-item v-if="form.courseid && form.type == 2 && type!=3">
                <el-button
                  type="primary"
                  @click="addStudent()"
                >添加学员</el-button>
              </el-form-item>
            </div>
            <div
              class="inline_block"
              style="vertical-align: top; "
            >
              <el-form-item
                label="封面"
                prop="coverimage"
                class="inline_block"
              >
                <el-upload
                  class="avatar-uploader"
                  :action="baseUrl"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="uploadFileMethodAnswer"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="form.coverimage"
                    :src="processImgUrl(form.coverimage)"
                    class="avatar"
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                  <i
                    v-if="form.coverimage"
                    class="el-icon-close"
                    style="position: absolute;z-index: 8;right: 10px;font-size: 16px;"
                    @click="removeImg($event)"
                  />
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    style="color: red;margin-top:0"
                  >
                    建议尺寸:210px*120px
                  </div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
        </el-card>

        <el-card class="box-card" style="margin:15px 0">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">选择试卷</span>
          </div>
          <div>
            <el-form-item label="选择试卷" prop="paperId">
              <el-select
                v-model="form.paperId"
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
            <el-form-item label="考试次数" prop="count">
              <el-input-number
                v-model.number="form.count"

                :min="0"
                style="width:178px"
                :controls="false"
              />
              <span class="test_tip">0次表示无限制</span>
            </el-form-item>
            <el-form-item label="考试时长" prop="time">
              <el-input-number
                v-model.number="form.time"
                :min="0"
                style="width:178px"
                :controls="false"
              />
              <span class="test_tip">0分钟表示无限制</span>
            </el-form-item>
            <el-form-item label="通过条件" prop="passcondition">
              <el-select v-model="form.passcondition" placeholder="请选择-通过条件">
                <el-option
                  v-for="con in conditions"
                  :key="con.label"
                  :label="con.label"
                  :value="con.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="是否显示答案" prop="isPublic">
              <el-radio v-model="form.isPublic" :label="1">显示</el-radio>
              <el-radio v-model="form.isPublic" :label="0">不显示</el-radio>
            </el-form-item>
          </div>
        </el-card>
        <el-card class="box-card" style="margin:15px 0">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">测评报告</span>
          </div>
          <div>
            <div v-for="(item,i) in testreport" :key="i">
              <label
                class="el-form-item__label"
                style="margin-left:87px"
              >规则{{ i+1 }}</label>
              <label
                class="el-form-item__label"
                style="margin-left:87px"
              >得分</label>

              <el-select v-model="item.rule" placeholder="请选择">
                <el-option
                  v-for="sy in symbol"
                  :key="sy"
                  :label="sy"
                  :value="sy"
                />
              </el-select>
              <el-input
                v-model.number="item.score"
                type="number"
                min="0"
                style="width:178px;margin: 0 10px;"
                placeholder="请输入分值"
              />
              <label
                class="el-form-item__label"
                style="clear:both;float: none;margin-left: 15px;"
              >评论内容</label>
              <el-input
                v-model="item.content"
                style="width: calc(100% - 859px);margin: 0 10px;"
                placeholder="请输入内容"
              />
              <el-button @click="delIrule(item)">-</el-button>
              <el-divider />
            </div>

            <el-button
              type="default"
              size="medium"
              class="addButtom"
              @click="addRule"
            >+新增规则</el-button>
          </div>
        </el-card>
        <el-card class="box-card" style="margin:15px 0">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">其他设置</span>
          </div>
          <div>
            <el-form-item label="测评须知" prop="beforenotice">
              <el-input
                v-model="form.beforenotice"
                placeholder="最多可输入200个字符"
              />
            </el-form-item>
            <el-form-item label="测后说明" prop="afterexplain">
              <el-input
                v-model="form.afterexplain"
                placeholder="最多可输入200个字符"
              />
            </el-form-item>
          </div>
        </el-card>
      </el-form>
      <div class="dialog-footer text-center" style="margin: 15px 0;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updateData()">确定</el-button>
      </div>
    </div>
    <Crop
      ref="dialogCropVisible"
      :img-url="optionImg"
      :auto-crop-height="120"
      :auto-crop-width="210"
      :img-height="imgHeight"
      :img-width="imgWidth"
      :img-file="imgFile"
      @imgUrl="getUrl"
    />
    <Student
      v-if="form.courseid"
      :id="form.courseid"
      ref="dialogStudentVisible"
      :stu-list="stuList"
      @changStu="changStu"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive

import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import { findPage } from '@/api/mooc/course';
import { findPage as findPaper } from '@/api/mooc/paper';
import { findPage as findExam } from '@/api/mooc/test';
import { editRow } from '@/api/mooc/test';
import Crop from '../moocTeacher/crop';
import Student from './setStudent'; // waves directive
import Utils from '../util.js';
import { findList } from '@/api/mooc/project';
const base64 = require('js-base64').Base64;
export default {
  directives: { waves },
  components: { Crop, Student },

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
      list: [],
      total: 0,
      loading: false,
      form: {
        text: '',
        project: '',
        projectid: '',

        course: '',
        courseObj: {},

        startTime: '',
        endTime: '',
        type: 1,
        ids: '',
        count: '',
        time: 0,
        passcondition: 2,
        isPublic: 0,
        testreport: '',
        beforenotice: '',
        afterexplain: '',
        isRestrict: '',
        coverimage: '',
        date: '',
        projectObj: {},
        paperId: ''

      },
      symbol: ['>', '<', '='],
      type: 3,

      queryPaper: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000,
        ispublish: 1
      },
      queryPro: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000,
        type: 1
      },
      query: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000,
        status: 1
      },
      paperList: [],

      baseUrl: '/ovu-base/uploadImg',
      imgWidth: 0, // 图片宽度
      imgHeight: 0, // 图片高度
      optionImg: '',
      imgFile: {},
      stuList: [],
      rules: {
        text: [
          { required: true, message: '测评名称', trigger: 'blur' },
          { max: 32, message: '最多可输入32个字符', trigger: 'blur' }
        ],
        coverimage: [
          { required: true, message: '请上传封面', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择测评类型', trigger: 'change' }
        ],
        // courseObj: [
        //   {
        //     required: true,
        //     message: "请选择关联课程",
        //     trigger: "change"
        //   }
        // ],
        ids: [
          {
            required: true,
            message: '请选择试卷',
            trigger: 'change'
          }
        ],
        time: [
          { required: true, message: '请输入考试时长', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请输入考试次数', trigger: 'blur' }
        ],
        passcondition: [
          { required: true, message: '请选择通过条件', trigger: 'blur' }
        ],
        isPublic: [
          { required: true, message: '请选择是否显示答案', trigger: 'change,blur' }
        ],
        beforenotice: [
          { max: 200, message: '最多可输入200个字符', trigger: 'blur' }
        ],
        afterexplain: [
          { max: 200, message: '最多可输入200个字符', trigger: 'blur' }
        ],
        projectObj: [{ required: true, message: '请选择项目', trigger: 'change,blur' }],
        paperId: [{ required: true, message: '请选择试卷', trigger: 'change' }]
      },
      listLoading: false,
      pickerOptions: {

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

    if (localStorage.getItem('id')) {
      this.listQuery.id = localStorage.getItem('id');
      this.getData();
    } else {
      this.getList();
      this.getPro();
    }
  },
  activated: function() {
    if (this.$route.query.info) {
      this.project = JSON.parse(base64.decode(this.$route.query.info));
    }

    if (localStorage.getItem('id')) {
      this.listQuery.id = localStorage.getItem('id');
      this.getData();
    } else {
      this.getList();
      this.getPro();
    }
  },

  methods: {
    // 课程列表
    getList() {
      var that = this;
      this.query.pageIndex = this.query.currentPage - 1;

      findPage(this.query).then(response => {
        this.list = response.data.data;

        if (this.form.courseid) {
          this.list.length && this.list.forEach(v => {
            if (v.id == this.form.courseid) {
              this.form.courseObj = v;
              this.type = v.type;
              if (this.type == 3) {
                this.selectStuList = [];

                this.stuList = [];
                this.$forceUpdate();
                this.form.personIds = undefined;
              }
            }
          });
        }
      });
      findPaper(this.queryPaper).then(res => {
        this.paperList = res.data.data;
      });
    },

    getPro() {
      findList(this.queryPro).then(response => {
        this.projectList = response.data.data || [];
        var obj = { id: -1, name: '默认项目' };
        this.projectList.unshift(obj);
         
        this.projectList.length  && this.projectList.forEach(v => {
          if ( this.project && this.project.id && v.id == this.project.id) {
            this.form.projectObj = v;
            this.form.project = v.name;
            this.form.projectid = v.id;
          } else if (this.form.projectid && v.id == this.form.projectid) {
            this.form.projectObj = v;
            this.form.project = v.name;
            this.form.projectid = v.id;
          }
        });

        this.$forceUpdate();
      });
    },
    checkCourse(val) {
    
      this.form.courseid = val.id;
      this.form.course = val.coursename;

      this.type = val.type; // 1私有   2半公开课程 3公开
      // 1公开 2 私有  3邀请

      if (this.type == 3) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
      this.form.personIds = undefined;
      this.selectStuList = [];

      this.stuList = [];
      this.$forceUpdate();
    },
    changeType() {
      this.selectStuList = [];

      this.stuList = [];
      this.$forceUpdate();
    },
    clearObj() {
      this.form.courseid = undefined;
      this.form.courseObj = {};
      this.form.course = '';
      this.form.type = 1;
      this.form.personIds = undefined;
      this.selectStuList = [];

      this.stuList = [];
      this.$forceUpdate();
    },
    addStudent() {
      this.$nextTick(() => {
      
        const $el = this.$refs.dialogStudentVisible;
        $el.dialog = true;
      });
    },
    changStu(val, list) {
      this.selectStuList = val;
      this.stuList = list;
    
      this.$forceUpdate();
    },
    chooseProject(val) {
      this.form.project = val.name;
      this.form.projectid = val.id;
      this.$forceUpdate();
    },
    handleAvatarSuccess(res, file) {
      this.form.coverimage = res.urls;
    },
    uploadFileMethodAnswer(file) {
      const isJPG =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        return false;
      }

      this.imgFile = file;

      var img = new Image();
      img.src = URL.createObjectURL(file.raw);
      var $this = this;
      img.onload = function(argument) {
        if (this.width - 0 > 472) {
          // $this.imgWidth = this.width;
          if (this.width <= 1000) {
            $this.imgWidth = this.width;
            $this.imgHeight = this.height;
          } else {
            $this.imgWidth = 1000; // 如果图片宽度大于990 那么容器的宽度为1000 等比缩放
            $this.imgHeight = (1000 / this.width) * this.height;
          }
        } else {
          $this.imgWidth = 472;
          $this.imgHeight = this.height;
        }
        if (this.height - 0 < 258) {
          $this.imgHeight = 258;
        }

        // this.width, this.height 这里就是上传图片的宽和高了
      };

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.optionImg = URL.createObjectURL(file.raw);

        const $el = this.$refs.dialogCropVisible;
        $el.dialog = true;
      });
    },
    getUrl(data) {
      this.form.coverimage = data;
      this.$set(this.form, 'coverimage', data);
      this.$forceUpdate();
    },
    removeImg(eve) {
      eve.stopPropagation();
      this.form.coverimage = '';
      this.$forceUpdate();
    },
    addRule() {
      if (this.testreport.length == 5) {
        this.$message.error('规则不能超过5个！');
        return;
      }
      this.testreport.push({});
    },
    delIrule(item) {
      this.testreport.splice(this.testreport.indexOf(item), 1);
      this.$forceUpdate();
    },
    cancel() {
      if (!this.form.id) {
        this.$router.push('/test/project');
      } else {
        this.getData();
      }
    },

    updateData() {
      if (this.form.courseid && this.form.type == 2 && this.type != 3 && this.selectStuList.length == 0) {
        this.$message.error('请设置学员');
        return;
      }

      if (this.form.type != 2) {
        this.selectStuList = [];
        this.form.personIds = undefined;
      } else if (!this.form.courseid) {
        this.form.personIds = undefined;
      }

      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.count == 0) {
            this.form.isRestrict = 0; // 0不限制次数
          } else {
            this.form.isRestrict = 1; // 1 限制次数
          }

          this.form.startTime = this.moment(new Date(this.form.date[0])).format('YYYY-MM-DD HH:mm:ss');
          this.form.endTime = this.moment(new Date(this.form.date[1])).format('YYYY-MM-DD HH:mm:ss');
          this.form.ispublish = 0; // 是否发布 默认否
          if (this.selectStuList.length) {
            this.form.personIds = this.selectStuList.join(',');
          }

          this.form.testreport = JSON.stringify(this.testreport);

          this.loading = true;
          if (!this.form.id) {
            this.form.ids = this.form.paperId;
          }
          editRow(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              if (!this.form.id) {
                this.$refs['form'].clearValidate();
                this.$refs['form'].resetFields();
                this.$router.push('/test/testList');
                Utils.$emit('getlist');
              } 
            } else {
              this.$message.error(res.msg);
              this.$router.push('/test/testList');
            }
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    getData() {
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;

      findExam(this.listQuery).then(response => {
        this.form = response.data.data[0];

        this.total = response.data.totalCount;

        if (this.form.courseid && this.form.type == 2) {
          this.stuList = this.form.personList || [];
          if (this.form.personIds) {
            this.selectStuList = this.form.personIds.split(',');
          }
        } else {
          this.stuList = [];
        }
        this.stuList.length && this.stuList.forEach(v => {
          v.relationid = v.id;
        });

        this.form.date = [new Date(this.form.startTime), new Date(this.form.endTime)];

        if (this.form.testreport) {
          this.testreport = JSON.parse(this.form.testreport);
        }
        this.getList();
        this.getPro();
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
</style>
