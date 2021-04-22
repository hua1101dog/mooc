<template>
  <div :class="{ 'has-logo': showLogo }">
    <div
      v-show="!isCollapse"
      class="system-title font-level-3"
      @click="$store.commit('app/CHANGE_DRAWER', !menuDrawer)"
    >
      <div>慕课</div>
      <div>
        <i class="el-icon-arrow-right" />
      </div>
    </div>

    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :style="{ top: isCollapse ? '0' : '60px' }"
    >
      <el-menu
        style="padding: 5px 0;"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menuList"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />

        <!--        <sidebar-item :item="route" />-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import AppLink from "./Link";
import Item from "./Item";
import router, { getRouterList } from "@/router";
export default {
  components: { SidebarItem, Logo, AppLink, Item },
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "platform", "sidebar", "menuDrawer"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  created() {
    this.menuList = getRouterList();
  }
};
</script>

<style lang="scss" scoped>
.system-title {
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  border-bottom: 1px solid;
  font-weight: 700;
  justify-content: space-between;
  padding: 0 16px;
  cursor: pointer;
}
/deep/ {
  .el-submenu__title [class^="icon-"],
  .el-menu-item [class^="icon-"] {
    padding-right: 20px;
    .icon-equipment-1:before {
      font-size: 13px;
    }
  }
  .el-submenu__title,
  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  .el-submenu__icon-arrow {
    font-size: 16px;
  }
  // .el-submenu {
  //   &:before {
  //     margin: 4px auto;
  //     content: "";
  //     width: 178px;
  //     height: 1px;
  //     background: #DEDEDE;
  //     display: table;
  //   }
  // }
}
</style>
