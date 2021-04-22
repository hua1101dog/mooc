<template>
  <div class="navbar align-center justify-between">
    <div class="left-menu align-center">
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <logo/>

     
    </div>

    <div class="right-menu align-center">
      <template v-if="device!=='mobile'">
        <header-search id="header-search" class="right-menu-item"/>
        <div class="right-menu-item hover-effect font-level-3" @click="toggleTagView">
          <i class="el-icon-more"/>
        </div>
        <div class="right-menu-item hover-effect">
          <i
            v-if="theme === 'dark'"
            class="iconfont icon-sun font-level-3"
            @click.prevent="changeTheme('light')"
          />
          <i v-else class="iconfont icon-moon font-level-3" @click.prevent="changeTheme('dark')"/>
        </div>
        <error-log class="errLog-container right-menu-item hover-effect"/>

        <screenfull id="screenfull" class="right-menu-item hover-effect"/>

        <el-tooltip content="全局尺寸" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect"/>
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <span class="right-menu-item hover-effect">{{ name }}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
import Logo from "./Sidebar/Logo";

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters({
      // name: "name",
      sidebar: "sidebar",
      avatar: "avatar",
      device: "device",
      tagsView: "tagsView",
      theme: "settings/getTheme",
    }),
    name(){
      // return JSON.parse(this.$store.state.user.roles.userInfo).username
      const userInfo =JSON.parse(this.$store.state.user.userInfo);
      if(userInfo){
        return userInfo.nickName
      }else {
        return ""
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    toggleTagView() {
      this.$store.dispatch("settings/changeSetting", {
        key: "tagsView",
        value: !this.tagsView
      });
    },
    ...mapMutations({
      'changeTheme': 'settings/changeTheme'
    }),
    changeTheme(data) {
      console.log(data)
      this.$store.dispatch("settings/changeTheme", data);
    },
    async logout() {
      await this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/@ovu/styles/variables.scss";

.navbar {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1001;

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
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
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
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        .el-icon-caret-bottom {
          cursor: pointer;
        }
      }
    }
  }
}
.justify-between{
  justify-content:space-between;
  align-items:center
}
</style>
