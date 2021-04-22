<template>
  <div :class="['header-search', !show || 'show']">
<!--    <i class="el-icon-bell search-icon" @click.stop="click" />-->
<!--    <svg-icon icon-class="search-2" @click.stop="click" />-->
    <i class="fa fa-search font-level-2" @click.stop="click"></i>
    <el-select
      v-show="show"
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="搜索菜单"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    click() {
      this.show = !this.show;
      if (this.show) {
        this.$nextTick(() => {
          this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
        });
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
      this.options = []
      this.show = false
    },
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) { continue }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "~@/styles/variables.scss";
.header-search {
  margin-left: 150px;
  border-radius: 0;
  vertical-align: middle;
  height: 32px;
  position: relative;
  padding-left: 10px;
  display: flex;
  width: 30px;
  transition: width 0.2s;
  &.show {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    border: 1px solid rgb(255, 106, 0);
    width: 200px;
  }
  .search-icon {
    cursor: pointer;
    vertical-align: middle;
    color: $topTextColor;
  }
  .fa {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .header-search-select {
    font-size: 12px;
    transition: width 0.2s;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    /deep/ {
      .el-input__inner {
        border: 0;
        height: 29px;
        line-height: 32px;
        font-size: 12px;
        color: rgb(51, 51, 51);
        padding-left: 5px;
      }
      .is-focus {
        .el-input__inner {
          border-color: rgb(255, 106, 0);
        }
      }
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
