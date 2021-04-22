<template>
  <el-link type="primary" class="v-copy" @click="copy">{{ text }}</el-link>
</template>

<script>
export default {
  name: 'VCopy',
  props: {
    text: {
      default: '复制',
      type: [String, Number]
    },
    content: {
      default: '',
      type: [String, Number]
    }
  },
  methods: {
    copy() {
      const input = document.createElement('input');
      input.setAttribute('value', this.content);
      input.style = { width: 0, height: 0 };
      document.body.appendChild(input);
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$message.success('复制成功');
      }
      document.body.removeChild(input);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
