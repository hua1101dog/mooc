<template>
  <div class="navbar">
    <div class="left-menu">
      <logo />
      <img src="@/assets/images/u1325.png" alt style="margin-left:15px" />
    </div>

    <div class="right-menu">
      <template>
        <el-menu
          :default-active="$route.query.from || $route.path"
          router
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="/sharePlatHome">控制台</el-menu-item>
          <el-menu-item index="/industryIndex_tab">指数运营</el-menu-item>
          <el-menu-item index="/dataResources">数据资源</el-menu-item>
          <el-menu-item>
            <el-dropdown>
              <span class="el-dropdown-link">
                配置管理 ▼
              </span>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/applicationScenarios">
                <el-dropdown-item>场景应用</el-dropdown-item>
                </router-link>
                <router-link to="/index">
                <el-dropdown-item>指数体系</el-dropdown-item>
                </router-link>
                <router-link to="/rules">
                <el-dropdown-item>规则库</el-dropdown-item>
                </router-link>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
          <!-- <el-menu-item index="/personalWorkbench"> 工作台</el-menu-item> -->
        </el-menu>
        <el-dropdown>
          <span
            class="el-dropdown-link right-menu-item hover-effect"
            style="padding:0"
          >
            <img :src="avatar" class="user-avatar" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import Logo from "../Sidebar/Logo";

export default {
  components: {
    Logo
  },
  data() {
    return {};
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  },

  computed: {
    ...mapGetters({
      name: "name",

      avatar: "avatar"
    })
  },
  mounted() {
    console.log(this.$route.query.from);
  }
};
</script>

<style lang="scss" scoped>
.el-menu.el-menu--horizontal {
  border: 0;
}
.el-button--primary {
  background: #fff !important;
  border: 0;
}
.el-icon-arrow-down {
  color: #469af1;
  vertical-align: super;
}
.navbar {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
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
    padding: 0 20px;

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
      width: 50px;
      height: 50px;
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
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid rgba(45, 140, 240, 1);
    color: rgb(45, 140, 240);
  }
  .el-menu--horizontal > .el-menu-item {
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #515a6e;
    font-size: 14px !important;
  }
}
</style>
