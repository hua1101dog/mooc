<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="operate-panel">
        <div class="operate-panel_left">
          <el-input
            v-model="listQuery.bannername"
            placeholder="标题"
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
            label="标题"
            prop="bannername"
            align="left"
            show-overflow-tooltip
          />
          <el-table-column label="关联课程" prop="courseName" align="left" />
          <el-table-column
            label="图片"
            prop="bannerlogo"
            min-width="80px"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-image
                v-if="row.bannerlogo"
                style="width: 70px;height: 50px;"
                :src="processImgUrl(row.bannerlogo)"
                :preview-src-list="row.bannerlogo.split(',')"
                fit="contain"
              />
              <img
                v-if="!row.bannerlogo"
                style="width: 70px;height: 50px;"
                src="@/assets/images/defaultImg.png"
                alt
              >
            </template>
          </el-table-column>
          <el-table-column
            label="App是否可见"
            prop="appview"
            width="150px"
            align="left"
          >
            <template slot-scope="{ row }">
              {{ row.appview == 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="sort" align="left" width="130px">
            <template slot-scope="scope">
              <span
                v-if="scope.$index !== 0"
                class="el-icon-top"
                style="cursor: pointer;"
                @click="sort(scope.$index, 'top')"
              />
              <span
                v-if="scope.$index !== list.length - 1"
                class="el-icon-bottom"
                style="cursor: pointer;"
                @click="sort(scope.$index, 'bottom')"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="160px"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-link
                type="primary"
                :underline="false"
                style="padding: 0 3px;"
                @click="handleUpdate(row)"
              >编辑</el-link>

              <el-link
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
        <el-form-item label="标题" prop="bannername">
          <el-input v-model="form.bannername" />
        </el-form-item>
        <el-form-item label="关联课程" prop="courseid">
          <el-select
            v-model="form.courseid"
            placeholder="请选择-关联课程"
            filterable
            value-key="id"
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :value="item.id"
              :label="item.coursename"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="logo" prop="bannerlogo">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadFileMethodAnswer"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="form.bannerlogo"
              :src="processImgUrl(form.bannerlogo)"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <i
              v-if="form.bannerlogo"
              class="el-icon-close"
              style="position: absolute;z-index: 8;right: 10px;font-size: 16px;"
              @click="removeImg($event)"
            />
            <div
              slot="tip"
              class="el-upload__tip"
              style="color: red;margin-top:0"
            >
              建议尺寸990px*396px
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="APP是否可见" prop="appview">
          <el-switch
            v-model="form.appview"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ccc"
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
      :auto-crop-height="396"
      :auto-crop-width="990"
      :img-height="imgHeight"
      :img-width="imgWidth"
      :img-file="imgFile"
      @imgUrl="getUrl"
    />
  </div>
</template>

<script>
import { findPage, editRow, deleteRow, bySort } from '@/api/mooc/banner';
import { findPage as getCourseListNoPage } from '@/api/mooc/course';
import waves from '@/directive/waves'; // waves directive
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';
import Crop from '../moocTeacher/crop';
export default {
  name: 'BannerMange',
  components: { Pagination, Crop },
  directives: { waves },
  mixins: [settings],
  data() {
    return {
      courseList: [],
      tableKey: 0,
      list: [],
      total: 0,
      value: true,
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        bannername: ''
      },

      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '新增'
      },
      form: { bannerlogo: '', appview: 1 },
      loading: false,

      rules: {
        bannername: [
          { required: true, message: '请填写标题', trigger: 'blur' },
          { max: 50, message: '最多可输入50个字符', trigger: 'blur' }
        ],
        bannerlogo: {
          required: true,
          message: '请上传图片',
          trigger: 'change'
        },
        appview: { required: true }
      },
      baseUrl: '/ovu-base/uploadImg',
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
        bannername: '',
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
      this.form = { bannerlogo: '', appview: 1 };
    },
    handleCreate() {
      this.resetTemp();
      this.getCourse();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.loading = false;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    },
    getCourse() {
      getCourseListNoPage({
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10000000
      }).then(res => {
        this.courseList = res.data.data || [];
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
      this.getCourse();
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
            this.$notify({
              title: 'Success',
              message: '删除成功!',
              type: 'success',
              duration: 2000
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    handleAvatarSuccess(res, file) {
      this.form.bannerlogo = res.urls;
      this.$set(this.form, 'bannerlogo', res.urls);
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
        if (this.width - 0 > 990) {
          $this.imgWidth = 1000; // 如果图片宽度大于990 那么容器的宽度为1000 等比缩放
          $this.imgHeight = (1000 / this.width) * this.height;
        } else {
          $this.imgWidth = 990;
          $this.imgHeight = this.height;
        }
        if ($this.imgHeight < 396) {
          $this.imgHeight = 396;
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
      this.form.bannerlogo = data;
    },

    removeImg(eve) {
      eve.stopPropagation();
      this.form.bannerlogo = '';
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
    sort(index, flag) {
      var params = { bannerId1: this.list[index].id };
      if (flag == 'top') {
        params.bannerId2 = this.list[index - 1].id;
      } else {
        params.bannerId2 = this.list[index + 1].id;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
  margin-bottom: -15px;
  position: relative;
  object-fit: fill;
}
</style>
