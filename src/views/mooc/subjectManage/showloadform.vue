<template>
  <div>
    <el-dialog
      title="详情"
      width="40%"
      :visible.sync="dialog"
      append-to-body
  :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="form" :model="item" label-width="120px">
        <el-form-item label="题型" prop="type">
          <el-select
            v-model="item.type"
            disabled
          >
            <el-option
              v-for="type in types"
              :key="type.value"
              :value="type.value"
              :label="type.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="知识体系分类">
          <div class="pro-sty">
            <el-input

              v-model="item.hierarchyClassificationName"

              read-only
            />

          </div>

        </el-form-item>

        <el-form-item label="题干" prop="question">
          <el-input v-model="item.question" read-only />
        </el-form-item>
        <div style="margin-left: 120px;" class="subjectPanel">
          <div v-if="item.type == 1">
            <div
              v-for="(option, index) in item.optionDetail"
              :key="index"
              class="subjectPanel_item"
            >
              <el-radio
                v-model="item.answer"
                :label="options[index]"
                :value="options[index]"
                disabled
              />
              <!-- <span v-bind:class="{ active: item.answer==options[index]}">{{ options[index] }}</span> -->
              <el-input

                v-model="option.optionContent"
                readonly
                :class="{ showErroMsg: option.showErroMsg }"
              />

            </div>
          </div>
          <div v-if="item.type == 2">
            <div class="subjectPanel_item">
              <el-checkbox-group
                v-model="item.answerList"
              >
                <el-checkbox
                  v-for="(option, index) in item.optionDetail"
                  :key="index"
                  :label="options[index]"
                  :value="options[index]"
                  class="type2"
                  disabled
                ><span :class="{ active: item.answerList.join(',').indexOf(options[index])!=-1}">{{ options[index] }}  </span>
                  <el-input
                    v-model="option.optionContent"

                    required
                    readonly
                  />
                </el-checkbox>
              </el-checkbox-group>
              <div />
            </div>
          </div>
          <div v-if="item.type == 3">
            <div>
              <el-radio
                v-model="item.answer"
                class="subjectPanel_item"
                :label="options[0]"
                style="width: calc(100% - 200px);"

                disabled
              ><span :class="{ active: item.answer=='A'}">对</span></el-radio>

            </div>
            <div class="subjectPanel_item">
              <el-radio
                v-model="item.answer"
                :label="options[1]"
                style="width: calc(100% - 200px);"
                disabled
              ><span :class="{ active: item.answer=='B'}">错</span></el-radio>

            </div>
          </div>

        </div>
        <el-form-item v-if="item.type == 5" label="答案" prop="answer">
          <el-input v-model="item.answer" type="textarea" readonly />
        </el-form-item>

        <el-form-item label="解析">
          <el-input v-model="item.analysis" type="textarea" readonly />
        </el-form-item>
        <div v-if="item.type == 5">
          <el-form-item
            v-for="(k, index) in item.keyWordList"
            :key="index"
            :label="'关键词' + (index + 1)"
          >
            <el-input v-model="k.synonym" class="keywords" readonly />
            <el-input-number
              v-model="k.weight"

              class="weight"
              :controls="false"

              readonly
            />
            <span style="margin-left: -10px;margin-right: 15px;">%</span>

          </el-form-item>

        </div>
        <el-form-item v-if="item.type != '5'" label="正确答案">
          <label v-if="item.type!='3'">{{ item.answerList ? item.answerList.join(',') : item.answer }}</label>
          <label v-else>{{ item.answer=='A'?'对':'错' }}</label>
        </el-form-item>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>



export default {
  props: ['item', 'types'],
  data() {
    return {

      answer: '',
      options: [],
      dialog: false
    };
  },
  created() {
    this.options = this.generateCode();
  },
  methods: {
    // 26个大写字母
    generateCode() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      return str;
    }

  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pro-sty {
  width: 100%;
  display: inline-block;
  position: relative;
  margin-right: 5px;
  /deep/.border-red {
    .el-input__inner {
      border: 1px solid rgba(255, 0, 0, 0.59);
      -moz-box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
      -webkit-box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
      box-shadow: 0 0 8px rgba(255, 0, 0, 0.59);
    }
  }
  /deep/ .el-tree-node > .el-tree-node__children {
    overflow: inherit;
    background-color: transparent;
  }
  .treeDiv {
    position: absolute;
    top: 45px;
    left: 0px;
    width: 240px;
    padding: 14px;
    line-height: 40px;
    background-color: #fff;
    border-radius: 4px;
    z-index: 100;
    max-height: 500px;
    overflow: auto;
    /deep/.el-tree-node__content {
      height: 40px;
    }
    /deep/.el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
    }
  }
}
.subjectPanel {
  margin-left: 120px;
  margin-bottom: 15px;
  .subjectPanel_item,
  .type2 {
    width: 100%;
    /deep/.el-checkbox__label {
      width: 100%;
    }
    margin-bottom: 15px;
    /deep/ .el-input {
      width: calc(100% - 222px);
      margin-right: 15px;
    }
  }
  .type2 {
    /deep/ .el-input {
      margin-left: 30px;
    }
  }

  .addButtom {
    width: calc(100% - 222px);
    margin-left: 64px;
  }
}
.keywords {
  width: calc(100% - 165px);
}

.weight {
  width: 80px;
  margin: 0 15px;
}
.tip {
  color: red;
  margin-left: 120px;
  font-size: 12px;
}
.showErroMsg {
  /deep/ .el-input__inner {
    border: 1px solid #ff4949;
  }
}
.active{
  // color: #E87B0F;
}
</style>
