<template>
  <div class="newStep_m" :class="{ noLevelThree: $route.meta.level !== 3 }">
    <div v-for="(route, index) in childrenRoutes" :key="route.path">
      <div class="row" v-if="route.children && firstPath === route.path" >
        <span v-if="route.meta.type === '1'" :class="['prefix', { 'active': firstPath===route.path}]">{{ index + 1}}</span>
        <label
          :class="{ 'act': firstPath===route.path, order: route.meta.type === '1', noFlow: route.meta.type !== '1' }">
          {{ route.meta.title }}
        </label>
        <div v-if="route.meta.type === '1' && index !== childrenRoutes.length - 1" class="ellipsis">·················</div>
        <div class="tab-list" v-if="route.children.length">
          <el-tabs v-model="currentPath" @tab-click="handleClick">
            <el-tab-pane
              v-for="node in route.children"
              :key="node.path"
              :label="node.meta.title"
              :name="route.path + '/' + node.path"
            />
          </el-tabs>
        </div>
      </div>
      <div v-else-if="route.hide"></div>
      <div v-else @click="nextPage(route)" class="row">
        <span v-if="route.meta.type === '1'" :class="['prefix', { 'active':firstPath===route.path}]">{{ index + 1}}</span>
        <label
          :class="{'act':firstPath===route.path, order: route.meta.type === '1', noFlow: route.meta.type !== '1'}">
          {{ route.meta.title }}
        </label>
        <div v-if="route.meta.type === '1' && index !== childrenRoutes.length - 1" class="ellipsis">·················</div>
      </div>
    </div>
  </div>
</template>
<script>
import path from 'path'
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
export default {
  name: "TopNavMenu",
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  data() {
    this.onlyOneChild = null
    return {
      childrenRoutes: [],
      basePath: '',
      firstPath: '',
      currentPath: ''
    }  
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getCurrentStep()
    }
  },
  mounted() {
    this.getCurrentStep()
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    nextPage(route) {
      let path = ''
      // 判断是否有儿子节点
      if (route.children && route.children.length > 0 ) {
        path = this.resolvePath(route.path + '/' + route.children[0].path)
      } else {
        path = this.resolvePath(route.path)
      }
      this.$router.push(path)
    },
    // 获取当前路由
    getCurrentStep() {
      // 初始化数据
      const currentRout = this.permission_routes.find(item => {
        if (item.path !== '/' && this.$route.path.indexOf(item.path) === 0 ) {
          return true
        }
      })
      if (currentRout) {
        this.basePath = currentRout.path
        const leftPath = this.$route.path.replace(this.basePath + '/', '')
        const index = leftPath.indexOf('/')
        if (index > -1) {
          this.firstPath = leftPath.substring(0,index)
          this.currentPath = leftPath
        } else {
          this.firstPath = leftPath
          this.currentPath = ''
        }
        this.childrenRoutes = currentRout.children
      }
    },
    handleClick(tab, event) {
      const path = this.resolvePath(tab.name)
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.row {
  display: flex;
  align-items: center;
}
.ellipsis {
  margin-right: 10px;
}
.prefix {
  height: 26px;
  line-height: 26px;
  background: #999999;
  width: 26px;
  color: #fff;
  border-radius: 50%;
  &.active {
    background: rgba(232,123,15,1);
  }
}
.newStep_m {
  position: relative;
  padding: 10px 0 50px 14px;
  height: 91px;
  flex: 0 0 auto;
  min-width: 1000px;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  z-index: 1000;
  border-top: 1px solid;
  border-bottom: 1px solid;
  &.noLevelThree {
    padding-bottom: 10px;
    height: 52px;
  }
}
.newStep_m a {
  float: left;
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  border-radius: 17.5px;
  text-align: center;
  border: 1px solid #bebdbd;
  color: #bebdbd;
}
.newStep_m label {
  font-weight: 400;
  float: left;
  font-size: 14px;
  margin: 0 10px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding: 0 24px;
  cursor: pointer;
  &.order {
    padding: 0 !important;
  }
}
.newStep_m a.act {
  color: #fff;
  font-weight: 800;
  border: 0;
}
.newStep_m label.act {
  color: #fff;
  border-radius: 15px;
  font-weight: 700;
  &.noFlow {
    background-color: #E87B0F;
  }
  &.order {
    color: rgba(232,123,15,1);
    padding: 0 !important;
  }
}

.newStep_m .heng-xian {
  float: left;
  margin: 0px 20px;
  width:  calc(20% - 150px);
  border-top: 1px solid #999;
}
.newStep_m .jin-tou {
  float: left;
  margin-left: -25px;
  margin-top: 12px;
}
.tab-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 51px;
  padding-left: 24px;
  border-top-width: 1px;
  border-top-style: solid;
}
/deep/.el-tabs__header {
  margin-bottom: 0px;
}
/deep/.el-tabs__item.is-active {
  font-weight: 600;
}
/deep/.el-tabs__nav-wrap::after {
  display: none;
}
</style>
