<template>
  <div>
    <div v-if="index==curItabItem">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['setiTabItems'],
    props: ['title', 'index'],
    data() {
      return {
        curItabItem: ''
      }
    },
    created() {
      this.setiTabItems(this.title,this.index,this)
    }
  }
</script>

<style scoped>

</style>
