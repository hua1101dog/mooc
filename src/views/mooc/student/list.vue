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
            v-model="listQuery.idcard"
            placeholder="账号"
            class="filter-item"
          />
          <el-input
            v-model="listQuery.phone"
            placeholder="手机号"
            class="filter-item"
          />

          <el-date-picker
            v-model="dateObj"
            style="margin-right: 5px"

            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            :clearable="false"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            @blur="$forceUpdate()"
          />

          <el-select
            v-model="listQuery.projectid"
            class="filter-item"
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
            v-model="examObj"
            class="filter-item"
            style="margin-right: 5px;"

            value-key="examineName"
            placeholder="请选择-考试名称"
            @change="chooseExam(examObj)"
          >
            <el-option
              v-for="(item,i) in eduList"
              :key="i"
              :value="item"
              :label="item.examineName"
            />
          </el-select>
          <el-select
            v-model="testbatchObj"
            class="filter-item"
            style="margin-right: 5px;"
            placeholder="请选择-报考批次"
            value-key="id"
            @change="chooseBatch(testbatchObj)"
          >
            <el-option
              v-for="(item, i) in batchList"
              :key="i"
              :value="item"
              :label="item.showName"
            />
          </el-select>

          <el-button
            v-waves
            type="primary"
            @click="handleFilter"
          >查询</el-button>
          <el-button v-waves type="default" @click="resetQuery">重置</el-button>
        </div>

      </div>
      <div class="operate-panel_right" style="margin-bottom: 5px;">

        <el-button type="primary" class="pull-right" style="margin-left:10px" @click="downloadTicket">导出准考证</el-button>
        <el-button :disabled="!ids" type="primary" class="pull-right" style="margin-left:10px" @click="sendMsg">发送准考证链接</el-button>
        <el-button type="primary" class="pull-right" @click="handleCreate">新增</el-button>
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
          <el-table-column
            label="证件照"
            prop="image"
            min-width="80px"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-image
                v-if="row.image"
                style="width: 33px;height: 51px;"
                :src="processImgUrl(row.image)"
                :preview-src-list="row.image.split(',')"
                fit="contain"
              />
              <img
                v-if="!row.image"
                style="width: 33px;height: 51px;"
                src="@/assets/images/defaultImgCopy.png"
                alt
              >
            </template>
          </el-table-column>
          <el-table-column label="账号" prop="idcard" align="left" width="190px" />
          <el-table-column label="手机号" prop="phone" align="left" width="120px" />
          <el-table-column label="考号" prop="code" align="left" width="220px" />
          <el-table-column label="创建时间" prop="createtime" align="left" width="180px" />
          <el-table-column
            label="报考科目"
            prop="project"
            align="left"
            width="120px"
            show-overflow-tooltip
          />
          <el-table-column
            label="考试名称"
            prop="examine"
            align="left"
            width="120px"
            show-overflow-tooltip
          />
          <el-table-column label="报考批次" prop="testbatch" align="left" width="130px" >
             <template slot-scope="{ row }">
              {{row.year}}年第{{row.testbatch}}批次
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
                @click="pre(row)"
              >预览准考证</el-link>
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
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <div
        v-if="readOnlyStu"
        style="margin-top: -10px;
    margin-bottom: 10px;
    color: red"
      >考试开始时间前30分钟不可修改学员信息</div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="手动导入" name="manual">
          <el-form ref="form" :model="form" label-width="150px" :rules="rules">
            <el-form-item label="账号/身份证号" prop="idcard">
              <el-input v-model="form.idcard" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="考号" prop="code">
              <el-input v-model="form.code" readonly="" :disabled="readOnlyStu" placeholder="系统自动生成" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="报考科目" prop="projectObj">
              <el-select
                v-model="form.projectObj"
                placeholder="请选择-报考科目"
                filterable
                value-key="id"
                :disabled="readOnlyStu"
                @change="chooseProject(form.projectObj, true)"
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
                filterable
                placeholder="请选择-考试名称"
                value-key="examineName"
                :disabled="readOnlyStu"
                @change="chooseExam(form.examObj, true)"
              >
                <el-option
                  v-for="(item,i) in eduListCopy"
                  :key="i"
                  :value="item"
                  :label="item.examineName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="报考地区" prop="region">
              <el-select
                v-model="form.province"
                placeholder="请选择-省"
                filterable
                value-key="id"
                style="width: 100px;"
                :disabled="readOnlyStu"
                @change="findCity(form.province)"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :value="item"
                  :label="item.name"
                /> </el-select><span style="margin:0 10px">省</span>
              <el-select
                v-model="form.city"
                placeholder="请选择-市"
                filterable
                value-key="id"
                style="width: 120px;"
                :disabled="readOnlyStu"
                @change="findRegion(form.city)"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :value="item"
                  :label="item.name"
                /> </el-select><span style="margin:0 10px">市</span>
              <el-select
                v-model="form.region"
                placeholder="请选择-区/县"
                filterable
                value-key="id"
                style="width: 120px;"
                :disabled="readOnlyStu"
                @change="changeRegion(form.region)"
              >
                <el-option
                  v-for="item in regionList"
                  :key="item.id"
                  :value="item"
                  :label="item.name"
                /> </el-select><span style="margin:0 10px">区/县</span>
            </el-form-item>
            <el-form-item label="报考批次" prop="testbatchObj">
              <el-select
                v-model="form.testbatchObj"
                placeholder="请选择-报考批次"
                filterable
                value-key="id"
                :disabled="readOnlyStu"
                @change="chooseBatch(form.testbatchObj,true)"
              >
                <el-option
                  v-for="(item, i) in batchListCopy"
                  :key="i"
                  :value="item"
                  :label="item.showName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-select
                v-model="form.education"
                placeholder="请选择-学历"
                filterable
                value-key="id"
                :disabled="readOnlyStu"
              >
                <el-option
                  v-for="item in educationList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="在读学校/所在企业" prop="unit">
              <el-input v-model="form.unit" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="培训机构" prop="trainagency">
              <el-input v-model="form.trainagency" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="紧急联系人" prop="urgentcontact">
              <el-input v-model="form.urgentcontact" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="紧急联系人电话" prop="urgentcontactphone">
              <el-input v-model="form.urgentcontactphone" :readonly="readOnlyStu" :disabled="readOnlyStu" />
            </el-form-item>
            <el-form-item label="学员照片" prop="image">
              <el-upload
                v-if="!readOnlyStu"
                class="avatar-uploader"
                :action="baseUrl"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="uploadFileMethodAnswer"
                :on-success="handleAvatarSuccess"
              >
                <img
                  v-if="form.image"
                  :src="processImgUrl(form.image)"
                  class="avatar"
                >

                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <i
                  v-if="form.image && form.image!=null"
                  class="el-icon-close"
                  style="position: absolute;z-index: 8;right: 10px;font-size: 16px;"
                  @click="removeImg($event)"
                />
                <div
                  slot="tip"
                  class="el-upload__tip"
                  style="color: #999595;margin-top: 0px;line-height: 17px;"
                >
                  请上传考生本人近期免冠正面半身照，照片要求人像清晰，轮廓分明<br>
                  建议图片尺寸为413px（宽）x626px（高）<br>格式必须为jpg、jpeg、png，且不大于500KB
                </div>
              </el-upload>
              <img
                v-if="readOnlyStu && form.image"
                :src="processImgUrl(form.image)"
                class="avatar"
              >
              <img
                v-if="readOnlyStu && !form.image"
                src="@/assets/images/defaultImgCopy.png"
                class="avatar"
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="批量导入" name="batch">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div v-if="activeName == 'manual'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ !readOnlyStu?'取消':'关闭' }}</el-button>
        <el-button
          v-if="!readOnlyStu"
          type="primary"
          :disabled="loading"
          @click="updateData()"
        >确认</el-button>

      </div>
      <div v-if="activeName !== 'manual'" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadFile">下载模板</el-button>

        <el-upload
          ref="upload"
          style="display: inline-block;margin-left: 10px;"
          class="upload-demo"
          :action="baseUrlImport"
          :on-success="importTemp"
          accept=".xls,.xlsx"
          :show-file-list="false"
        >
          <el-button type="primary">文件导入</el-button>
        </el-upload>
      </div>
    </el-dialog>
    <Crop
      ref="dialogCropVisible"
      :img-url="optionImg"
      :auto-crop-height="626"
      :auto-crop-width="413"
      :img-height="imgHeight"
      :img-width="imgWidth"
      :img-file="imgFile"
      @imgUrl="getUrl"
    />
    <el-dialog
      title="预览准考证"
      :visible.sync="dialogTicketVisible"
      width="700px"
      append-to-body
        :close-on-click-modal="false"
    >
      <Show-ticket :show-print="false" :data="stuObj" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTicketVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findPage,
  editRow,
  deleteRow,
  getRow,
  getCity,
  preview,
  batchSendMsg
} from '@/api/mooc/student';
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
      batchList: [],
      batchListCopy: [],
      tableKey: 0,
      list: [],
      total: 0,
      value: true,
      listLoading: true,
      activeName: 'manual',
      educationList: [
        { id: 1, name: '中专及以下' },
        { id: 2, name: '大专' },
        { id: 3, name: '本科' },
        { id: 4, name: '研究生(硕士)' },
        { id: 5, name: '研究生(博士)' }
      ],
      dateObj: '',
      readOnlyStu: false,
      projectList: [],
      activities: [
        {
          content: '第一步',
          timestamp: '下载Excel考试学员批量导入模版',
          color: '#0bbd87'
        },
        {
          content: '第二步',
          timestamp: '使用模版整理考试学员，点击“上传Excel”完成批量导入'
        }
      ],

      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        name: '',
        idcard: '',
        phone: '',
        projectid: null,
        examine: null,
        examineid: null,
        createStartTime: null,
        createEndTime: null

      },
      dialogTicketVisible: false,

      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '新增'
      },
      form: {
        projectObj: {},
        testbatchObj: {},
        examObj: {},
        province: {},
        city: {},
        region: {},
        citycode: null,
        education: null,
        examine: '',
        examineid: null,
        idcard: '',
        image: '',
        name: '',
        phone: '',
        project: '',
        projectid: null,
        provincecode: null,
        regioncode: null,

        testbatch: null,
        trainagency: '',
        unit: '',

        urgentcontact: '',
        urgentcontactphone: ''
      },
      loading: false,

      rules: {
        idcard: [
          { required: true, message: '请填写账号/身份证号', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
            message: '手机号格式有误',
            trigger: 'blur'
          }
        ],
        urgentcontactphone: [{

          pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
          message: '电话格式有误',
          trigger: 'blur'
        }
        ],
        projectObj: [
          { required: true, message: '请选择报考科目', trigger: 'change,blur' }
        ],
        examObj: [
          { required: true, message: '请选择考试名称', trigger: 'change,blur' }
        ],
        region: [
          { required: true, message: '请选择报考地区', trigger: 'change,blur' }
        ],
        testbatchObj: [
          { required: true, message: '请选择考试批次', trigger: 'change,blur' }
        ],
        education: [
          { required: true, message: '请选择学历', trigger: 'change,blur' }
        ],
        trainagency: [
          { required: true, message: '请输入培训机构', trigger: 'blur' }
        ],

        image: {
          required: true,
          message: '请上传图片',
          trigger: 'change'
        }
      },
      baseUrlImport: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/exportStudent',
      baseUrl: '/ovu-base/uploadImg',
      imgWidth: 0, // 图片宽度
      imgHeight: 0, // 图片高度
      optionImg: '',
      imgFile: {},
      examObj: {},
      testbatchObj: {},
      query: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        type: 2
      },
      eduList: [],
      eduListCopy: [],
      queryPro: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 1000,
        projectid: ''
      },
      provinceList: [],
      cityList: [],
      regionList: [],
      stuObj: {},
      ids: ''
    };
  },

  mounted: function() {
    this.getList();
    this.getPro();
    this.findProvince();
  },
  activated: function() {
    this.getList();
    this.getPro();
    this.findProvince();
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        name: '',
        idcard: '',
        phone: '',
        projectid: null,
        examine: null,
        examineid: null,
        createStartTime: null,
        createEndTime: null

      };
      this.dateObj = '';
      this.examObj = null;
      this.eduList = [];
      this.batchList = [];
      this.testbatchObj = null;
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
        this.listQuery.createStartTime = this.moment(
          new Date(this.dateObj[0])
        ).format('YYYY-MM-DD HH:mm:ss');
        this.listQuery.createEndTime = this.moment(
          new Date(this.dateObj[1])
        ).format('YYYY-MM-DD HH:mm:ss');
      } else {
        // this.listQuery.createStartTime = "";
        // this.listQuery.createEndTime = "";
      }

      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    findEdu(id, flag) {
      findEduList({ projectid: id }).then(response => {
        if (!flag) {
          this.eduList = response.data || [];
        } else {
          this.eduListCopy = response.data || [];
        }
         this.eduList && this.eduList.length &&
          this.eduList.forEach(v => {
            v.testBatch && v.testBatch.length && v.testBatch.forEach(test => {
              test.showName=test.year+'年第'+test.testBatch+'批次'
              if (test.name == this.listQuery.examine) {
                this.examObj = v;
                this.batchList = v.testBatch;
                this.testbatchObj = test;
              }
            });
          });
        this.eduListCopy && this.eduListCopy.length &&
          this.eduListCopy.forEach(v => {
            v.testBatch && v.testBatch.length && v.testBatch.forEach(test => {
             test.showName=test.year+'年第'+test.testBatch+'批次'
              if (test.id == this.form.examineid) {
                this.form.examObj = v;
                this.batchListCopy = v.testBatch;
                this.form.testbatchObj = test;
              }
            });
          });

        this.$forceUpdate();
      });
    },
    chooseProject(val, flag) {
      var id;
      if (!flag) {
        this.examObj = {};
        id = val;
      } else {
        this.form.projectid = val.id;
        this.form.project = val.name;
        this.form.examObj = {};
        id = val.id;
      }

      this.findEdu(id, flag);
      this.$forceUpdate();
    },
    chooseBatch(val, flag) {
      if (!flag) {
        this.examineid = val.id;
        this.listQuery.examineid = val.id;
      } else {
        this.form.examineid = val.id;
        this.form.testbatch = val.testBatch;
      }

      this.$forceUpdate();
    },
    downloadFile() {
      window.location.href = '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/downLoadStudentModel';
    },

    downloadTicket() {
      if (this.list.length === 0) {
        this.$message.error('暂无数据，无法导出');
      } else {
        const url = `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/batchExport`;

        var params = this.listQuery;
        params.url = this.downUrl + window.location.pathname + '#/showTicket';
        if (this.ids) {
          params.ids = this.ids;
        }
        //  delete params.pageIndex
        //      delete params.currentPage
        //          delete params.pageSize
        this.openForm(url, params, 'POST');
      }
    },
    importTemp(e) {
      const _this = this;

      if (e.success) {
        _this.$message({
          type: 'success',
          message: '导入成功！'
        });
        this.dialogFormVisible = false;
        this.handleFilter();
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
        this.dialogFormVisible = false;
        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: str,
          duration: 0
        });
      }
    },
    findProvince() {
      getCity(0).then(res => {
        this.provinceList = res.data;
        this.provinceList.forEach(v => {
          if (v.code == this.form.provincecode) {
            this.form.province = v;
            this.findCity(v);
          }
        });
      });
    },
    findCity(val) {
      this.form.city = null;
      this.form.region = null;
      this.form.provincecode = val.code;
      getCity(val.code).then(res => {
        this.cityList = res.data;
        this.cityList.forEach(v => {
          if (v.code == this.form.citycode) {
            this.form.city = v;

            this.findRegion(v);
          }
        });
      });
      this.$forceUpdate();
    },
    findRegion(val) {
      this.form.region = null;
      this.form.citycode = val.code;
      getCity(val.code).then(res => {
        this.regionList = res.data;
        //
        this.regionList.forEach(v => {
          if (v.code == this.form.regioncode) {
            this.form.region = v;
          }
        });
      });
      this.$forceUpdate();
    },
    changeRegion(val) {
      this.form.regioncode = val.code;
      this.$forceUpdate();
    },
    chooseExam(val, flag) {
      if (!flag) {
        this.listQuery.examine = val.examineName;
        this.examineid = val.id;

        this.batchList = val.testBatch;
      } else {
        this.form.examine = val.examineName;
        this.form.examineid = val.id;

        this.batchListCopy = val.testBatch;
      }

      this.$forceUpdate();
    },
    resetTemp() {
      this.form = { image: '', appview: 1 };
    },
    handleCreate() {
      this.resetTemp();
      this.activeName = 'manual';
      this.dialogStatus = 'create';
      this.readOnlyStu = false;
      this.dialogFormVisible = true;
      this.loading = false;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    },
    sendMsg() {
      var that = this;
      this.$confirm('此操作将批量发送准考证链接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchSendMsg({ ids: that.ids, url: that.downUrl + window.location.pathname + '#/showTicket' }).then(response => {
            if (response.code == 0) {
              that.$notify({
                title: 'Success',
                message: '操作成功!',
                type: 'success',
                duration: 2000
              });
            } else {
              that.$message.error(response.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发送'
          });
        });
    },

    handleUpdate(row) {
      // 查询编辑信息
      this.dialogStatus = 'update';
      this.loading = false;
      this.readOnlyStu = false;
      var that = this;
      that.dialogFormVisible = true;
      that.activeName = 'manual';
      that.$nextTick(() => {
        that.$refs['form'].clearValidate();
      });

      getRow(row.id).then(response => {
        if (response.code == 0) {
          if (response.data && response.data.student) {
            this.$set(this, 'form', response.data.student);
            this.form.provincecode = this.form.provincecode - 0;
            this.form.regioncode = this.form.regioncode - 0;
            this.form.citycode = this.form.citycode - 0;

            this.projectList.length &&
            this.projectList.forEach(v => {
              if (v.id == response.data.student.projectid) {
                this.form.projectObj = v;
                this.form.project = v.name;
                this.form.projectid = v.id;

                this.chooseProject(this.form.projectObj, true);
              }
            });
            if (this.form.provincecode) {
              this.provinceList.forEach(v => {
                if (v.code == this.form.provincecode) {
                  this.form.province = v;
                  this.findCity(this.form.province);
                }
              });
            }
          }
          if (response.data && response.data.examineStartTime) {
            var starttime = response.data.examineStartTime.starttime;

            var starttimePre = new Date(starttime).getTime() - 30 * 60 * 1000; // 考试开始时间的前30分钟

            var now = new Date().getTime(); // 当前时间的时间戳
            if (now > starttimePre) {
              // 如果当前时间在考试前30分钟之后,那么学员信息只可查看
              that.readOnlyStu = true;
            } else {
              that.readOnlyStu = false;
            }
          }
        }
      });
    },
    pre(row) {
      preview(row.id).then(res => {
        this.dialogTicketVisible = true;
        this.stuObj = res.data;
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

    handleAvatarSuccess(res, file) {
      this.form.image = res.urls;
      this.$set(this.form, 'image', res.urls);
    },

    uploadFileMethodAnswer(file) {
      const isJGP = file.raw.type === 'image/jpeg';
      const isPNG = file.raw.type === 'image/png';

      const isPG = isJGP || isPNG; // 限制图片格式为jpg / png

      const size500k = file.size / 1024 < 500;

      if (!isPG) {
        this.$message.error('上传头像图片只能是 JPG 、 PNG 、JPEG格式!');
        return;
      }
      if (!size500k) {
        this.$message.error('上传头像图片大小不能超过 500Kb!');
        return;
      }

      this.imgFile = file;

      var img = new Image();
      img.src = URL.createObjectURL(file.raw);
      var $this = this;
      img.onload = function(argument) {
        if (this.width - 0 > 413) {
          // $this.imgWidth = this.width;
          if (this.width <= 1000) {
            $this.imgWidth = this.width;
            $this.imgHeight = this.height;
          } else {
            $this.imgWidth = 1000; // 如果图片宽度大于413 那么容器的宽度为1000 等比缩放
            $this.imgHeight = (1000 / this.width) * this.height;
          }
        } else {
          $this.imgWidth = 413;
          $this.imgHeight = this.height;
        }
        if (this.height - 0 < 626) {
          $this.imgHeight = 626;
        } else {
        }

        // 这里就是上传图片的宽和高了
      };

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.optionImg = URL.createObjectURL(file.raw);

        const $el = this.$refs.dialogCropVisible;
        $el.dialog = true;
      });
    },
    getUrl(data) {
      this.form.image = data;
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

    removeImg(eve) {
      eve.stopPropagation();
      this.form.image = '';
    },

    updateData() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.dialogFormVisible = false;
          editRow(this.form).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 0) {
              this.$message.success('提交成功');

              this.getList();
            } else {
              this.$message.error(res.msg);
            }
            this.loading = false;
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
.filter-item {
  width: 15%;
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
