<template>
  <div class="app-container">
    <el-tabs type="card">
      <el-tab-pane label="课程列表"><List /> </el-tab-pane>
      <el-tab-pane label="课程分类"><Classify /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { findPage } from '@/api/mooc/course';

import waves from '@/directive/waves'; // waves directive

import List from './components/list';
import Classify from './components/classify';
export default {
  components: { List, Classify },
  directives: { waves },
  data() {
    return {};
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
/deep/ .el-tabs__content{
  height: calc(100% - 50px);
}
/deep/ .el-tabs,
/deep/ .el-tab-pane
{
  height: 100%;
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
  object-fit: none;
}
.app-container {
  height: 100%;
}
</style>
