<template>
  <div>
    <el-form class="app-container">
      <el-page-header
        :content="(form.id ? '编辑' : '新增') + '试卷'"
        title="返回试卷列表"
        @back="$router.push('/paper/paper/index')"
      />

      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        label-width="120px"
        :rules="rules"
        style="margin-top:15px"
      >
        <el-card class="box-card" style="margin:0 15px">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">试卷信息</span>
          </div>
          <div>
            <el-form-item label="试卷名称" prop="text">
              <el-input
                v-model="form.text"
                style="width: 400px;"
                placeholder="最多可输入32个字符"
              />
            </el-form-item>

            <el-form-item label="试卷分组" required>
              <el-tag
                v-for="g in groupList"
                :key="g.id"
                class="group_item"
                :class="{ tag_active: paperClassificationId == g.id }"
                :closable="g.id !== -1"
                @close="delGroup(g)"
                @click="getGroup(g)"
              >{{ g.text }}</el-tag>

              <div class="inline_block">
                <el-input
                  v-show="showInput"
                  v-model="form.paperClassificationNameCopy"
                  style="width: 160px;"
                  placeholder="请输入分组名称"
                  @keyup.native.13="saveGroup"
                  @input="$forceUpdate()"
                />
              </div>
              <span
                v-show="showInput"
                class="el-icon-check saveGroup"
                @click="saveGroup"
              />
              <span
                v-show="showInput"
                class="el-icon-refresh-left saveGroup"
                @click="uoGroup"
              />
              <el-button
                v-waves
                type="primary"
                style="margin-left: 50px"
                @click="addGroup"
              >+自定义分组</el-button>
            </el-form-item>
            <div
              v-if="erroMessage"
              style="color: #ff4949;
                  font-size: 12px;
                   line-height: 1;
                    margin-left: 120px;
                margin-top: -13px;
                 margin-bottom: 5px;"
            >
              请选择试卷分组
            </div>
            <el-form-item label="试卷描述" prop="description">
              <el-input
                v-model="form.description"
                style="width: 400px;"
                placeholder="最多可输入200个字符"
                type="textarea"
              />
            </el-form-item>
          </div>
        </el-card>

        <el-card class="box-card" style="margin:15px">
          <div slot="header" class="clearfix">
            <span style="color: #ff4949;margin-right: 4px;">*</span>
            <span class="el-card-header-title ">选择题库</span>
            <el-button
              v-waves
              type="primary"
              style="margin-left: 50px"
              @click="addSubject"
            >+添加题库</el-button>
          </div>
          <div v-if="selectSubList.length">
            <span
              style="font-size: 12px;color: red;"
            >*拖拽题目，可进行排序</span>
            <div class="filter-container">
              <div class="panel" style="padding:15px;border:0">
                <el-card v-if="countList[0] > 0" class="box-card ">
                  <div slot="header" class="clearfix">
                    单选题（共{{ countList[0] }}题，合计{{
                      countList[0] * scoreList[0]
                    }}分）
                  </div>
                  <draggable :list="selectSubList" @update="datadragEnd">
                    <div
                      v-for="(item, index) in selectSubList"
                      v-if="item.type == 1"
                      :key="index"
                      style="cursor: move;margin-bottom:15px"
                    >
                      <div class="question_title">
                        <span>Q{{ index + 1 }}.[{{ item.type | filterSubtype }}]
                          {{ item.question }} ({{ item.score }}分)</span>
                        <el-link
                          type="primary"
                          :underline="false"
                          style="padding: 0 3px;vertical-align:top;margin-left:10px"
                          @click="delSub(item)"
                        >删除</el-link>
                      </div>
                      <div v-if="item.type !== 5" style="margin: 10px 0;">
                        <div v-if="item.type !== 3" class="inline_block">
                          选项
                        </div>
                        <div
                          v-if="item.type !== 3"
                          class="inline_block"
                          style="vertical-align: text-top;margin-left: 10px;"
                        >
                          <div
                            v-for="(option, i) in item.optionDetail"
                            :key="i"
                            class="question_option"
                          >
                            {{ options[i] }}.
                            <span class="question_option_content">{{
                              option.optionContent
                            }}</span>
                          </div>
                        </div>
                        <!-- <div
                        class="inline_block"
                        style="vertical-align: text-top;margin-left: 10px;"
                        v-else
                      >
                        <div class="question_option">
                          <span class="question_option_content">正确</span>
                        </div>
                        <div class="question_option">
                          <span class="question_option_content">错误</span>
                        </div>
                      </div> -->
                        <div style="margin: 10px 0;">
                          <div v-if="item.type == 1">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer
                            }}</span>
                          </div>
                          <div v-if="item.type == 2">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answerList.join(",")
                            }}</span>
                          </div>
                          <div v-if="item.type == 3">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer == "A" ? "对" : "错"
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div v-else style="margin: 10px 0;">
                        <div>
                          答案
                          <span style="color:red;margin-left:5px">{{
                            item.answer
                          }}</span>
                        </div>
                        <div
                          v-for="(k, i) in item.keyWordList"
                          :key="i"
                          style="    margin-top: 10px;"
                        >
                          <span>关键词 &nbsp;&nbsp;&nbsp;{{ k.synonym }} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span>权重 &nbsp;&nbsp;&nbsp;{{ k.weight }}%</span>
                        </div>
                      </div>
                      <el-divider />
                    </div>
                    <!-- <p v-for="d in list1" :key="d.id" style="    cursor: move;">{{d.name}}</p> -->
                  </draggable>
                </el-card>
                <el-card v-if="countList[1] > 0" class="box-card mt20">
                  <div slot="header" class="clearfix">
                    多选题（共{{ countList[1] }}题，合计{{
                      countList[1] * scoreList[1]
                    }}分）
                  </div>
                  <draggable :list="selectSubList" @update="datadragEnd">
                    <div
                      v-for="(item, index) in selectSubList"
                      v-if="item.type == 2"
                      :key="index"
                      style="cursor: move;margin-bottom:15px"
                    >
                      <div class="question_title">
                        <span>Q{{ index + 1 - countList[0] }}.[{{ item.type | filterSubtype }}]
                          {{ item.question }} ({{ item.score }}分)</span>
                        <el-link
                          type="primary"
                          :underline="false"
                          style="padding: 0 3px;vertical-align:top;margin-left:10px"
                          @click="delSub(item)"
                        >删除</el-link>
                      </div>
                      <div v-if="item.type !== 5" style="margin: 10px 0;">
                        <div v-if="item.type !== 3" class="inline_block">
                          选项
                        </div>
                        <div
                          v-if="item.type !== 3"
                          class="inline_block"
                          style="vertical-align: text-top;margin-left: 10px;"
                        >
                          <div
                            v-for="(option, i) in item.optionDetail"
                            :key="i"
                            class="question_option"
                          >
                            {{ options[i] }}.
                            <span class="question_option_content">{{
                              option.optionContent
                            }}</span>
                          </div>
                        </div>

                        <div style="margin: 10px 0;">
                          <div v-if="item.type == 1">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer
                            }}</span>
                          </div>
                          <div v-if="item.type == 2">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answerList.join(",")
                            }}</span>
                          </div>
                          <div v-if="item.type == 3">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer == "A" ? "对" : "错"
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div v-else style="margin: 10px 0;">
                        <div>
                          答案
                          <span style="color:red;margin-left:5px">{{
                            item.answer
                          }}</span>
                        </div>
                        <div
                          v-for="(k, i) in item.keyWordList"
                          :key="i"
                          style="    margin-top: 10px;"
                        >
                          <span>关键词 &nbsp;&nbsp;&nbsp;{{ k.synonym }} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span>权重 &nbsp;&nbsp;&nbsp;{{ k.weight }}%</span>
                        </div>
                      </div>
                      <el-divider />
                    </div>
                    <!-- <p v-for="d in list1" :key="d.id" style="    cursor: move;">{{d.name}}</p> -->
                  </draggable>
                </el-card>
                <el-card v-if="countList[2] > 0" class="box-card mt20">
                  <div slot="header" class="clearfix">
                    判断题（共{{ countList[2] }}题，合计{{
                      countList[2] * scoreList[2]
                    }}分）
                  </div>
                  <draggable :list="selectSubList" @update="datadragEnd">
                    <div
                      v-for="(item, index) in selectSubList"
                      v-if="item.type == 3"
                      :key="index"
                      style="cursor: move;margin-bottom:15px"
                    >
                      <div class="question_title">
                        <span>Q{{ index + 1 - countList[0] - countList[1] }}.[{{ item.type | filterSubtype }}]
                          {{ item.question }} ({{ item.score }}分)</span>
                        <el-link
                          type="primary"
                          :underline="false"
                          style="padding: 0 3px;vertical-align:top;margin-left:10px"
                          @click="delSub(item)"
                        >删除</el-link>
                      </div>
                      <div v-if="item.type !== 5" style="margin: 10px 0;">
                        <div v-if="item.type !== 3" class="inline_block">
                          选项
                        </div>
                        <div
                          v-if="item.type !== 3"
                          class="inline_block"
                          style="vertical-align: text-top;margin-left: 10px;"
                        >
                          <div
                            v-for="(option, i) in item.optionDetail"
                            :key="i"
                            class="question_option"
                          >
                            {{ options[i] }}.
                            <span class="question_option_content">{{
                              option.optionContent
                            }}</span>
                          </div>
                        </div>

                        <div style="margin: 10px 0;">
                          <div v-if="item.type == 1">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer
                            }}</span>
                          </div>
                          <div v-if="item.type == 2">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answerList.join(",")
                            }}</span>
                          </div>
                          <div v-if="item.type == 3">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer == "A" ? "对" : "错"
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div v-else style="margin: 10px 0;">
                        <div>
                          答案
                          <span style="color:red;margin-left:5px">{{
                            item.answer
                          }}</span>
                        </div>
                        <div
                          v-for="(k, i) in item.keyWordList"
                          :key="i"
                          style="    margin-top: 10px;"
                        >
                          <span>关键词 &nbsp;&nbsp;&nbsp;{{ k.synonym }} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span>权重 &nbsp;&nbsp;&nbsp;{{ k.weight }}%</span>
                        </div>
                      </div>
                      <el-divider />
                    </div>
                    <!-- <p v-for="d in list1" :key="d.id" style="    cursor: move;">{{d.name}}</p> -->
                  </draggable>
                </el-card>
                <el-card v-if="countList[3] > 0" class="box-card mt20">
                  <div slot="header" class="clearfix">
                    问答题（共{{ countList[3] }}题，合计{{
                      countList[3] * scoreList[3]
                    }}分）
                  </div>
                  <draggable :list="selectSubList" @update="datadragEnd">
                    <div
                      v-for="(item, index) in selectSubList"
                      v-if="item.type == 5"
                      :key="index"
                      style="cursor: move;margin-bottom:15px"
                    >
                      <div class="question_title">
                        <span>Q{{ index + 1 - countList[0] - countList[1]- countList[2] }}.[{{ item.type | filterSubtype }}]
                          {{ item.question }} ({{ item.score }}分)</span>
                        <el-link
                          type="primary"
                          :underline="false"
                          style="padding: 0 3px;vertical-align:top;margin-left:10px"
                          @click="delSub(item)"
                        >删除</el-link>
                      </div>
                      <div v-if="item.type !== 5" style="margin: 10px 0;">
                        <div v-if="item.type !== 3" class="inline_block">
                          选项
                        </div>
                        <div
                          v-if="item.type !== 3"
                          class="inline_block"
                          style="vertical-align: text-top;margin-left: 10px;"
                        >
                          <div
                            v-for="(option, i) in item.optionDetail"
                            :key="i"
                            class="question_option"
                          >
                            {{ options[i] }}.
                            <span class="question_option_content">{{
                              option.optionContent
                            }}</span>
                          </div>
                        </div>

                        <div style="margin: 10px 0;">
                          <div v-if="item.type == 1">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer
                            }}</span>
                          </div>
                          <div v-if="item.type == 2">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answerList.join(",")
                            }}</span>
                          </div>
                          <div v-if="item.type == 3">
                            答案
                            <span style="color:red;margin-left:5px">{{
                              item.answer == "A" ? "对" : "错"
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div v-else style="margin: 10px 0;">
                        <div>
                          答案
                          <span style="color:red;margin-left:5px">{{
                            item.answer
                          }}</span>
                        </div>
                        <div
                          v-for="(k, i) in item.keyWordList"
                          :key="i"
                          style="    margin-top: 10px;"
                        >
                          <span>关键词 &nbsp;&nbsp;&nbsp;{{ k.synonym }} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span>权重 &nbsp;&nbsp;&nbsp;{{ k.weight }}%</span>
                        </div>
                      </div>
                      <el-divider />
                    </div>
                    <!-- <p v-for="d in list1" :key="d.id" style="    cursor: move;">{{d.name}}</p> -->
                  </draggable>
                </el-card>
              </div>
              <div class="panel">
                已选题库
                <span style="color:red">
                  当前已选中:{{ selectSubList.length }}道题</span>
                <div style="margin-top: 10px;">
                  <div v-for="i in selectSubList" :key="i.id" class="subItem">
                    {{ i.question }}
                    <span
                      class="el-icon-circle-close del"
                      @click="delSub(i)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card" style="margin:0 15px">
          <div slot="header" class="clearfix">
            <span class="el-card-header-title">设置分值</span>
          </div>
          <div>
            <table class="table" style="margin-top: 10px;">
              <thead>
                <tr>
                  <th>题目类型</th>
                  <th>单选题</th>
                  <th>多选题</th>
                  <th>判断题</th>
                  <th>问答题</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>数量</td>
                  <td>{{ countList[0] }}个</td>
                  <td>{{ countList[1] }}个</td>
                  <td>{{ countList[2] }}个</td>
                  <td>{{ countList[3] }}个</td>
                </tr>
                <tr>
                  <td>数量分值</td>
                  <td>
                    <el-input-number
                      v-model.number="scoreList[0]"
                      :min="0"
                      class="input_score"
                      :disabled="countList[0] == 0"
                      :controls="false"
                      @input="calculate(scoreList[0], 1)"
                    />分/题
                  </td>
                  <td>
                    <el-input-number
                      v-model.number="scoreList[1]"
                      :min="0"
                      class="input_score"
                      :disabled="countList[1] == 0"
                      :controls="false"
                      @input="calculate(scoreList[1], 2)"
                    />分/题
                  </td>
                  <td>
                    <el-input-number
                      v-model.number="scoreList[2]"
                      :min="0"
                      class="input_score"
                      :disabled="countList[2] == 0"
                      :controls="false"
                      @input="calculate(scoreList[2], 3)"
                    />分/题
                  </td>
                  <td>
                    <el-input-number
                      v-model.number="scoreList[3]"
                      :min="0"
                      class="input_score"
                      :disabled="countList[3] == 0"
                      :controls="false"
                      @input="calculate(scoreList[3], 5)"
                    />分/题
                  </td>
                </tr>
                <tr>
                  <td>统计</td>
                  <td colspan="5">
                    <div style="text-align: right;">
                      卷面总计
                      {{
                        countList[0] * scoreList[0] +
                          countList[1] * scoreList[1] +
                          countList[2] * scoreList[2] +
                          countList[3] * scoreList[3]
                      }}分
                      <span style=" margin-left: 30px;">及格分：</span>
                      <el-input-number
                        v-model.number="form.passGrade"
                        :min="0"
                        class="input_score"
                        :controls="false"
                      />分
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-form>
      <div class="dialog-footer text-center" style="margin: 15px 0;">
        <el-button @click="$router.push('/paper/paper/index')">取消</el-button>
        <el-button type="primary" @click="updata">创建</el-button>
      </div>
    </el-form>
    <addSubform
      ref="dialogAddVisible"
      :select-list="selectSubList"
      @changSub="handleSelectionChange22"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import draggable from 'vuedraggable';

import AddSubform from './addSubform';

import {
  delG,
  saveG,
  findGroup,
  editPaper,
  getPaper
} from '@/api/mooc/paper';
import {  getTree } from '@/api/mooc/subject';
import Utils from '../util.js';

export default {
  directives: { waves },
  components: {  draggable, AddSubform },

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
  data() {
    return {
      options: [],
      groupList: [],

      paperClassificationId: '',

      defaultProps: {
        children: 'nodes',
        label: 'text'
      },
      showInput: false,
      selClassTree: {},
      showTree: false,
      tableKey: 0,
      list: [],
      total: 0,
      loading: false,
      form: {},
      data: [],
      dialog: false,
      erroMessage: false,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        text: ''
      },
      rules: {
        text: [
          { required: true, message: '试卷名称', trigger: 'blur' },
          { max: 32, message: '最多可输入32个字符', trigger: 'blur' }
        ],
        description: [
          { max: 200, message: '最多可输入200个字符', trigger: 'blur' }
        ]
      },
      listLoading: false,
      checkAll: false,
      checkedTypes: [],
      countList: [0, 0, 0, 0],
      scoreList: [0, 0, 0, 0],

      isIndeterminate: true,
      scoreData: [],
      passGrade: 0,
      totalScore: 0,
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
      ],
      selectSubList: []
    };
  },

  mounted: function() {
    if (this.$route.query.id) {
      getPaper(this.$route.query.id).then(res => {
        this.form = res.data;
        this.paperClassificationId = this.form.paperClassificationId;
        this.form.paperClassificationNameCopy = this.form.paperClassificationName;
        this.selectSubList = this.form.subjectDetail;

        this.selectSubList.forEach(v => {
          v.score = v.paperScore;
          if (v.type == 1) {
            this.countList[0] = this.countList[0] + 1;
            this.scoreList[0] = v.score;
          } else if (v.type == 2) {
            this.countList[1] = this.countList[1] + 1;
            this.scoreList[1] = v.score;
            v.answerList = v.answer.split('$');
          } else if (v.type == 3) {
            this.countList[2] = this.countList[2] + 1;
            this.scoreList[2] = v.score;
          } else {
            this.countList[3] = this.countList[3] + 1;
            this.scoreList[3] = v.score;
            v.keyWordList = JSON.parse(v.keyWord);
          }
        });
      });

      this.$route.meta.title = '编辑试卷';
      this.$set(this.$route.meta, 'title', '编辑试卷');
    } else {
      this.form = {};
      this.$route.meta.title = '新增试卷';
      this.$set(this.$route.meta, 'title', '新增试卷');
    }

    getTree().then(response => {
      this.data = response.data;
    });
    this.getGroupList();
    this.options = this.generateCode();
    this.$forceUpdate();
  },
  activated: function() {
    if (this.$route.query.id) {
      getPaper(this.$route.query.id).then(res => {
        this.form = res.data;
        this.paperClassificationId = this.form.paperClassificationId;
        this.form.paperClassificationNameCopy = this.form.paperClassificationName;
        this.selectSubList = this.form.subjectDetail;

        this.selectSubList.forEach(v => {
          v.score = v.paperScore;
          if (v.type == 1) {
            this.countList[0] = this.countList[0] + 1;
            this.scoreList[0] = v.score;
          } else if (v.type == 2) {
            this.countList[1] = this.countList[1] + 1;
            this.scoreList[1] = v.score;
            v.answerList = v.answer.split('$');
          } else if (v.type == 3) {
            this.countList[2] = this.countList[2] + 1;
            this.scoreList[2] = v.score;
          } else {
            this.countList[3] = this.countList[3] + 1;
            this.scoreList[3] = v.score;
            v.keyWordList = JSON.parse(v.keyWord);
          }
        });
      });

      this.$route.meta.title = '编辑试卷';
      this.$set(this.$route.meta, 'title', '编辑试卷');
    } else {
      this.form = {};
      this.$route.meta.title = '新增试卷';
      this.$set(this.$route.meta, 'title', '新增试卷');
    }

    getTree().then(response => {
      this.data = response.data;
    });
    this.getGroupList();
    this.options = this.generateCode();
    this.$forceUpdate();
  },

  methods: {
    // 26个大写字母
    generateCode() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      return str;
    },
    getRowKey(row) {
      return row.id;
    },

    getGroupList(flag) {
      findGroup().then(res => {
        var obj = { id: -1, text: '默认分组' };
        this.groupList = res.data || [];
        this.groupList.unshift(obj);

        if (!this.$route.query.id) {
          this.paperClassificationId = -1;
          this.form.paperClassificationNameCopy = '默认分组';
        }
        if (flag) {
          this.paperClassificationId = this.groupList[
            this.groupList.length - 1
          ].id;
          this.form.paperClassificationNameCopy = this.groupList[
            this.groupList.length - 1
          ].text;
        }
      });
    },

    back() {
      this.$router.push({
        path: '/coursePage/index'
      });
    },
    addSubject() {
      this.$nextTick(() => {
        const $el = this.$refs['dialogAddVisible'];
        $el.dialog = true;
      });
    },
    handleSelectionChange22(val) {
      this.selectSubList = val;

      this.countList[0] = 0;
      this.countList[1] = 0;
      this.countList[2] = 0;
      this.countList[3] = 0;
      this.selectSubList.forEach(v => {
        if (v.type == 1) {
          this.countList[0] = this.countList[0] + 1; // 单选题数量
          v.score = this.scoreList[0] || 0; // 分数
        } else if (v.type == 2) {
          this.countList[1] = this.countList[1] + 1; // 多选题数量
          v.score = this.scoreList[1] || 0; // 分数
          v.answerList = v.answer.split('$');
        } else if (v.type == 3) {
          this.countList[2] = this.countList[2] + 1; // 判断数量
          v.score = this.scoreList[2] || 0; // 分数
        } else {
          this.countList[3] = this.countList[3] + 1; // 问答数量
          v.score = this.scoreList[3] || 0; // 分数
          v.keyWordList = JSON.parse(v.keyWord);
        }
      });

      this.selectSubList = this.selectSubList.sort((a, b) => a.type - b.type);
    },
    datadragEnd(evt) {},
    calculate(val, type) {
      this.selectSubList.forEach(v => {
        if (v.type == type) {
          v.score = val;
        }
      });
      this.$forceUpdate();
    },

    delSub(row) {
      this.selectSubList.splice(this.selectSubList.indexOf(row), 1);
      this.countList[0] = 0;
      this.countList[1] = 0;
      this.countList[2] = 0;
      this.countList[3] = 0;
      this.selectSubList.forEach(v => {
        if (v.type == 1) {
          this.countList[0] = this.countList[0] + 1; // 单选题数量
          v.score = this.scoreList[0] || 0; // 分数
        } else if (v.type == 2) {
          this.countList[1] = this.countList[1] + 1; // 多选题数量
          v.score = this.scoreList[1] || 0; // 分数
          v.answerList = v.answer.split('$');
        } else if (v.type == 3) {
          this.countList[2] = this.countList[2] + 1; // 判断数量
          v.score = this.scoreList[2] || 0; // 分数
        } else {
          this.countList[3] = this.countList[3] + 1; // 问答数量
          v.score = this.scoreList[3] || 0; // 分数
          v.keyWordList = JSON.parse(v.keyWord);
        }
      });
    },

    addGroup() {
      this.form.paperClassificationNameCopy = '';
      this.showInput = true;
      this.paperClassificationId = '';
    },
    delGroup(g) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          delG(g.id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.getGroupList();
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
    getGroup(g) {
      this.form.paperClassificationNameCopy = g.text;
      this.paperClassificationId = g.id;

      if (g.id !== -1) {
        this.showInput = true;
      }
      this.$forceUpdate();
      this.$refs.form.validateField('paperClassificationNameCopy');
    },
    saveGroup() {
      if (!this.form.paperClassificationNameCopy) {
        this.$message.error('请填写分组名称');
        return;
      }
      this.showInput = false;
      var obj = {
        parentId: '0',
        text: this.form.paperClassificationNameCopy,
        id: this.paperClassificationId || ''
      };
      saveG(obj).then(res => {
        if (res.code == 0) {
          this.$message.success('操作成功');
          this.getGroupList(true);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    uoGroup() {
      this.showInput = false;
      this.form.paperClassificationNameCopy = '';
    },
    updata() {
      if (!this.paperClassificationId) {
        this.erroMessage = true;
      } else {
        this.erroMessage = false;
      }

      if (this.selectSubList.length == 0) {
        this.$message.error('请选择题目');
        return;
      }

      if (this.countList[0] !== 0 && this.scoreList[0] == 0) {
        this.$message.error('请设置单选题分数');
        return;
      }
      if (this.countList[1] !== 0 && this.scoreList[1] == 0) {
        this.$message.error('请设置多选题分数');
        return;
      }
      if (this.countList[2] !== 0 && this.scoreList[2] == 0) {
        this.$message.error('请设置判断题分数');
        return;
      }
      if (this.countList[3] !== 0 && this.scoreList[3] == 0) {
        this.$message.error('请设置问答题分数');
        return;
      }
      if (!this.form.passGrade) {
        this.$message.error('请输入及格分');
        return;
      }
      this.form.totalGrade =
        this.countList[0] * this.scoreList[0] +
        this.countList[1] * this.scoreList[1] +
        this.countList[2] * this.scoreList[2] +
        this.countList[3] * this.scoreList[3];

      if (this.form.totalGrade == 0) {
        this.$message.error('总分不得等于0');
        return;
      }
      if (this.form.passGrade > this.form.totalGrade) {
        this.$message.error('及格分不得大于总分');
        return;
      }

      this.$refs['form'].validate(valid => {
        if (valid && !this.erroMessage) {
          this.form.paperClassificationId = this.paperClassificationId;
          this.form.type = 1; // 组卷方式 1手动 2自动
          this.form.isPublish = 0; // 是否发布 0 否 1是
          this.form.count =
            this.countList &&
            this.countList.length &&
            this.countList.reduce(function(sum, number) {
              return sum + number;
            }, 0); // 题目总数
          var list =
            this.selectSubList &&
            this.selectSubList.length &&
            this.selectSubList.reduce(function(ret, se) {
              ret.push(se.score);
              return ret;
            }, []);
          this.form.score = list.join(','); // 每道题的分数,逗号隔开
          this.form.questionList = [];
          this.selectSubList.forEach(v => {
            if (v.type == 1) {
              v.score = this.scoreList[0];
            } else if (v.type == 2) {
              v.score = this.scoreList[1];
            } else if (v.type == 3) {
              v.score = this.scoreList[2];
            } else {
              v.score = this.scoreList[3];
            }
            this.form.questionList.push({ id: v.id, score: v.score });
          });
          this.loading = true;
          editPaper(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              this.$router.push('/paper/paper/index');
              Utils.$emit('getlist');
            } else {
              this.$message.error(res.msg);
              this.$router.push('/paper/paper/index');
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
  i {
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

/deep/ .el-tag {
  background-color: #fff;

  color: #909399;
  .el-tag__close {
    color: #909399;
  }
}

.tag_active {
  color: #e87b0f;
  background-color: #fdf2e7;
  .el-tag__close {
    color: #e87b0f;
    background-color: #e87b0f;
  }
}
.question_title,
.question_option {
  margin-bottom: 5px;
}
.question_option_content {
  margin-left: 5px;
}
</style>
