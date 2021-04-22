<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logoNoText"
          :src="logoNoText"
          class="sidebar-logo collapse-logo"
          style="width: 32px; height: 32px; margin-left: 10px; margin-top: 10px;"
        />
        <!-- <h1 v-else class="sidebar-title">{{ title }} </h1> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logoUrl" class="sidebar-logo" />
        <!-- <h1 class="sidebar-title">{{ title }} </h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from "@/assets/images/logn_new.png";
import logoWhite from "@/assets/images/logo-white.png";
import logoNoText from "@/assets/images/logoNoText.png";

export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean
      // required: true
    }
  },
  data() {
    return {
      title: "OVU",
      logo: logoImg,
      logoNoText
    };
  },
  computed: {
    logoUrl() {
      return this.$store.getters["settings/getTheme"] === "light"
        ? logoImg
        : logoWhite;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  /*width: 100%;*/
  /*height: 100px;*/
  /*line-height: 50px;*/
  /*  background: $menuBg;*/
  overflow: hidden;

  & .sidebar-logo-link {
    /*height: 100%;*/
    /*width: 100%;*/

    & .sidebar-logo {
      width: auto;
      height: 30px;
      margin-left: 24px;
      /*margin-top: 16px*/
    }
    .collapse-logo {
      margin-left: 7px;
      /*margin-top: 5px;*/
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      /*line-height: 50px;*/
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
