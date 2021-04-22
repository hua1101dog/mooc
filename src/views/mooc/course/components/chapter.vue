<template>
  <div>
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-button type="default" @click="addNode('', 1)">+添加章</el-button>
          <el-button type="default" @click="addNode('', 2)">+添加节</el-button>
          <el-button
            type="default"
            @click="addNode('', 3)"
          >+添加内容</el-button>
        </div>
      </div>
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      />

      <el-dialog
        v-if="dialogNodeVisible"
        :title="dialogText"
        :visible.sync="dialogNodeVisible"
        width="40%"
        append-to-body
        destroy-on-close
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <template v-if="form.chaptertype == 1">
            <el-form-item
              label="章标题"
              prop="chaptername"
              :rules="[
                { required: true, message: '请输入标题', trigger: 'blur' },
                { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.chaptername" />
            </el-form-item>
          </template>
          <template v-if="form.chaptertype == 2">
            <el-form-item
              label="节标题"
              prop="chaptername"
              :rules="[
                { required: true, message: '请输入标题', trigger: 'blur' },
                { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.chaptername" />
            </el-form-item>
          </template>
          <template v-if="form.chaptertype == 3">
            <el-form-item
              label="选择教学形式"
              prop="coursewaretype"
              :rules="[
                {
                  required: true,
                  message: '选择教学形式',
                  trigger: 'change'
                }
              ]"
            >
              <!-- <el-input v-model="form.chaptername" /> -->
              <el-radio
                v-model="form.coursewaretype"
                label="1"
                @change="checkType(1)"
              >视频</el-radio>
              <el-radio
                v-model="form.coursewaretype"
                label="3"
                @change="checkType(3)"
              >音频</el-radio>
              <el-radio
                v-model="form.coursewaretype"
                label="2"
                @change="checkType(2)"
              >PDF</el-radio>
              <el-radio
                v-model="form.coursewaretype"
                label="4"
                @change="checkType(4)"
              >网页</el-radio>
            </el-form-item>
            <el-card class="box-card">
              <el-form-item
                label="标题"
                prop="chaptername"
                :rules="[
                  { required: true, message: '请输入标题', trigger: 'blur' },
                  { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
                ]"
              >
                <el-input v-model="form.chaptername" />
              </el-form-item>
              <el-form-item
                v-if="form.coursewaretype !== '4'"
                :label="labelText"
                required
              >
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  drag
                  :action="baseUrl"
                  :before-upload="beforeAvatarUpload"
                  :file-list="fileList"
                  :on-remove="handleRemove"
                  :http-request="upqiniu"
                  :limit="1"
                  :on-exceed="handleExceed"
                >
                  <i class="el-icon-upload" />
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  <div slot="tip" class="el-upload__tip">
                    <span
                      v-if="form.coursewaretype == 1"
                    >只能上传.mp4文件</span>
                    <span
                      v-if="form.coursewaretype == 3"
                    >只能上传.mp3文件</span>
                    <span
                      v-if="form.coursewaretype == 2"
                    >只能上传.pdf文件</span>
                  </div>
                  <div
                    v-if="erroMessage"
                    slot="tip"
                    class=".el-upload__tip tip_erroMessage"
                  >
                    <span>请上传文件</span>
                  </div>
                </el-upload>
              </el-form-item>
              <div v-if="form.coursewareurl && form.coursewaretype == 2">
                <div class="pdf">
                  <p class="arrow">
                    <pdf
                      v-show="showPdf"
                      :src="form.coursewareurl"
                      :page="currentPage"
                      @num-pages="pageCount = $event"
                      @page-loaded="currentPage = $event"
                      @loaded="loadPdfHandler"
                    />
                  </p>
                </div>
              </div>

              <template v-if="form.coursewaretype == '4'">
                <el-form-item label="链接" required>
                  <el-input
                    v-model="form.coursewareurl"
                    oninput="value=value.replace(/[^a-zA-Z0-9&=%#.:/]/g,'')"
                    @input="$forceUpdate()"
                  />
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
                  链接
                </div>
              </template>
              <template v-if="form.coursewaretype !== '4'">
                <el-form-item label="长度">
                  <el-input
                    v-model="form.chapterlength"
                    readonly
                    style="width: calc(100% - 50px);"
                  />
                  <span
                    v-if="form.coursewaretype == 2"
                    style=" margin-left: 15px;"
                  >页</span>
                  <span
                    v-if="form.coursewaretype == 1 || form.coursewaretype == 3"
                    style=" margin-left: 15px;"
                  >秒</span>
                </el-form-item>
              </template>
              <template v-if="form.coursewaretype == '4'">
                <el-form-item label="长度" prop="chapterlength">
                  <el-input
                    v-model="form.chapterlength"
                    style=" width: calc(100% - 174px);"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    @input="$forceUpdate()"
                  />

                  <el-select
                    v-model="form.unit"
                    style="display:inline-block;width: 120px;margin-left: 15px;"
                    placeholder="请选择-单位"
                    value-key="type"
                    @change="$forceUpdate()"
                  >
                    <el-option
                      v-for="item in unitList"
                      :key="item.type"
                      :value="item.type"
                      :label="item.name"
                    />
                  </el-select>
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
                  <span
                    v-if="!form.chapterlength && form.unit"
                  >请输入长度</span>

                  <span
                    v-if="!form.unit && form.chapterlength"
                  >请选择单位</span>
                  <span
                    v-if="!form.unit && !form.chapterlength"
                  >请输入长度</span>
                </div>
              </template>
            </el-card>
          </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogNodeVisible = false">取消</el-button>
          <el-button
            type="primary"
            :disabled="loading || fileLoading"
            @click="updateData()"
          >确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getChapterTree,
  deleteChapterRow,
  editChapterRow,
  getQiNiuToken
} from '@/api/mooc/course';
import pdf from 'vue-pdf';
import waves from '@/directive/waves'; // waves directive

// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination

export default {
  components: { pdf },
  directives: { waves },
  props: ['courseid'],
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'nodes',
        label: 'chaptername'
      },
      progressPercent: 0,
      showPdf: false,
      fileLoading: false,
      loading: false,
      fileList: [],
      dialogNodeVisible: false,
      baseUrl: 'https://upload.qiniup.com',

      dialogText: '',
      form: { chaptertype: 1 },
      labelText: '',

      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      erroMessage: false,
      unitList: [
        {
          type: 1,
          name: '页'
        },
        {
          type: 2,
          name: '秒'
        }
      ]
    };
  },

  mounted: function() {
    this.getData();
  },

  methods: {
    // 表格数据
    getData() {
      getChapterTree({ courseId: this.courseid }).then(response => {
        // this.treeData = response.data;

        this.data = JSON.parse(JSON.stringify(response.data));
      });
    },
    renderContent(h, { node, data, store }) {
      if (data.chaptertype == 1) {
        return (
          <span style='flex: 1;display: flex;align-items: center;justify-content: space-between;padding-right: 8px;'>
            <span>{node.label}</span>
            <span>
              <el-link type='primary' on-click={() => this.addNode(data, 2)}>
                添加节
              </el-link>
              <el-link type='primary' on-click={() => this.addNode(data, 3)}>
                添加内容
              </el-link>
              <el-link type='primary' on-click={() => this.edit(data)}>
                编辑
              </el-link>
              <el-link type='primary' on-click={() => this.remove(data)}>
                删除
              </el-link>
            </span>
          </span>
        );
      } else if (data.chaptertype == 2) {
        return (
          <span style='flex: 1;display: flex;align-items: center;justify-content: space-between;padding-right: 8px;'>
            <span>{node.label}</span>
            <span>
              <el-link type='primary' on-click={() => this.addNode(data, 3)}>
                添加内容
              </el-link>
              <el-link type='primary' on-click={() => this.edit(data)}>
                编辑
              </el-link>
              <el-link type='primary' on-click={() => this.remove(data)}>
                删除
              </el-link>
            </span>
          </span>
        );
      } else {
        return (
          <span style='flex: 1;display: flex;align-items: center;justify-content: space-between;padding-right: 8px;'>
            <span>{node.label}</span>
            <span>
              <el-link type='primary' on-click={() => this.edit(data)}>
                编辑
              </el-link>
              <el-link type='primary' on-click={() => this.remove(data)}>
                删除
              </el-link>
            </span>
          </span>
        );
      }
    },
    addNode(row, flag) {
      // 添加章
      this.dialogNodeVisible = true;
      this.dialogText = '创建';
      this.erroMessage = false;
      if (row) {
        this.form = {
          parentid: row.id,
          chaptername: '',
          courseid: this.courseid,
          chaptertype: flag
        };
      } else {
        this.form = { chaptertype: flag, chaptername: '' };
      }
      if (flag == 3) {
        this.form.coursewaretype = '1';
        this.labelText = '上传视频';
        this.fileLoading = false;
        this.fileList = [];
        this.form.coursewareurl = '';
        this.form.chapterlength = '';
      }
    },

    edit(row) {
      this.fileLoading = false;
      this.dialogNodeVisible = true;
      this.erroMessage = false;
      this.dialogText = '编辑';
      this.form = Object.assign({}, row);
      if (this.form.coursewareurl) {
        this.form.coursewaretype = this.form.coursewaretype + '';
        this.fileList = [
          { url: this.form.coursewareurl, name: this.form.coursewarename }
        ];
      }
    },

    append(data) {
      const newChild = { id: id++, chaptername: 'testtest', nodes: [] };
      if (!data.nodes) {
        this.$set(data, 'nodes', []);
      }
      data.nodes.push(newChild);
    },

    checkType(flag) {
      this.fileLoading = false;
      this.fileList = [];
      this.form.chapterlength = '';
      this.form.coursewareurl = '';
      this.form.unit = '';
      if (flag == 1) {
        this.labelText = '上传视频';
      } else if (flag == 3) {
        this.labelText = '上传音频';
      } else if (flag == 2) {
        this.labelText = '上传PDF文件';
      } else {
      }
      this.$forceUpdate();
    },
    // 上传文件到七牛云
    upqiniu(req) {
      this.form.chapterlength = '';
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
        var $this=this
      // 重命名要上传的文件

      // 从后端获取上传凭证token
      getQiNiuToken().then(res => {
        if (res.code == 0) {
          const formdata = new FormData();
          formdata.append('file', req.file);
          formdata.append('token', res.data.token);
          this.erroMessage = false;
          console.log($this.$axios.CancelToken.source)
          $this.source = $this.$axios.CancelToken.source(); // 这里初始化source对象
          $this.$axios({
            url: $this.baseUrl,
            method: 'post',
            data: formdata,
            config: config,

            // 上传进度
            onUploadProgress: progressEvent => {
              const num =
                ((progressEvent.loaded / progressEvent.total) * 100) | 0; // 百分比
              req.onProgress({ percent: num }); // 进度条
            },
            cancelToken: $this.source.token
          }).then(data => {
            req.onSuccess(); // 上传成功(打钩的小图标)

            $this.imageUrl = res.data.qiniuDomain + data.data.key;
            var newFile = req;
            newFile.name = req.file.name.split('.')[0];

            newFile.url = $this.imageUrl;
            $this.handleAvatarSuccess(newFile);
          });
        }
      });
    },

    handleAvatarSuccess(res) {
      this.fileList.push({
        name: res.name,
        url: res.url,
        courseid: this.courseid
      });

      this.form.coursewarename = res.name;
      this.form.coursewareurl = res.url;
      this.erroMessage = false;
    },

    handleRemove(file, fileList) {
      this.fileList = [];
      if (file.raw) {
        file.raw.remove = true;
      }

      this.form.coursewareurl = '';
      this.form.chapterlength = '';
      this.erroMessage = true;
      this.source.cancel('取消上传');
    },
    handleExceed() {
      this.$message.error('上传最多只能上传一个文件!');
    },
    beforeAvatarUpload(file) {
      var fileName = file.name || '';
      var ext = fileName.split('.')[fileName.split('.').length - 1];
      var $this = this;
      if (this.form.coursewaretype == '1') {
        if (ext !== 'mp4') {
          this.$message.error('上传文件只能是 mp4 格式!');
          return false;
        }
        var url = URL.createObjectURL(file);
        var audioElement = new Audio(url);
        var duration;

        audioElement.addEventListener('loadedmetadata', function(_event) {
          duration = audioElement.duration; // 时长为秒，小数，182.36
          duration = parseInt(duration);
          $this.form.chapterlength = duration;
        });
      } else if (this.form.coursewaretype == '3') {
        if (ext !== 'mp3') {
          this.$message.error('上传文件只能是 mp3 格式!');
          return false;
        }
        var url = URL.createObjectURL(file);
        // eslint-disable-next-line no-redeclare
        var audioElement = new Audio(url);
        // eslint-disable-next-line no-redeclare
        var duration;
        audioElement.addEventListener('loadedmetadata', function(_event) {
          duration = audioElement.duration; // 时长为秒，小数，182.36
          duration = parseInt(duration);
          $this.form.chapterlength = duration;
        });
      } else if (this.form.coursewaretype == '2') {
        if (ext !== 'pdf') {
          this.$message.error('上传文件只能是 pdf 格式!');
          return false;
        }
      }
    },

    remove(row, node) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除;
          deleteChapterRow(row.id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.getData();
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

    updateData() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          //
          if (this.form.coursewareurl == '') {
            this.erroMessage = true;
            return;
          }
          if (this.form.chapterlength == '') {
            this.erroMessage = true;
            return;
          }

          this.form.courseid = this.courseid;
          this.loading = true;
          editChapterRow(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');
              this.dialogNodeVisible = false;

              this.getData();
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
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
      this.form.chapterlength = this.pageCount;
      this.$set(this.form, 'chapterlength', this.pageCount);
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-upload__tip {
  margin-top: 0px;
  /deep/ .el-form-item__content {
    line-height: 28px;
  }
}
.tip_erroMessage {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  margin-top: 5px;
}
</style>
