<template>
  <div>
    <el-form ref="form" label-width="120px" style="margin-top:15px">
      <div>
        <el-row :gutter="20">
          <el-col v-for="(item, i) in teachers" :key="item.id" :span="8">
            <el-card class="box-card teacher_card">
              <div class="inline-block">
                <img
                  v-if="item.icon"
                  style=" width: 50px;
               display: inline-block;
             height: 40px;"
                  :src="processImgUrl(item.icon)"
                >
                <img
                  v-if="!item.icon"
                  style=" wwidth: 50px;
            display: inline-block;
    height: 40px;"
                  src="@/assets/images/demo-circle.png"
                >
              </div>
              <div class="inline-block">
                <span class="teacher_name">{{ item.teachername }}</span>

                <el-checkbox
                  v-model="item.isShow"
                  class="teacher_checkbox"
                  @change="checkedShow"
                  @click.native="handleClick(item)"
                />
                <span>显示</span>
                <span
                  class="el-icon-close delete_teacher"
                  @click="deleteTeacher(item)"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-select
        v-model="value"
        filterable
        placeholder="输入讲师名称/下拉框选择"
        value-key="id"
        no-match-text="无此讲师"
        style="width: 235px;"
      >
        <el-option
          v-for="item in teacher"
          :key="item.id"
          :label="item.teachername"
          :value="item"
        />
      </el-select>
      <el-button
        style="    vertical-align: top;
       margin-left: 3px;"
        @click="chooseTeacher(value)"
      >添加</el-button>
    </el-form>

    <div class="dialog-footer text-left" style="margin-top: 20px;">
      <el-button @click="$router.push('/coursePage/index')">取消</el-button>
      <el-button type="primary" @click="updateData()">确认</el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'; // waves directive
import {
  findMoocteacherPage,
  editTeacherRow,
  getChooseTeacher
} from '@/api/mooc/course';

export default {
  directives: { waves },
  props: ['courseid'],
  data() {
    return {
      teacher: [],
      value: '',
      teachers: [],
      form: {},
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 100000
      }
    };
  },

  mounted: function() {},
  created() {
    // 获取已选讲师
    // courseid
    getChooseTeacher({ courseId: this.courseid }).then(res => {
      if (res.data && res.data.length) {
        res.data.length &&
          res.data.forEach(value => {
            if (value.show == 1) {
              value.isShow = true;
            } else {
              value.isShow = false;
            }
            this.teachers.push({
              teacherId: value.id,
              teachername: value.teachername,
              isShow: value.isShow,
              icon: value.icon
            });
          });
      }
    });
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      findMoocteacherPage(this.listQuery).then(response => {
        this.teacher = response.data.data;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
    },
    updateData() {
      var arr = [];
      this.teachers.length &&
        this.teachers.forEach(v => {
          if (v.isShow) {
            v.show = '1';
          } else {
            v.show = '0';
          }
          arr.push({ teacherId: v.teacherId, show: v.show });
        });
      var params = {
        courseId: this.courseid,
        teachers: arr
      };

      editTeacherRow(params).then(res => {
        if (res.code == 0) {
          this.$message.success('提交成功');
        }
      });
    },
    checkedShow(item) {},
    handleClick(item) {
      if (!item.isShow) {
        // 已经被选中了
        // 当前item 被选中了 ，那么其他的必须取消选中
        this.teachers.length &&
          this.teachers.forEach(v => {
            v.isShow = false;
          });
      }
    },
    chooseTeacher(value) {
      if (!value) {
        this.$message.error('请选择讲师');
        return;
      }
      const teacherIds = this.teachers.map(data => data.teacherId);
      var flag = true;
      this.teachers.length &&
        this.teachers.forEach(v => {
          if (v.isShow) {
            flag = false;
          }
        });
      if (!teacherIds.includes(value.id)) {
        this.teachers.push({
          teacherId: value.id,
          teachername: value.teachername,
          isShow: flag,
          icon: value.icon
        });
      } else {
        this.$message.error('该讲师已添加');
      }
    },

    deleteTeacher(item) {
      this.teachers.splice(this.teachers.indexOf(item), 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  vertical-align: middle;
}
.teacher_name {
  margin-left: 30px;
  font-weight: 700;
}
.teacher_checkbox {
  margin-left: 30px;
  margin-right: 5px;
}
.delete_teacher {
  font-size: 18px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.teacher_card {
  position: relative;
  margin-bottom: 15px;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #e87b0f;
  border-color: #e87b0f;
  border-radius: 50%;
}
/deep/ .el-checkbox__inner {
  border-radius: 50%;
}
</style>
