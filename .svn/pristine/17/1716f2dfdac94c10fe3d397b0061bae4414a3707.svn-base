<template>
  <section
    class="app-main"
    :class="[
      this.$route.meta.level ? 'app-main-child': 'app-main-nochild',
      tagsView ? 'app-main-tagView': 'app-main-noTagView',
      isNavMenu ? 'has-nav-menu' : '',
      key.indexOf('home') !== -1 || key.includes('customer') ? 'noneTopMenu' : ''
    ]"
  >
    <tags-view v-if="tagsView" />
    <navmenu v-if="isNavMenu" />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Navmenu from '@/components/TopNavMenu';
import TagsView from './TagsView';
import { mapGetters } from 'vuex';

export default {
  name: 'AppMain',
  components: {
    Navmenu,
    TagsView
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'tagsView'
    ]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
    isState() {
      return this.$store.getters['settings/getIsState'] === 'true';
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    isNavMenu() {
      return this.key.indexOf('home') === -1 && !this.key.includes('customer') && !this.key.includes('industry') && this.isState;
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-main-tagView {
    /deep/ .filter-container {
      height: 100%;
    }
    /deep/ .app-container {
      height: calc(100vh - 85px);
    }
  }
  .app-main-noTagView {
    /deep/ .app-container {
      height: calc(100vh - 39px);
    }
  }
  .has-nav-menu {
    &.app-main-tagView {
      /deep/ .app-container {
        height: calc(100vh - 176px);
      }
    }
    &.app-main-noTagView {
      /deep/ .app-container {
        height: calc(100vh - 130px);
      }
    }
  }
.app-main {
  /*position: fixed;*/
  /*top: 50px;*/
  /*right: 0;*/
  /*bottom: 0;*/
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 50px);
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .fixed-header+.app-main {
    padding-top: 84px;
  }
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
