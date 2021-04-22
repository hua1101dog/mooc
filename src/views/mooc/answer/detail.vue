
<template>
  <div style="background: #f8f8f8;font-size:16px;height: calc(100% - 62px);">
    <el-form class="app-container">
      <el-page-header
        content="答卷详情"
        title="返回答卷列表"
        @back="$router.push('/paper/answer/list')"
      />
      <el-row :gutter="10" style="">
        <el-col :span="6" style="    max-height: calc(100% - 19px);overflow:auto">
          <el-card class="box-card">
            <div style="font-size: 18px;font-weight: 800;">
              答题卡
            </div>
            <div v-if="countList[0] > 0" style="margin-top:20px">
              <div>
                单选题（共{{ countList[0] }}题，合计{{
                  countList[0] * scoreList[0]
                }}分）
              </div>
              <div style="    margin-top: 20px;">
                <a
                  v-for="(item, index) in selectSubList"
                  v-if="item.type == 1"
                  :key="index"
                  href="javascript:void(0);"
                  class="dtk"
                  :class="{ activated: activatedItemId == item.id,pass:item.isRight==1,erro:item.isRight==0,noanser:item.isRight==2 }"
                  @click="checkSub(item, 'ty1' + index)"
                >
                  {{ index + 1 }}
                </a>
              </div>
            </div>
            <div v-if="countList[1] > 0" style="margin-top:20px">
              <div>
                多选题（共{{ countList[1] }}题，合计{{
                  countList[1] * scoreList[1]
                }}分）
              </div>
              <div style="    margin-top: 20px;">
                <a
                  v-for="(item, index) in selectSubList"
                  v-if="item.type == 2"
                  :key="index"
                  href="javascript:void(0);"
                  class="dtk"
                  :class="{ activated: activatedItemId == item.id,pass:item.isRight==1,erro:item.isRight==0,noanser:item.isRight==2 }"
                  @click="checkSub(item, 'ty2' + index)"
                >
                  {{ index + 1 - countList[0] }}
                </a>
              </div>
            </div>
            <div v-if="countList[2] > 0" style="margin-top:20px">
              <div>
                判断题（共{{ countList[2] }}题，合计{{
                  countList[2] * scoreList[2]
                }}分）
              </div>
              <div style="    margin-top: 20px;">
                <a
                  v-for="(item, index) in selectSubList"
                  v-if="item.type == 3"
                  :key="index"
                  href="javascript:void(0);"
                  class="dtk"
                  :class="{ activated: activatedItemId == item.id,pass:item.isRight==1,erro:item.isRight==0,noanser:item.isRight==2 }"
                  @click="checkSub(item, 'ty3' + index)"
                >
                  {{ index + 1 - countList[0] - countList[1] }}
                </a>
              </div>
            </div>
            <div v-if="countList[3] > 0" style="margin-top:20px">
              <div>
                问答题（共{{ countList[3] }}题，合计{{
                  countList[3] * scoreList[3]
                }}分）
              </div>
              <div style="    margin-top: 20px;">
                <a
                  v-for="(item, index) in selectSubList"
                  v-if="item.type == 5"
                  :key="index"
                  href="javascript:void(0);"
                  class="dtk"
                  :class="{ activated: activatedItemId == item.id,pass:item.isRight==1,erro:item.isRight==0,noanser:item.isRight==2 }"
                  @click="checkSub(item, 'ty5' + index)"
                >
                  {{ index + 1 - countList[0] - countList[1] - countList[2] }}
                </a>
              </div>
            </div>
            <div style="margin-top:100px">
              <a href="javascript:void(0);" class="dtk pass" style="margin-bottom:0" /><span class="right_level1" style="margin-right: 10px;">正确</span>
              <a href="javascript:void(0);" class="dtk erro" style="margin-bottom:0" /><span class="right_level1" style="margin-right: 10px;">错误</span>
              <a href="javascript:void(0);" class="dtk noanser" style="margin-bottom:0" /><span class="right_level1" style="margin-right: 10px;">未答</span>
            </div>
          </el-card></el-col>
        <el-col :span="15" style=" height: calc(100% - 19px);overflow:auto;style:margin-left:10px;margin-right:10px">
          <el-card v-if="countList[0] > 0" class="box-card ">
            <div slot="header" class="clearfix">
              单选题（共{{ countList[0] }}题，合计{{
                countList[0] * scoreList[0]
              }}分）
            </div>
            <div class="filter-container">
              <div
                v-for="(item, index) in selectSubList"
                v-if="item.type == 1"
                :id="'ty1' + index"
                :key="index"
                style="margin-top:10px"
              >
                <subject-item :item="item" :index="index" :hasanswer="hasanswer" :count-list="countList" />
              </div>
            </div>
          </el-card>
          <el-card v-if="countList[1] > 0" class="box-card mt20">
            <div slot="header" class="clearfix">
              多选题（共{{ countList[1] }}题，合计{{
                countList[1] * scoreList[1]
              }}分）
            </div>
            <div class="filter-container">
              <div
                v-for="(item, index) in selectSubList"
                v-if="item.type == 2"
                :id="'ty2' + index"
                :key="index"
                style="margin-top:10px"
              >
                <subject-item :item="item" :index="index" :hasanswer="hasanswer" :count-list="countList" />
              </div>
            </div>
          </el-card>
          <el-card v-if="countList[2] > 0" class="box-card mt20">
            <div slot="header" class="clearfix">
              判断题（共{{ countList[2] }}题，合计{{ countList[2] * scoreList[2] }}分）
            </div>
            <div class="filter-container">
              <div
                v-for="(item, index) in selectSubList"
                v-if="item.type == 3"
                :id="'ty3' + index"
                :key="index"
                style="margin-top:10px"
              >
                <subject-item :item="item" :index="index" :hasanswer="hasanswer" :count-list="countList" />
              </div>
            </div>
          </el-card>
          <el-card v-if="countList[3] > 0" class="box-card mt20">
            <div slot="header" class="clearfix">
              问答题（共{{ countList[3] }}题，合计{{ countList[3] * scoreList[3] }}分）
            </div>
            <div class="filter-container">

              <div v-for="(item, index) in selectSubList" v-if="item.type == 5">
                <div
                  :id="'ty5' + index"
                  :key="index"
                  style="margin-top:10px;margin-bottom:15px"
                >
                  <subject-item :item="item" :index="index" :hasanswer="hasanswer" :count-list="countList" />
                </div>
              </div>
            </div>
          </el-card>

        </el-col>
        <el-col :span="3" style=" height: 274px">
          <el-card class="box-card ">
            <div
              class="right_level1"
              >
              学员姓名
            </div>
            <div class="right_level2">
              {{ form.examinee }}
            </div>
            <el-divider />
            <div
              class="right_level1"
             
            >
              考试成绩
            </div>
            <div class="right_level2">
              {{ form.totalScore }}
            </div>
            <el-divider />
            <div
              class="right_level1"
             
            >
              考试状态
            </div>
            <div class="right_level2 " :class="{unpass:form.isPass==0,rig:form.isPass==1}">
              {{ form.isPass==0?'未通过':form.isPass==1?'已通过':'' }}
            </div>

          </el-card>

        </el-col>

      </el-row>
      <div style="text-align: right;    height: 30px">
        卷面总计
        {{
          countList[0] * scoreList[0] +
            countList[1] * scoreList[1] +
            countList[2] * scoreList[2] +
            countList[3] * scoreList[3]
        }}分
        <span style=" margin-left: 30px;">及格分：</span>
        {{ form.passGrade }}分
      </div>
    </el-form>
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import draggable from 'vuedraggable';
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import SubjectItem from '../components/subjectItem';
import { getRow } from '@/api/mooc/answer';

import Utils from '../util.js';
const base64 = require('js-base64').Base64;
export default {
  directives: { waves },
  components: { Pagination, draggable, SubjectItem },

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
      hasanswer: true,
      options: [],
      groupList: [],
      activatedItemId: '',
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
      form: {
        examinee: '',
        totalScore: '',
        isPass: null
      },
      data: [],
      dialog: false,
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
        ],
        playway: { required: true }
        // sort: [{ validator: checkSort, trigger: "blur" }]
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
    this.getData();
  },
  activated() {
    this.getData();
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

    back() {
      this.$router.push({
        path: '/coursePage/index'
      });
    },

    checkSub(item, id) {
      this.activatedItemId = item.id;
      var id = '#' + id;
      this.$el.querySelector(id).scrollIntoView();
    },
    getData() {
      if (this.$route.query.id) {
        getRow(this.$route.query.id).then(res => {
          this.form = res.data;

          this.selectSubList = this.form.subjectDetail;

          this.selectSubList.forEach(v => {
            v.score = v.paperScore;
            if (v.type == 1) {
              this.countList[0] = this.countList[0] + 1;
              this.scoreList[0] = v.score;
            } else if (v.type == 2) {
              this.countList[1] = this.countList[1] + 1;
              this.scoreList[1] = v.score;
              if (v.choose) {
                v.chooseList = v.choose.split('$');
              } else {
                v.chooseList = [];
              }
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
      } else {
        this.form = {};
      }

      this.options = this.generateCode();
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-row {
  height: 100%;

  margin: 10px;
  padding: 0;
}
/deep/ .el-page-header__content {
  font-size: 18px;
}
/deep/.el-card__header {
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  background: #eeeeee;
  border-radius: 3px 3px 0px 0px;
  font-weight: 700;
  font-size: 18px;
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
  margin-bottom: 10px;
}
.question_option_content {
  margin-left: 5px;
  line-height: 17px;

}
.dtk {
  height: 25px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
  text-align: center;
  line-height: 25px;
  width: 40px;
  display: inline-block;
  /* flex: 1; */
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 20px;
}
.activated {
  background: #0b7aff;
  color: #fff;
}
/deep/ .el-radio__label{
  vertical-align: middle;
}
.right_level1{
     font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #9A9A9A;
    text-align: center;
      margin: 0;
      padding: 0;
    vertical-align: super;
   

}
.right_level2{
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  margin-top: 12px;
}
.unpass{
  color:#F2361C
}
.rig{
  color:#0ACC60
}
.pass{

background: #0ACC60;
color:#fff
}
.erro{
background: #F2361C;
color:#fff
}
.noanser{

background: #BCBCBC;
color:#fff
}
/deep/ .el-col-6{
  width:362px;
}
/deep/ .el-col-3{
  width:200px;
}
/deep/ .el-col-15{
  width:calc(100% - 582px);
}


</style>
