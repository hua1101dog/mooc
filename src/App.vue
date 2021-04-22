<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserPhoneToken } from "@/api/user";
import { getUserId } from "@/utils/auth";
import { sessionSetRoute, sessionIsRoute } from "@/utils";
export default {
  name: "App",
  provide() {
    return {
      reload: () => {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
      }
    };
  },
  data() {
    return {
      isCalling: false,
      isRouterAlive: true
    };
  },
  computed: {
    ...mapGetters({
      theme: "settings/getTheme",
      size: "size"
    }),
    themeClass() {
      return `theme--${this.theme}`;
    },
    sizeClass() {
      return `size--${this.size}`;
    }
  },
  watch: {
    theme: {
      immediate: true,
      handler() {
        this.setBodyClass();
      }
    },
    size: {
      immediate: true,
      handler() {
        this.setBodyClass();
      }
    },
    $route: {
      handler: function(val, oldVal) {
        sessionIsRoute(val.fullPath)
        sessionSetRoute(val.fullPath)
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.$store.dispatch("settings/setClientHeight");
    window.onresize = () => {
      this.$store.dispatch("settings/setClientHeight");
    };
     document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        //解决火狐拖拽时，打开了一个新的tab
  },
 
  methods: {
    setBodyClass() {
     
      document.body.className = `${this.themeClass} ${this.sizeClass}`;
    }
  }
};
</script>

<style >
  /* 滚动条样式 */
  ::-webkit-scrollbar{
    width: 8px;
    height: 6px;
      overflow-y: scroll;
scrollbar-color: transparent transparent;
scrollbar-track-color: transparent;
-ms-scrollbar-track-color: transparent;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 1em;
    background-color: rgba(50,50,50,.3);
  }
  ::-webkit-scrollbar-track{
    border-radius: 1em;
    background-color: rgba(50,50,50,.1);
  }

</style>
