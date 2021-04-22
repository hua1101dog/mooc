<template>
  <div>
    <el-dialog
      title="图片裁剪"
      :visible.sync="dialog"
      append-to-body
      :width="imgWidth + 50 + 'px'"
      :close-on-click-modal="false"
    >
      <div class="cropper-content">
        <div
          class="cropper"
          style="margin: 0 auto;"
          :style="{
            height: imgHeight + 10 + 'px',
            width: imgWidth + 10 + 'px'
          }"
        >
          <vueCropper
            ref="cropper"
            :img="imgUrl"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            :center-box="option.centerBox"
            :info-true="option.infoTrue"
            :fixed-box="option.fixedBox"
            :auto-crop-width="autoCropWidth"
            :auto-crop-height="autoCropHeight"
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropImage('cancel')">取消</el-button>
        <el-button
          v-loading="loading"
          type="primary"
          @click="cropImage()"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQiNiuToken } from '@/api/mooc/course';
export default {
  props: [
    'imgUrl',
    'autoCropWidth',
    'autoCropHeight',
    'imgWidth',
    'imgHeight',
    'imgFile'
  ],
  data() {
    return {
      cropImg: '',
      imageUrl: '',
      dialog: false,

      loading: false,
      // 剪切图片上传

      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框

        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        // fixedNumber: [7, 5], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    };
  },
  methods: {
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    getBase64(File, callback) {
      var reader = new FileReader(); // IE10+
      var AllowImgFileSize = 2100000; // 上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
      var File = File; // 获取上传的文件对象
      /*
        FileList {0: File, 1: File, length: 2} 多个文件
        File:{name: "fan.jpg", lastModified: 1559019043288, lastModifiedDate: Tue May 28 2019 12:50:43 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 3346145, type: "image/jpeg"}
        FileList {0: File, 1: File, length: 2}  单个文件
     */
      if (File) {
        // 读取指定的 Blob 或 File 对象  触发loadend 事件 并将图片的base64编码赋值给result
        reader.readAsDataURL(File);
        // reader.readAsText(File)
        // 异步通信 回调函数返回
        reader.onload = function(e) {
          // var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
          if (
            AllowImgFileSize != 0 &&
            AllowImgFileSize < reader.result.length
          ) {
            alert('上传失败，请上传不大于2M的图片！');
            return;
          } else {
            var base64Data = reader.result;
            // 返回base64编码
            callback(base64Data);
          }
        };
      }
    },
    cropImage(cancel) {
      var $this = this;
      if (cancel) {
        // this.getBase64(this.imgFile.raw, function(result) {
        //   $this.cropImg = result;
        // });
        $this.dialog = false;
      } else {
        // 确定
        this.$refs.cropper.getCropData(data => {
          this.cropImg = data;
        });
        this.loading = true;
        getQiNiuToken().then(res => {
          var pic = this.cropImg.split(',')[1] + '';

          var url = 'https://upload.qiniup.com/putb64/-1'; // 非华东空间需要根据注意事项 1 修改上传域名
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              const dataInfo = JSON.parse(xhr.response); // 将返回的字符串转化为JSON对象
              $this.imageUrl = res.data.qiniuDomain + dataInfo.key;
              $this.dialog = false;
              $this.loading = false;
              $this.$emit('imgUrl', $this.imageUrl);
            }
          };
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-Type', 'application/octet-stream');
          xhr.setRequestHeader('Authorization', `UpToken ${res.data.token}`);
          xhr.send(pic);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cropper-content {
  .cropper {
    width: auto;
    height: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 614px;
}
.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  margin-left: 30px;
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
</style>
