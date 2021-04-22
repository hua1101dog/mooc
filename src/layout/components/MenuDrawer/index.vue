<template>
  <div ref="drawer">
    <div :class="['menu-drawer', visible ? 'show' : '']">
      <el-button
        type="text"
        icon="el-icon-close"
        class="close-btn"
        @click="close"
      />
      <div class="search-bar">
        <el-input
          v-model="key"
          prefix-icon="el-icon-search"
          placeholder="请输入关键字"
          style="width:80%;"
        />
      </div>
      <div class="drawer-content">
        <div
          v-for="(menus, index) in searchMenuList"
          :key="index"
          class="drawer-content_item"
        >
          <div v-for="menu in menus.children" :key="menu.id">
            <h4
              class="child-title background-hover-color-3"
              @click="setAllSelected(menu.children)"
            >
              <span>{{ menu.meta && menu.meta.title }}</span>
              <i
                v-if="hasAllSelected(menu.children)"
                class="fa fa-check-square"
              />
              <i v-else class="fa fa-square-o" />
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div v-show="visible" class="drawer-wrapper" @click="close"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router, { getRouterList } from "@/router";
export default {
  name: "MenuDrawer",
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      wrapper: null,
      menuList: [[], [], []],
      searchMenuList: [],
      menuListIndex: 0,
      key: ""
    };
  },

  watch: {
    visible() {
      this.key = "";
      console.log(this.searchMenuList);
    },
    key(val) {
      let menuList = [];
      console.log(this.menuList);
      if (val) {
        // 生成过滤的菜单
        for (let k = 0; k < this.menuList.length; k++) {
          const data = this.menuList[k];
          menuList[k] = [];
          for (let j = 0; j < data.length; j++) {
            menuList[k][j] = Object.assign({}, data[j], { children: [] });
            const children = data[j].children;
            for (let i = 0; i < children.length; i++) {
              if (children[i].meta.title.includes(val)) {
                menuList[k][j].children.push(children[i]);
              }
            }
            if (!menuList[k][j].children.length) {
              menuList[k].splice(j, 1);
            }
            if (!menuList[k].length) {
              menuList.splice(k, 1);
            }
          }
        }
      } else {
        menuList = this.menuList;
      }
      this.searchMenuList = menuList;
    },
    
  },
  methods: {
    // 是否全选了
    hasAllSelected(children = []) {
      return children.every(data => data.meta.checked);
    },
    // 设置checked
    setChecked(item, isChecked = "empty") {
      for (let k = 0; k < this.menuList.length; k++) {
        const data = this.menuList[k];
        for (let j = 0; j < data.length; j++) {
          const children = data[j].children;
          const value = children.find(val => val.path === item.path);
          if (value)
            this.$set(
              value.meta,
              "checked",
              isChecked === "empty" ? !value.meta.checked : isChecked
            );
        }
      }
    },
    // 设置全选
    setAllSelected(children = []) {
      const isChecked = this.hasAllSelected(children);
      for (const data of children) {
        this.setChecked(data, !isChecked);
        data.meta.checked = !isChecked;
      }
    },
    toggleCheck(item) {
      this.setChecked(item);
      this.$store.commit("permission/SET_ROUTES", this.add_routes);
    },
    setMenu(data) {
      const menus = this.getValidMenu(data);
      for (const val of menus) {
        this.menuList[this.menuListIndex % 3].push(val);
        this.menuListIndex++;
        // if (val.children && val.children.length) this.setMenu(val.children);
      }
      this.searchMenuList = this.menuList;
    },
    getValidMenu(data) {
      return data.filter(val => {
        return !val.hidden && this.hasOneShowingChild(val);
      });
    },
    hasOneShowingChild(data) {
      const children = data.children ? data.children : [];
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      return showingChildren.length >= 0 || data.alwaysShow;
    },
    close() {
      this.$store.commit("app/CHANGE_DRAWER", false);
    }
  },
  created() {
    this.searchMenuList = getRouterList().filter(item => !item.hidden);
  }
};
</script>

<style scoped lang="scss">
.drawer-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1998;
  background: transparent;
}
.child-title {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  i {
    display: none;
  }
  &:hover {
    i {
      display: inline-block;
    }
  }
}
.child-menu {
  .child-menu_item {
    a {
      display: flex !important;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i {
        display: none;
        &.text-color-5 {
          display: inline-block;
        }
      }
      &:hover {
        i {
          display: inline-block;
        }
      }
    }
  }
}
.search-bar {
  margin-bottom: 10px;
}
.drawer-content {
  height: calc(100% - 42px);
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  .drawer-content_item {
    flex: 0 1 33.3333%;
    margin-right: 10px;
  }
}
.close-btn {
  position: absolute;
  right: 5px;
  top: 2px;
  font-size: 20px;
}
.menu-drawer {
  position: fixed;
  z-index: 999;
  top: 50px;
  left: -1008px;
  bottom: 0;
  padding: 40px 30px 0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  width: 800px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  &.show {
    left: 208px;
    z-index: 1999;
  }
}
</style>
