<template>
  <div class="v-transfer">
    <div class="v-transfer_left">
      <div class="box-header align-center justify-bettween">
        <div>选择功能：</div>
        <div>
          <el-link type="primary">全部选择</el-link>
        </div>
      </div>
      <div class="v-transfer-content">
        <div class="v-transfer-content-bar">
          <el-input v-model="searchKey" placeholder="请输入功能名称" clearable @change="filterData" />
        </div>
        <div v-loading="loading" class="v-transfer-content__list">
          <div v-for="item in optionalData" :key="item.id" :class="['v-transfer-content__item', item.checked && 'checked']" @click="handleSelect(item)">
            <i v-if="item.checked" class="el-icon-check font-level-4" />
            <div class="title"><slot /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="v-transfer_middle">
      <div><i class="el-icon-arrow-left" /></div>
      <div><i class="el-icon-arrow-right" /></div>
    </div>
    <div class="v-transfer_right">
      <div class="align-center justify-bettween">
        <div>已选功能：</div>
        <div>
          <el-link type="primary">全部删除</el-link>
        </div>
      </div>
      <div class="v-transfer-content">
        <div class="v-transfer-content__list">
          <div v-for="(item, index) in selectedList" :key="item.id" class="v-transfer-content__item no-checked">
            <i v-if="!item.isNecessary" class="el-icon-close font-level-4" @click="deleteRow(item, index)" />
            <div class="title"><slot /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTransfer',
  data() {
    return {
      optionalData: [],
      selectedData: []
    };
  },
  methods: {
    filterData() {},
    deleteRow() {},
    handleSelect() {}
  }
};
</script>

<style lang="scss" scoped>
.v-transfer {
  display: flex;
  justify-content: stretch;
}
.v-transfer_left {
  flex: 0 0 45%;
}
.v-transfer_middle {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  [class^='el-icon-'] {
    display: block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ecedee;
    margin-bottom: 5px;
  }
}
.v-transfer_right {
  flex: 0 0 45%;
}
.v-transfer-content {
  margin-top: 10px;
  width: 100%;
  height: 360px;
  border: 1px solid #d7d8d9;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.v-transfer-content-bar {
  padding: 16px 12px;
}
.v-transfer-content__list {
  padding: 0px 12px;
  flex: 1 1 auto;
  overflow: auto;
  padding: 0 16px;
}
.v-transfer-content__item {
  text-align: left;
  padding: 8px 0 8px 24px;
  position: relative;
  .el-icon-check {
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    color: #67C23A;
    font-weight: bold;
  }
  .el-icon-close {
    position: absolute;
    top: 50%;
    right: 3px;
    transform: translateY(-50%);
    font-weight: bold;
  }
  &.no-checked {
    padding-left: 8px;
  }
  cursor: pointer;
  &.checked,
  &:hover {
    background-color: #f5f6fa;
  }
  .title {
    height: 24px;
    margin-bottom: 2px;
  }
  span {
    color: #9b9ea0;
  }
}
</style>
