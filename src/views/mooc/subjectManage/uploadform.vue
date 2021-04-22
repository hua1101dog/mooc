<template>
  <div>
    <el-dialog
      v-loading="loading"
      :title="item.id ? '更新' : '新增'"
      width="40%"
      :visible.sync="dialog"
      append-to-body
      destroy-on-close
      :before-close="cancel"
        :close-on-click-modal="false"
    >
      <el-form ref="form" :model="item" label-width="120px" :rules="rules">
        <el-form-item label="题型" prop="type">
          <el-select
            v-model="item.type"
            placeholder="选择题型"
            :disabled="item.id?true:false"
            @change="changeType"
          >
            <el-option
              v-for="type in types"
              :key="type.value"
              :value="type.value"
              :label="type.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="知识体系分类" required="">
          <div class="pro-sty">
            <el-input
              v-model="item.hierarchyClassificationName"
              placeholder="请选择-分类"
              clearable
              read-only
              :class="{ showErroMsg: showErroMsg }"
              @change="changeTree"
              @click.native="deptogglePanel($event, 'classTree', selClassTree)"
            />
            <div v-if="showTree" ref="suoShuMenTree" class="treeDiv">
              <el-tree
                ref="classTree"
                class="suoshubumen"
                :data="data"
                :props="defaultProps"
                node-key="id"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
              />
            </div>
          </div>
          <div v-if="showErroMsg" class="el-form-item__error">
            请选择知识分类体系
          </div>
        </el-form-item>

        <el-form-item label="题干" prop="question">
          <el-input v-model="item.question" />
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
                @change="getType"
              >{{ options[index] }}</el-radio>

              <el-input
                v-model="option.optionContent"
                placeholder="请输入单选选项"
                :class="{ showErroMsg: option.showErroMsg }"
                @input="$forceUpdate()"
                @blur="getRequired(option,'optionContent')"
              />
              <el-radio
                v-model="item.answer"
                :label="options[index]"
                :value="options[index]"
                @change="getType"
              >设为正确答案</el-radio>
            </div>
          </div>
          <div v-if="item.type == 2">
            <div class="subjectPanel_item">
              <el-checkbox-group
                v-model="item.answerList"
                @change="$forceUpdate()"
              >
                <el-checkbox
                  v-for="(option, index) in item.optionDetail"
                  :key="index"
                  :label="options[index]"
                  :value="options[index]"
                  class="type2"
                >{{ options[index] }}
                  <el-input
                    v-model="option.optionContent"
                    required
                    placeholder="请输入多选选项"
                    :class="{ showErroMsg: option.showErroMsg }"
                    @input="$forceUpdate()"
                    @blur="getRequired(option,'optionContent')"
                  />
                  <el-checkbox
                    v-model="item.answer"
                    :label="options[index]"
                  >设为正确答案</el-checkbox></el-checkbox>
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
                @change="getType"
              >对</el-radio>

              <el-radio
                v-model="item.answer"
                :label="options[0]"
                @change="getType"
              >设为正确答案</el-radio>
            </div>
            <div class="subjectPanel_item">
              <el-radio
                v-model="item.answer"
                :label="options[1]"
                style="width: calc(100% - 200px);"
                @change="getType"
              >错</el-radio>

              <el-radio
                v-model="item.answer"
                :label="options[1]"
                @change="getType"
              >设为正确答案</el-radio>
            </div>
          </div>

          <div v-if="item.type == 1 || item.type == 2">
            <el-button
              type="default"
              size="medium"
              class="addButtom"
              @click="addItem()"
            >+添加选项</el-button>
            <el-link type="primary" underline @click="delItem()">删除</el-link>
          </div>
        </div>
        <el-form-item v-if="item.type == 5" label="答案" prop="answer">
          <el-input v-model="item.answer" type="textarea" />
        </el-form-item>

        <el-form-item label="解析">
          <el-input v-model="item.analysis" type="textarea" />
        </el-form-item>
        <div v-if="item.type == 5">
          <el-form-item
            v-for="(k, index) in item.keyWordList"
            :key="index"
            :label="'关键词' + (index + 1)"
          >
            <el-input
              v-model="k.synonym"
              class="keywords"
              :class="{ showErroMsg: !k.synonym }"
              @input="$forceUpdate()"
              @blur="getRequired(k,'synonym')"
            />
            <el-input-number
              v-model="k.weight"
              :min="1"
              :max="100"
              class="weight"
              :controls="false"
              placeholder="权重%"
              :class="{ showErroMsg: !k.weight}"
              @blur="getRequired(k,'weight')"
            />
            <span style="margin-left: -10px;margin-right: 15px;">%</span>
            <el-button @click="delIKeyWords(k)">-</el-button>
          </el-form-item>
          <el-button
            style="margin: 0 auto; display: inherit;margin-bottom: 15px;"
            @click="addKeyWords"
          >+关键词</el-button>
          <div class="tip">注：关键词权重总和需=100%</div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button
          v-if="!item.id"
          type="primary"
          @click="continueAdd"
        >继续添加</el-button>
        <el-button type="primary" @click="updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { editRow } from '@/api/mooc/subject';

export default {
  props: ['item', 'data', 'types', 'defaultProps'],
  data() {
    return {
      showErroMsg: false,
      selClassTree: {},
      showTree: false,
      loading: false,
      options: [],

      rules: {
        question: [
          { required: true, message: '请填写题干', trigger: 'blur' },
          { max: 100, message: '最多可输入100个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择题型', trigger: 'blur' }],
        answer: [{ required: true, message: '请设置答案', trigger: 'blur' }],
        hierarchyClassificationName: [{ required: true, message: '请选择知识分类体系', trigger: 'blur' }]
      },
      isShowErro: false,
      dialog: false,
      isShowKey: false
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
    },
    handleNodeClick(node) {
      this.item.hierarchyClassificationName = node.text;
      this.selClassTree = {
        id: node.id,
        hierarchyClassificationName: node.text
      };
      this.showTree = false;
      this.item.hierarchyClassificationId = node.id;
      this.$set(this.item, 'hierarchyClassificationId', node.id);
      this.$set(this.item, 'hierarchyClassificationName', node.text);
      this.showErroMsg = false;
    },
    changeTree() {
      this.item.hierarchyClassificationName = undefined;
      this.item.hierarchyClassificationId = undefined;
    },
    // 点击空白关闭下拉菜单
    deptogglePanel(event, ref, panel) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      this.showTree ? this.dephide(ref, panel) : this.depshow(ref, panel);
    },
    depshow(ref, panel) {
      this.showTree = true;
      this.$nextTick(() => {
        this.$refs[ref].setCurrentKey(panel.id);
      });

      document.addEventListener('click', this.dephidePanel, false);
    },
    dephide() {
      this.showTree = false;
      document.addEventListener('click', this.dephidePanel, false);
    },

    dephidePanel(e) {
      if (
        this.$refs.suoShuMenTree &&
        !this.$refs.suoShuMenTree.contains(e.target)
      ) {
        this.dephide();
      }
    },
    changeType() {
      this.$set(this.item, 'answer', 'A');
      this.$set(this.item, 'answerList', ['A']);
      var obj = { optionContent: '' };
      if (this.item.type == 1 || this.item.type == 2) {
        // 单选题或者多选题
        this.item.optionDetail = [
          { optionContent: '' },
          { optionContent: '' },
          { optionContent: '' },
          { optionContent: '' }
        ];
      } else if (this.item.type == 3) {
        // 判断题
        this.item.optionDetail = [{ optionContent: '' }, { optionContent: '' }];
      } else {
        this.item.optionDetail = [];
        this.item.answer = '';
        // 问答题
      }

      this.$forceUpdate();
    },
    getType() {
      this.$forceUpdate();
    },

    addItem() {
      if (this.item.type == 1 && this.item.optionDetail.length == 5) {
        this.$message.error('单选题目选项不能超过5个选项！');
        return;
      }
      if (this.item.type == 2 && this.item.optionDetail.length == 8) {
        this.$message.error('多选题目选项不能超过8个选项！');
        return;
      }
      this.item.optionDetail.push({ optionContent: '' });

      this.$forceUpdate();
    },
    delItem() {
      if (this.item.optionDetail.length == 4) {
        alert('不能再删除选项！');
        return;
      }

      // 如果删除的选项就是正确答案,那么正确答案就split 它
      if (this.item.type == 1 && this.item.answer == this.generateCode()[this.item.optionDetail.length - 1]) {
        this.item.answer = '';
      } else if (this.item.type == 2) {
        var index = this.item.answerList.findIndex(ret => {
          return ret == this.generateCode()[this.item.optionDetail.length - 1];
        });
        if (index > -1) {
          this.item.answerList.splice(index, 1);
        }
      }

      this.item.optionDetail.splice(this.item.optionDetail.length - 1, 1);

      this.$forceUpdate();
    },
    addKeyWords() {
      if (this.item.keyWordList.length == 5) {
        this.$message.error('关键词不能超过5个！');
        return;
      }
      this.item.keyWordList.push({});
      this.$forceUpdate();
    },
    delIKeyWords(k) {
      this.item.keyWordList.splice(this.item.keyWordList.indexOf(k), 1);
      this.$forceUpdate();
    },
    getRequired(option, optionContent) {
      if (!option[optionContent]) {
        option.showErroMsg = true;

        this.$set(option, 'showErroMsg', true);
      } else {
        this.$set(option, 'showErroMsg', false);
      }
      //  option[optionContent] = option[optionContent].trim()

      this.$forceUpdate();
    },
    updateData(flag) {
      var that = this;
      var sum = 0;

      if (!this.item.hierarchyClassificationId) {
        this.showErroMsg = true;
      } else {
        this.showErroMsg = false;
      }
      if (this.item.type == 1 || this.item.type == 2) {
        var nm = 0;
        this.isShowKey = false;
        this.item.optionDetail.length && this.item.optionDetail.forEach((v, i) => {
          v.option = this.generateCode()[i];
          if (!v.optionContent) {
            v.showErroMsg = true;
            this.$forceUpdate();
          } else {
            nm++;
          }
        });
        if (nm == this.item.optionDetail.length) {
          this.isShowErro = false;
        } else {
          this.isShowErro = true;
        }
      } else if (this.item.type == '5') {
        this.isShowErro = false;
        var nm1 = 0;
        if (!this.item.keyWordList.length) {
          this.$message.error('请设置关键词');
          return;
        }
        this.item.keyWordList.length && this.item.keyWordList.forEach((v, i) => {
          if (!v.synonym || !v.weight) {
            v.showErroMsg = true;
            this.$forceUpdate();
          } else {
            nm1++;
          }
        });
        if (nm1 == this.item.keyWordList.length) {
          this.isShowKey = false;
        } else {
          this.isShowKey = true;
        }
      } else {
        this.isShowKey = false;
        this.isShowErro = false;
      }

      this.$refs['form'].validate(valid => {
        if (valid && !this.showErroMsg && !this.isShowErro && !this.isShowKey) {
          if (this.item.type == 2) {
            this.item.answerList.sort();

            this.item.answer = this.item.answerList.join('$');
          } else {
            delete this.item.answerList;
          }
          if (this.item.type == '5') {
            this.item.keyWord = JSON.stringify(this.item.keyWordList);
            if (this.item.keyWordList.length) {
              this.item.keyWordList.forEach(v => {
                v.weight = v.weight - 0 || 0;
                if (v.synonym && v.weight) {
                  sum = sum + v.weight;
                }
              });
            }
          } else {
            delete this.item.keyWordList;
          }
          if (
            this.item.type == '5' &&
            this.item.keyWordList.length &&
            sum !== 100
          ) {
            this.$message.error('关键词权重总和需为100%,并且关键词不能为空');
            return;
          }

          if (!this.item.answer || this.item.answer == '') {
            this.$message.error('请设置答案');
            return;
          }
          this.loading = true;
          editRow(this.item).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              if (!flag) {
                that.dialog = false;
                that.$emit('getList');
              } else {
                this.$set(this.item, 'hierarchyClassificationId', '');
                this.$set(this.item, 'hierarchyClassificationName', '');
                this.$set(this.item, 'keyWordList', []);
                this.$set(this.item, 'question', '');
                this.$set(this.item, 'analysis', '');

                if (this.item.type !== '5') {
                  this.item.optionDetail.length && this.item.optionDetail.forEach(v => {
                    v.optionContent = '';
                  });
                  this.$set(this.item, 'answer', 'A');
                  this.$set(this.item, 'answerList', ['A']);

                  this.item.optionDetail.splice(4);
                } else {
                  this.item.optionDetail = [];
                  this.$set(this.item, 'answer', '');
                }
              }
            } else {
              this.$message.error(res.msg);
            }

            this.loading = false;
            this.showErroMsg = false;
            this.isShowErro = false;
            this.isShowKey = false;
          });
        } else {
          return false;
        }
      });
    },
    continueAdd() {
      this.updateData(true);
    },
    cancel() {
      this.dialog = false;
      this.showErroMsg = false;
      this.isShowErro = false;
      this.isShowKey = false;

      this.$refs['form'].clearValidate();
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
</style>
