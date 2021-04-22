<template>
  <div class="date-search" @click="prevent">
    <el-popover placement="bottom" trigger="click" v-model="visible">
      <el-date-picker v-model="input" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
      </el-date-picker>
      <div style="text-align: right; margin-top: 10px;">
        <el-button size="mini" type="text" @click="input = '';search()">重置</el-button>
        <el-button type="primary" size="mini" @click="search">确定</el-button>
      </div>
      <i class="el-icon-arrow-down el-icon--right" slot="reference"></i>
    </el-popover>
  </div>
</template>
<script>
  export default {
    name: "DateSearch",
    props: ["target"],
    data() {
      return {
        input: "",
        visible: false
      }
    },
    watch: {},
    methods: {
      search(state) {
        let param = Object.assign({}, {
          input: this.input
        }, this.target)
        this.$emit("inputClick", param)
        this.visible = false;
      },
      prevent(e) {
        e.stopPropagation()
      }
    },
  };

</script>
<style lang="scss" scoped>
  .date-search {
    display: inline-block;
  }

</style>
