<template>
  <div>
    <el-form class="app-container">
      <el-page-header
        content="新增课程"
        title="返回课程列表"
        @back="$router.push('/coursePage/index')"
      />
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        style="margin-top:15px"
      >
        <el-form-item label="选择类型" prop="playway">
          <div class="playway_img">
            <img src="@/assets/images/uploadclick.png" alt="">
          </div>
          <div class="playway_img">
            <img src="@/assets/images/u5811.png" alt="">
          </div>
        </el-form-item>
        <el-form-item label="课程标题" prop="coursename">
          <el-input
            v-model="form.coursename"
            style="width: 400px;"
            placeholder="最多可输入50个字符"
          />
        </el-form-item>

        <el-form-item label="课程封面" prop="coverimg">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadFileMethodAnswer"
            :on-success="handleAvatarSuccess"
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
        <!-- <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort" style="width: 400px;" />
        </el-form-item> -->
      </el-form>
      <div class="dialog-footer text-center">
        <el-button @click="$router.push('/coursePage/index')">取消</el-button>
        <el-button
          type="primary"
          :disabled="loading"
          @click="updateData()"
        >创建</el-button>
      </div>
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
import { editRow } from '@/api/mooc/course';
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Crop from '../moocTeacher/crop';
const base64 = require('js-base64').Base64;
export default {
  // name: "List",

  directives: { waves },
  components: { Crop },
  data() {
    // var checkSort = (rule, value, callback) => {
    //   if (value) {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       callback();
    //     }
    //   }
    // };
    return {
      dialogFormVisible: false,

      loading: false,
      form: { playway: 1, coverimg: '' },
      rules: {
        coursename: [
          { required: true, message: '课程标题', trigger: 'blur' },
          { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
        ],
        coverimg: [
          { required: true, message: '请上传封面', trigger: 'change' }
        ],
        playway: { required: true }
        // sort: [{ validator: checkSort, trigger: "blur" }]
      },
      baseUrl: '/ovu-base/uploadImg',
      imgWidth: 0, // 图片宽度
      imgHeight: 0, // 图片高度
      optionImg: '',
      imgFile: {}
    };
  },

  mounted: function() {},

  methods: {
    handleAvatarSuccess(res, file) {
      this.form.coverimg = res.urls;
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
      this.form.coverimg = data;
    },
    removeImg(eve) {
      eve.stopPropagation();
      this.form.coverimg = '';
    },
    back() {
      this.$router.push({
        path: '/coursePage/index'
      });
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

              var param = Object.assign({}, res.data);

              this.$delete(param, 'coverimg');

              this.$router.push({
                path: '/courseManage/index',
                query: {
                  info: base64.encode(JSON.stringify(param)),
                  coverimg: res.data.coverimg
                }
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
</style>
