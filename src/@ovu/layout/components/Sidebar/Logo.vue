<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <router-link name="sidebarLogoFade" to="/home">
      <img
        v-if="collapse"
        :src="logoNoText"
        class="sidebar-logo collapse-logo"
        style="width: 32px; height: 32px; margin-left: 10px; margin-top: 10px;"
      >
      <img v-else key="expand" :src="logo" class="sidebar-logo">
    </router-link>
  </div>
</template>

<script>
import logoImg from "@/assets/images/logn_new.png";
// import logoWhite from '@/assets/logo/logo-white.png';
import logoNoText from '@/assets/logo/logoNoText.png';

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean
    }
  },
  data() {
    return {
      title: 'OVU',
      logo: logoImg,
      logoNoText
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  padding-left: 24px;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    height: 30px;
    vertical-align: middle;
    margin-right: 12px;
  }

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
