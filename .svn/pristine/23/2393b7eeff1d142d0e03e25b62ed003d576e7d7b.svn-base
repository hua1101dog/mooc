<template>
  <div class="v-tree-select">
    <el-popover
      v-model="visible"
      placement="bottom"
      :visible-arrow="false"
      :width="width"
      trigger="click"
    >
      <el-input
        slot="reference"
        v-model="currentValue"
        :style="{ width: `${width}px`}"
        :placeholder="placeTitle"
        :readonly="readonly"
        clearable
        :suffix-icon="visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        @clear="clear"
        @keyup.enter.native="hanldeSearch"
      />
      <div class="v-tree-select__list">
        <!-- <el-input
          v-model="key"
          style="margin-bottom: 10px;"
          prefix-icon="el-icon-search"
          placeholder="模糊搜索"
          @keyup.enter.native="hanldeSearch"
        /> -->
        <div :style="{ maxHeight: `${maxHeight}px`, overflow: 'auto' }">
          <el-tree
            ref="tree"
            :data="options"
            :props="defaultProps"
            highlight-current
            node-key="id"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          />
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'VTreeSelect',
  props: {
    width: {
      default: 300,
      type: Number
    },
    options: {
      default: () => [],
      type: Array
    },
    maxHeight: {
      default: 300,
      type: Number
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'mini'
    },
    placeTitle:{
      type: String,
      default:'请选择'
    },
    readonly:{
       type: Boolean,
       default:false
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'nodes',
          label: 'name'
        };
      }
    }
  },
  data() {
    return {
      currentValue: '',
      visible: false,
      key: ''
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.currentValue = val;
      }
    }
  },
  methods: {
    clear() {
      this.$emit('set-value', null);
    },
    hanldeSearch() {
      this.$refs.tree.filter(this.currentValue);
    },
    handleNodeClick(data) {
      this.visible = false;
      this.$emit('set-value', data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
