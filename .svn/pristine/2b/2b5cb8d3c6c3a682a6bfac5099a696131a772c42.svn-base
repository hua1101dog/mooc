<template>
  <div>
    <div v-if="hasanswer" style="float:right;margin-bottom:10px">
      <img v-if="item.isRight==0 || item.isRight==2" src="@/assets/images/right_default.png" alt="" style="margin-right:5px">
      <img v-if="item.isRight==1" src="@/assets/images/right.png" alt="" style="margin-right:5px">
      <img v-if="item.isRight==1" src="@/assets/images/error_default.png" alt="" style="margin-right:5px">

      <img v-if="item.isRight==0 || item.isRight==2" src="@/assets/images/error.png" alt="" style="margin-right:5px">
    </div>
    <div class="question_title" style="clear:both">
      <span v-if="item.type==1">{{ index + 1 }}. {{ item.question }} ({{ item.score }}分)</span>
      <span v-if="item.type==2"> {{ index + 1 - countList[0] }}. {{ item.question }} ({{ item.score }}分)</span>
      <span v-if="item.type==3"> {{ index + 1 - countList[0] - countList[1] }}. {{ item.question }} ({{ item.score }}分)</span>
      <span v-if="item.type==5"> {{ index + 1 - countList[0] - countList[1]- countList[2] }}. {{ item.question }} ({{ item.score }}分)</span>

    </div>
    <div v-if="item.type !== 5" :style="{margin:!hasanswer?'10px 0':''}">
      <div
        v-if="item.type !== 3"
        class="inline_block"
        style="vertical-align: text-top;margin-left: 10px;width:100%"
      >
        <div
          v-for="(option, i) in item.optionDetail"
          v-if="item.type==1"
          :key="i"
          class="question_option"
        >
          <el-radio v-model="item.answer" :label="options[i]" :value="options[i]" disabled />
          <span class="lable_font">.</span>
          <div class="question_option_content">{{
            option.optionContent
          }}</div>
        </div>
        <div v-if="item.type == 2">
          <el-checkbox-group
            v-model="item.answerList"
            @change="$forceUpdate()"
          >
            <el-checkbox
              v-for="(option, index) in item.optionDetail"
              :key="index"
              style="width: 100%;"
              :label="options[index]"
              :value="options[index]"
              disabled
            >

              <span class="lable_font">{{ options[index] }}.</span>
              <div class="question_option_content">{{
                option.optionContent
              }}</div></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

    </div>

    <div style="background: #F8F8F8;border-radius: 3px;padding:15px 30px;margin-bottom: 10px;font-size: 14px;" :style="{'marginTop':(item.type==5?'10px':'0')}">
      <div v-if="hasanswer" style="margin-bottom:5px">
        学员答案:
        <span v-if="item.type ==1 || item.type ==4 || item.type ==5" style="color:#E87B0F;margin-left:5px;font-weight:700">{{ item.choose }}</span>
        <span v-if="item.type==2 " style="color:#E87B0F;margin-left:5px;font-weight:700">{{ item.chooseList.join("") }}</span>
        <span v-if="item.type==3 " style="color:#E87B0F;margin-left:5px;font-weight:700">{{ item.choose?(item.choose== "A" ? "对" : "错"):'' }}</span>
      </div>
      <div v-if="item.type !== 5">
        <div v-if="item.type == 1">
          正确答案:
          <span style="color:#E87B0F;margin-left:5px;font-weight:700">{{ item.answer }}</span>
        </div>
        <div v-if="item.type == 2">
          正确答案:
          <span style="color:#E87B0F;margin-left:5px;font-weight:700">{{
            item.answerList.join("")
          }}</span>
        </div>
        <div v-if="item.type == 3">
          正确答案:
          <span style="color:#E87B0F;margin-left:5px;font-weight:700">{{
            item.answer== "A" ? "对" : "错"
          }}</span>
        </div>
      </div>
      <div v-else>
        <div>
          正确答案:
          <span style="color:#E87B0F;margin-left:5px;font-weight:700">{{ item.answer }}</span>
        </div>
        <div
          v-for="(k, i) in item.keyWordList"
          :key="i"
          style=" margin-top: 10px;"
        >
          <span style="margin-right: 30px;">关键词 &nbsp;&nbsp;&nbsp;{{ k.synonym }}
          </span>
          <span>权重 &nbsp;&nbsp;&nbsp;{{ k.weight }}%</span>
        </div>
      </div>
      <div v-if="item.analysis" style="margin-top:5px">
        解析说明:
        <span style="margin-left:5px;line-height: 18px">{{
          item.analysis
        }}</span>
      </div>
    </div>

  </div>
</template>

<script>
// 26个大写字母
function generateCode() {
  var str = [];
  for (var i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i));
  }
  return str;
}
export default {

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
  props: ['item', 'index', 'countList', 'hasanswer'],
  data() {
    return {
      options: generateCode(),
      groupList: [],

      paperClassificationId: '',

      checkedTypes: [],

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

  methods: {}
};
</script>
<style lang="scss" scoped>
/deep/.el-row {
  height: 100%;

  margin: 10px;
  padding: 10px;
}
/deep/.el-card__header {
  padding: 10px;
  height: 30px;
  background: #eeeeee;
  border-radius: 3px 3px 0px 0px;
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
    line-height: 20px;
    display: inline-block;
  color: #333;
    width: calc(100% - 50px);
    font-size: 14px;
    vertical-align: bottom;
}
/deep/ .el-radio{
  margin-right: 0;

      font-size: 16px;
}
/deep/ .el-radio__input.is-disabled + span.el-radio__label{
  font-weight: 700;
  color: #333;
vertical-align: top;

}
.lable_font{
  font-weight: 700;
  color: #333;
  vertical-align: top;
}
/deep/ .el-checkbox__input{
  vertical-align: text-bottom;
}
/deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner{
  background-color: #dfe4ed;
    border-color: #dfe4ed;
}
/deep/  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #0c54e5;
}
</style>
