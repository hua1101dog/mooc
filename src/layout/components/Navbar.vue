<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <logo />
      <!-- <project-tree v-show="!global" /> -->
    </div>
    <!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->
    <!--	<div  style="text-algin:center;font-size: 30px;float:left;transform:translate(-50%,-50%);position:absolute;top:50%;left:50%; color:#fff">{{ '园区态势数字化管理平台' }}</div>    -->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" style="margin-right: 15px;" />
        <!--        <div class="right-menu-item">{{ date }}</div>-->
        <div
          class="right-menu-item hover-effect font-level-3"
          @click="toggleTagView"
        >
          <i class="fa fa-ellipsis-h" />
        </div>
        <div class="right-menu-item hover-effect">
          <i
            v-if="theme === 'dark'"
            class="fa fa-sun-o font-level-3"
            @click.prevent="changeTheme('light')"
          />
          <i
            v-else
            class="iconfont icon-moon font-level-3"
            @click.prevent="changeTheme('dark')"
          />
        </div>
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
        <size-select class="right-menu-item hover-effect" />
        <screen-full id="screenfull" class="right-menu-item hover-effect" />
        <!--        <img :src="avatar + '?imageView2/1/w/80/h/81'" class="user-avatar">-->
        <span class="right-menu-item hover-effect">{{ name }}</span>
      </template>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link right-menu-item hover-effect">
          <i class="fa fa-ellipsis-v font-level-3"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import Breadcrumb from '@/components/Breadcrumb';
// import ProjectTree from '@/components/ProjectTree';
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import ScreenFull from "@/components/Screenfull";
import Search from "@/components/HeaderSearch";
import SizeSelect from "@/components/SizeSelect";
import moment from "moment";
import Logo from "./Sidebar/Logo";
moment.locale("zh-cn");

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    ErrorLog,
    ScreenFull,
    Search,
    // ProjectTree,
    Logo,
    SizeSelect
  },
  computed: {
    ...mapGetters({
      name: "name",
      sidebar: "sidebar",
      avatar: "avatar",
      device: "device",
      theme: "settings/getTheme",
      tagsView: "tagsView",
      global: "global"
    }),
    date() {
      return moment().format(`YYYY年MM月DD日 a h:mm`);
    }
  },
  methods: {
    toggleTagView() {
      this.$store.commit("settings/CHANGE_SETTING", {
        key: "tagsView",
        value: !this.tagsView
      });
    },
    ...mapMutations({
      changeTheme: "settings/changeTheme"
    }),
    toggleSideBar() {
      console.log(this.$store);
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-menu {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .hamburger-container {
    /*padding-left:20px!important;*/
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      margin-right: 15px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .user-avatar {
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .nameText {
      margin: 0 15px;
      vertical-align: text-bottom;
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        /*margin-top: 5px;*/
        position: relative;
        .el-icon-caret-bottom {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
