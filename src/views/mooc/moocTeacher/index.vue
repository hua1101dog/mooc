<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-input
            v-model="listQuery.teachername"
            placeholder="讲师姓名"
            class="filter-item"
          />
          <el-button
            v-waves
            type="primary"
            @click="handleFilter"
          >查询</el-button>
          <el-button v-waves type="default" @click="resetQuery">重置</el-button>
        </div>
        <div class="operate-panel_right">
          <el-button type="primary" @click="handleCreate">新增</el-button>
        </div>
      </div>
      <!-- 表格,数据循环list数组 -->

      <div class="panel-body">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          height="100%"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <!-- NO列 -->
          <el-table-column label="NO" type="index" width="50" align="center">
            <template slot-scope="scope">
              <span>
                {{
                  (listQuery.currentPage - 1) * listQuery.pageSize +
                    scope.$index +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="头像"
            prop="icon"
            min-width="80px"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-image
                v-if="row.icon"
                style="width: 70px;height: 50px"
                :src="processImgUrl(row.icon)"
                :preview-src-list="row.icon.split(',')"
                fit="contain"
              />
              <img
                v-if="!row.icon"
                style="width: 70px;height: 50px"
                src="@/assets/images/defaultImg.png"
                alt
              >
            </template>
          </el-table-column>
          <el-table-column
            label="讲师姓名"
            prop="teachername"
            align="left"
            show-overflow-tooltip
          />

          <el-table-column
            label="讲师级别"
            prop="appview"
            width="150px"
            align="left"
          >
            <template slot-scope="{ row }">
              {{ row.teacherlevel | filterTeacherlevel }}
            </template>
          </el-table-column>
          <el-table-column
            label="创建人"
            prop="creatorName"
            align="left"
            show-overflow-tooltip
          />
          <el-table-column label="创建时间" prop="createtime" align="left" />
          <el-table-column label="排序" prop="sort" align="left" width="130px">
            <template slot-scope="scope" v-if="scope.row.admin">
              <!-- <template slot-scope="scope" v-if="scope.row.admin"> -->
              <span
                v-if="scope.$index !== 0"
               
                class="el-icon-top"
                style="cursor: pointer;"
                @click="sort(scope.$index, 'top')"
              />
              <span
                v-if="scope.$index !== list.length - 1 "
               
                class="el-icon-bottom"
                style="cursor: pointer;"
                @click="sort(scope.$index, 'bottom')"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="250px"
            fixed="right"
          >

            <template slot-scope="{ row }">
              <!-- v-if="!row.apprecommand && row.admin" -->
              <el-link
               v-if="!row.apprecommand && row.admin"
             
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="recommendApp(row.id)"
              >APP首页推荐</el-link>
              <!-- v-if="row.apprecommand && row.admin" -->
              <el-link
                v-if="row.apprecommand && row.admin"
              
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="unrecommendApp(row.id)"
              >下架APP推荐</el-link>
              <!-- v-if="(row.admin? true:row.oneCompany)" -->
              <el-link
                 v-if="(row.admin? true:row.oneCompany)"
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="handleUpdate(row)"
              >编辑</el-link>
              <!-- v-if="(row.admin?true:row.oneCompany)" -->
              <el-link
                  v-if="(row.admin?true:row.oneCompany)"
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="handleDelete(row)"
              >删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="total > 0" class="panel-page">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="40%"
      append-to-body
        :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="头像" prop="icon">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadFileMethodAnswer"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="form.icon"
              :src="processImgUrl(form.icon)"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <i
              v-if="form.icon"
              class="el-icon-close"
              style="position: absolute;z-index: 8;right: 10px;font-size: 16px;"
              @click="removeImg($event)"
            />

            <div
              slot="tip"
              class="el-upload__tip"
              style="color: red;margin-top:0"
            >
              建议尺寸302px*442px
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="讲师姓名" prop="teachername">
          <el-input v-model="form.teachername" />
        </el-form-item>
        <el-form-item label="讲师级别" prop="teacherlevel">
          <el-select
            v-model="form.teacherlevel"
            placeholder="请选择-讲师级别"
            filterable
            value-key="id"
            clearable
            @clear="form.teacherlevel = null"
          >
            <el-option
              v-for="item in teacherlevelList"
              :key="item.type"
              :value="item.type"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="briefdesc">
          <div class="editor-container">
            <editor-bar v-model="form.description" />
          </div>
        </el-form-item>
        <el-form-item label="介绍" prop="description">
          <el-input
            v-model="form.briefdesc"
            style="width:50%"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          :disabled="loading"
          @click="updateData()"
        >确认</el-button>
      </div>
    </el-dialog>
    <Crop
      ref="dialogCropVisible"
      :img-url="optionImg"
      :auto-crop-height="442"
      :auto-crop-width="302"
      :img-height="imgHeight"
      :img-width="imgWidth"
      :img-file="imgFile"
      @imgUrl="getUrl"
    />
  </div>
</template>

<script>
import {
  findPage,
  editRow,
  deleteRow,
  recommend,
  unrecommend,
  bySort
} from '@/api/mooc/teacher';

import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import EditorBar from '@/components/wangEnduit';
import settings from '@/mixins/SettingMixin';
import Crop from './crop';
// import { VueCropper } from "vue-cropper";

export default {
  name: 'Teacher',
  // components: { Pagination, EditorBar, VueCroppe },
  components: { Pagination, EditorBar, Crop },
  directives: { waves },
  filters: {
    filterTeacherlevel(val) {
      switch (val) {
        case 1:
          return '初级';
        case 2:
          return '中级';
        case 3:
          return '高级';
        case 4:
          return '资深';
      }
    }
  },
  mixins: [settings],
  data() {
    return {
      teacherlevelList: [
        { type: 1, name: '初级' },
        { type: 2, name: '中级' },
        { type: 3, name: '高级' },
        { type: 4, name: '资深' }
      ],
      editorOption: {},
      formLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      value: true,
      listLoading: true,

      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        teachername: null
      },

      dialogFormVisible: false,

      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '新增'
      },
      form: { icon: '', appview: 1 },
      loading: false,

      rules: {
        teachername: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
        ],
        // teacherlevel: {
        //   required: true,
        //   message: "请选择讲师级别",
        //   trigger: "change"
        // },
        icon: {
          required: true,
          message: '请上传头像',
          trigger: 'change'
        },
        appview: { required: true }
      },
      baseUrl: '/ovu-base/uploadImg',

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
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      imgWidth: 0, // 图片宽度
      imgHeight: 0, // 图片高度
      optionImg: '',
      imgFile: {}
    };
  },

  mounted: function() {
    this.getList();
  },
  methods: {
    resetQuery() {
      this.listQuery = {
        teachername: '',
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10
      };
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      findPage(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    resetTemp() {
      this.form = { icon: '', appview: 1 };
    },
    handleCreate() {
      this.resetTemp();
      this.loading = false;
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    },

    handleUpdate(row) {
      // 查询编辑信息
      this.dialogStatus = 'update';
      this.loading = false;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
      this.form = Object.assign({}, row);

      this.dialogFormVisible = true;
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteRow(row.id).then(response => {
            if (response.code == 0) {
              this.$notify({
                title: 'Success',
                message: '删除成功!',
                type: 'success',
                duration: 2000
              });
              this.handleFilter();
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
    sort(index, flag) {
      var params = { teacherId1: this.list[index].id };
      if (flag == 'top') {
        params.teacherId2 = this.list[index - 1].id;
      } else {
        params.teacherId2 = this.list[index + 1].id;
      }
      this.$confirm('此操作将进行排序, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 排序
          bySort(params).then(response => {
            this.$notify({
              title: 'Success',
              message: '排序成功!',
              type: 'success',
              duration: 2000
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消排序'
          });
        });
    },

    handleAvatarSuccess(res, file) {
      this.form.icon = res.urls;
      this.$set(this.form, 'icon', res.urls);
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
        if (this.width - 0 > 302) {
          if (this.width <= 1000) {
            $this.imgWidth = this.width;
            $this.imgHeight = this.height;
          } else {
            $this.imgWidth = 1000; // 如果图片宽度大于990 那么容器的宽度为1000 等比缩放
            $this.imgHeight = (1000 / this.width) * this.height;
          }
        } else {
          $this.imgWidth = 302;
          $this.imgHeight = this.height;
        }
        if (this.height - 0 < 442) {
          $this.imgHeight = 442;
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
      this.form.icon = data;
    },

    removeImg(eve) {
      eve.stopPropagation();
      this.form.icon = '';
    },
    updateData() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.dialogFormVisible = false;
          editRow(this.form).then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功');

              this.getList();
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
    recommendApp(id) {
      this.$confirm('此操作将进行APP推荐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 排序
          recommend({ id: id }).then(response => {
            this.$notify({
              title: 'Success',
              message: '推荐成功!',
              type: 'success',
              duration: 2000
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推荐'
          });
        });
    },
    unrecommendApp(id) {
      this.$confirm('此操作将下架APP推荐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 排序
          unrecommend({ id: id }).then(response => {
            this.$notify({
              title: 'Success',
              message: '下架成功!',
              type: 'success',
              duration: 2000
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          });
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: inline-block;
  margin-bottom: -15px;
  position: relative;
  object-fit: fill;
}
/deep/.tui-editor-defaultUI .te-switch-button {
  width: 100px;
  height: inherit;
  background: #e5e5e5;
  outline: 0;
  color: #a0aabf;
  cursor: pointer;
  border: 0;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
/deep/ .tui-editor-defaultUI .te-mode-switch-section {
  background-color: #f9f9f9;
  border-top: 1px solid #e5e5e5;
  height: 40px;
  font-size: 12px;
}
/deep/ .w-e-toolbar .w-e-menu {
  display: inline-block;
  text-align: center;
  padding: 0px 5px;
  cursor: pointer;
}
/deep/ .w-e-toolbar {
  display: block;

  padding: 0 5px;
}
</style>
