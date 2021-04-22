<template>
  <div class="newAddCourse-index">
    <router-view />
    <p>选择类型</p>
    <div class="upload">
      <div class="left">
        <img src="@/assets/images/uploadclick.png" alt="">
      </div>
    </div>
    <div class="courseTitle">
      <p style="float:left;">课程标题</p>
      <el-input
        v-model="courseTitle"
        placeholder="最多50个字"
        style="width:50%;margin-left:40px;"
        clearable
      />
    </div>
    <div class="courseImg">
      <p>课程封面</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewAddCourse',
  data() {
    return {
      courseTitle: '',
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.newAddCourse-index {
  padding: 20px;
  p {
  }
  .upload {
    margin-top: 40px;
    padding-left: 40px;
    .left {
      width: 255px;
      height: 200px;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .courseTitle {
    margin-top: 40px;
  }
  .courseImg {
    margin-top: 40px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
