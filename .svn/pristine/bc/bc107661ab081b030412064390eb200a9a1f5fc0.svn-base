<template>
  <section class="app-main" :class="[
      this.$route.meta.level ? 'app-main-child': 'app-main-nochild'
    ]">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews" v-if="isRouterAlive">
        <router-view :key="key" v-if="isRouterAlive" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  provide(){
    return{
      reload:()=>{
        this.isRouterAlive=false  
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
      }
    }
  },
  name: 'AppMain',
  data(){
    return{
      isRouterAlive:true
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
 
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>