<template>
  <div>
    <el-form class="app-container">
      <el-page-header
        content="课程管理"
        title="返回"
        @back="$router.push('/coursePage/index')"
      />
      <el-card class="box-card" style="margin-top: 15px;">
        <el-image
          v-if="coverimg"
          class="inline_block"
          style="width: 164px; height: 90px;object-fit:contain"
          :src="processImgUrl(coverimg)"
          :preview-src-list="coverimg.split(',')"
        />
        <img
          v-if="!coverimg"
          class="inline_block"
          style="width: 100px;height: 80px"
          src="@/assets/images/defaultImg.png"
          alt
        >
        <div class="font-level-3 inline_block" style=" margin-left: 50px;">
          <strong> {{ form.coursename }}</strong>
        </div>
        <el-tag v-if="form.type" type="success" style=" margin-left: 15px;">
          {{
            form.type == 1 ? "私有" : form.type == 2 ? "半公开" : "公开"
          }}</el-tag>
        <div
          class="dialog-footer text-right inline_block  pull-right"
          style="line-height: 80px;"
        >
          <!-- <el-button>预览</el-button>
        <el-button type="primary">发布</el-button> -->
        </div>
      </el-card>
      <el-col class="tac" style="height: calc(100% - 180px);">
        <el-col
          :span="5"
          style="margin-top: 15px;    height: calc(100% - 25px);overflow: auto;"
        >
          <ul role="menubar" class="el-menu-vertical-demo el-menu">
            <li
              v-for="(item, i) in tabArray"
              :key="i"
              role="menuitem"
              class="el-submenu text-center"
              @click="changeMenu(i)"
            >
              <div class="el-submenu__title" style="padding-left: 20px;">
                <span :class="{ tab_active: activeMenu == i }">{{ item }}</span>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col
          :span="19"
          style="margin-top: 15px;  height: calc(100% - 25px);"
        >
          <el-card
            class="box-card"
            style="    height: 100%;    overflow-y: auto;"
          >
            <div slot="header" class="clearfix">
              <span>{{ tabArray[activeMenu] }}</span>
            </div>
            <div v-if="activeMenu == 0">
              <el-form
                ref="form"
                :model="form"
                label-width="120px"
                :rules="rules"
                style="margin-top:15px"
              >
                <el-form-item label="标题" prop="coursename">
                  <el-input v-model="form.coursename" style="width: 400px;" />
                </el-form-item>
                <el-form-item label="分类" prop="classname">
                  <div class="pro-sty">
                    <el-input
                      v-model="form.classnamePath"
                      placeholder="请选择分类"
                      clearable
                      read-only
                      @change="changeTree"
                      @click.native="
                        deptogglePanel($event, 'classTree', selClassTree)
                      "
                    />
                    <div v-if="showTree" ref="suoShuMenTree" class="treeDiv">
                      <el-tree
                        ref="classTree"
                        class="suoshubumen"
                        :data="nodes"
                        :props="defaultProps"
                        node-key="id"
                        highlight-current
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick"
                      />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="封面" prop="coverimg">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :auto-upload="false"
                    :on-change="uploadFileMethodAnswer"
                  >
                    <img
                      v-if="form.coverimg"
                      :src="processImgUrl(form.coverimg)"
                      class="avatar"
                    >
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                    <i
                      v-if="form.coverimg"
                      class="el-icon-close"
                      style="position: absolute;z-index: 8;right: 10px;font-size: 16px;"
                      @click="removeImg($event)"
                    />
                    <div
                      slot="tip"
                      class="el-upload__tip"
                      style="color: red;margin-top:0"
                    >
                      建议尺寸472px*258px
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="简介" prop="introduction">
                  <el-input
                    v-model="form.introduction"
                    type="textarea"
                    style="width: 400px;"
                    :rows="5"
                  />
                </el-form-item>
              </el-form>

              <div class="dialog-footer" style="    margin-left: 120px;">
                <el-button
                  @click="$router.push('/coursePage/index')"
                >取消</el-button>
                <el-button type="primary" @click="updateData()">确认</el-button>
              </div>
            </div>
            <div v-if="activeMenu == 1">
              <Chapter :courseid="info.id" :type="form.type" />
            </div>
            <div v-if="activeMenu == 2">
              <Student
                :courseid="info.id"
                :type="form.type"
                @changeType="changeType"
              />
            </div>
            <div v-if="activeMenu == 3">
              <!-- <Material :form="form" ref="trigger"></Material> -->
              <Material :courseid="info.id" />
            </div>
            <div v-if="activeMenu == 4">
              <Lecturer :courseid="info.id" />
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-form>
    <Crop
      ref="dialogCropVisible"
      :img-url="optionImg"
      :auto-crop-height="258"
      :auto-crop-width="472"
      :img-height="imgHeight"
      :img-width="imgWidth"
      :img-file="imgFile"
      @imgUrl="getUrl"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import { editRow, getDataTree, findPage } from '@/api/mooc/course';
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination

import Chapter from './components/chapter'; //  章程
import Material from './components/material'; //  课程资料
import Lecturer from './components/lecturer'; //  讲师
import Student from './components/student'; //  学员
import Crop from '../moocTeacher/crop';
const base64 = require('js-base64').Base64;
export default {
  components: { Chapter, Material, Lecturer, Student, Crop },
  directives: { waves },
  data() {
    return {
      form: { coverimg: '' },
      nodes: [],
      defaultProps: {
        children: 'nodes',
        label: 'classname'
      },

      rules: {
        coursename: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
        ],
        introduction: [
          { max: 500, message: '最多可输入500个字符', trigger: 'blur' }
        ],
        classname: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        coverimg: [{ required: true, message: '请上传封面', trigger: 'change' }]
      },
      tabArray: [
        '基本信息',
        // "详细信息",
        '章节设置',
        '学员管理',
        '课程资料',
        '讲师设置'
        // "课程评论",
        // "课程笔记",
        // "课程统计"
      ],
      baseUrl: '/ovu-base/uploadImg',
      activeMenu: '0',
      showTree: false,
      selClassTree: {},
      loading: false,
      obj: {},
      imgWidth: 0, // 图片宽度
      imgHeight: 0, // 图片高度
      optionImg: '',
      imgFile: {},
      classid: ''
    };
  },
  computed: {
    info: {
      get: function() {
        if (this.$route.query.info) {
          return JSON.parse(base64.decode(this.$route.query.info));
        } else {
          return {};
        }
      },
      set: function(val) {
        this.form = val;
      }
    }
  },

  mounted: function() {},
  created() {
    //

    this.obj = JSON.parse(JSON.stringify(this.info));

    var params = {

      coursename: this.info.coursename,
      pageIndex: 0,
      currentPage: 1,
      pageSize: 100
    };
    var that = this;
    findPage(params).then(response => {
      var list = response.data.data;
      list.length && list.forEach(v => {
        if (v.id == that.info.id) {
          that.$set(that, 'obj', v);
          that.$set(that.form, 'classid', v.classid);
          this.getDataTree();
        }
      });
    });

    this.coverimg = this.$route.query.coverimg;
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.form.coverimg = res.urls;
      this.$nextTick(() => {
        this.$set(this.form, 'coverimg', res.urls);
      });
      this.$forceUpdate();
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
      this.form.coverimg = data;
      // this.coverimg = data;

      this.$set(this.form, 'coverimg', data);
      this.$forceUpdate();
    },
    removeImg(eve) {
      eve.stopPropagation();

      this.form.coverimg = '';
      this.$set(this.form, 'coverimg', '');
      this.$forceUpdate();
    },
    changeType(val) {
      this.form.type = val;
      var params = {

        coursename: this.info.coursename,
        pageIndex: 0,
        currentPage: 1,
        pageSize: 100
      };
      var that = this;
      findPage(params).then(response => {
        var list = response.data.data;
        list.length && list.forEach(v => {
          if (v.id == that.info.id) {
            that.$set(that, 'obj', v);
          }
        });
      });
      this.$forceUpdate();
    },

    updateData() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          var param = Object.assign(
            { coverimg: this.form.coverimg },
            this.form
          );
          this.loading = true;
          editRow(param).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              this.$set(this, 'coverimg', res.data.coverimg);
              this.$set(this, 'obj', res.data);
              this.$set(this, 'form', res.data);
              this.$set(this, 'classid', res.data.classid);

              this.getDataTree();
              this.$forceUpdate();
              this.$nextTick(() => {
                this.$refs['form'].clearValidate();
              });
            } else {
              this.$message.error(res.msg);
            }
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    changeMenu(i) {
      this.activeMenu = i;
      this.getDataTree();
    },
    getMenuName(arr) {
      for (var value of arr) {
        if (value.id == this.form.classid) {
          this.handleNodeClick(value);
        } else {
          if (value.nodes) {
            this.getMenuName(value.nodes);
          }
        }
      }
    },
    async getDataTree() {
      this.form = Object.assign({}, this.obj);

      this.form.coverimg = this.coverimg;

      try {
        this.loading = true;
        await getDataTree().then(res => {
          this.nodes = res.data;

          if (this.nodes && this.nodes.length && this.form.classid) {
            this.getMenuName(this.nodes);
          }
        });
      } finally {
        this.loading = false;
      }
    },
    handleNodeClick(node) {
      if (node.parentid == '0') {
        this.$message.error('只允许选择叶子节点');
        return;
      }

      this.form.classnamePath = node.parentName + ' > ' + node.classname;

      this.selClassTree = {
        id: node.id,
        classname: node.classname
      };
      this.showTree = false;
      this.form.classid = node.id;
      this.$set(this.form, 'classid', node.id);
      this.$set(this.form, 'classname', node.classname);
    },
    changeTree() {
      this.form.className = '';
      this.form.classid = '';
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
/deep/ .el-icon-arrow-down {
  display: none;
}
.playway_img {
  display: inline-block;
  margin-right: 30px;
  margin-top: 30px;
  img {
    width: 300px;
    height: 200px;

    margin-top: 30px;
    cursor: pointer;
    object-fit: fill;
  }
}
.tab_active {
  color: #409eff;
}
/deep/ .el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #ffffff;
  height: 650px;
  margin-right: 15px;
}
.inline_block {
  display: inline-block;
  vertical-align: middle;
}
.pro-sty {
  width: 400px;
  display: inline-block;
  // line-height: 50px;

  position: relative;
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
</style>
