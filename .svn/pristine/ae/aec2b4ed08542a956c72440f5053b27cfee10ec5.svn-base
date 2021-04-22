<template>
  <div class="video-player" :style="{ width: `${width}px`, height: `${height}px`}">
    <iframe
      v-if="url"
      :ref="id"
      class="iframe-video"
      @readystatechange ="onload"
      @load ="onload"
      allowfullscreen
      style="width: 100%; height: 100%"
      :src="`/static/component/ezuikitVideo.html${query}`"
    ></iframe>
    <div class="operator-box">
      <div class="action-bar">
        <div></div>
        <div>
          <a href="" class="font-level-1" @click.prevent="replay">监控</a>
          <a href="" class="font-level-1" @click.prevent="play">播放</a>
          <el-dropdown @command="selectDate">
          <span class="el-dropdown-link font-level-1">
            回放 <i class="el-icon-arrow-down el-icon--right" />
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="date in dates" :key="date.value" :command="date.value">
                {{ date.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VideoPlayer',
    props: {
      url: {
        type: String,
        default: 'ezopen://open.ys7.com/D56376241/2.live'
      },
      width: {
        default: 200,
        type: Number
      },
      height: {
        default: 200,
        type: Number
      },
      accessToken: {
        default: 'at.2b71yo4093ze3oo560d2p096bx5m8bdp-7av85oqdzf-0o92vyk-iaaxmikag',
        type: String
      },
      autoplay: Boolean
    },
    data() {
      return {
        instance: null,
        review: false
      };
    },
    computed: {
      id() {
        return `video-${this.getRandomCode(8)}`;
      },
      query() {
        return `?width=${this.width}&height=${this.height}&accessToken=${this.accessToken}&autoplay=${this.autoplay}&url=${this.url}`;
      },
      dates() {
        let date = new Date();
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let num = 3;
        let res = [];
        for (let i = 0; i < num; i++) {
          res.push({
            value: `${year}${month}${day - i}`,
            text: `${year}-${month}-${day - i}`
          })
        }
        return res;
      }
    },
    methods: {
      play() {
        this.$refs[this.id].contentWindow.play();
        // window.open(
        //   '/static/component/ezuikitVideo.html?' +
        //   'url=ezopen://open.ys7.com/D56376241/2.live&accessToken=at.2b71yo4093ze3oo560d2p096bx5m8bdp-7av85oqdzf-0o92vyk-iaaxmikag&autoplay=true&width=400&height=300',
        //   '_blank',
        //   'width=400; height=300;location=no;menubar=no&titlebar=no;left=100;top=100;'
        // );
      },
      replay() {
        this.$refs[this.id].contentWindow.replay();
      },
      selectDate(val) {
        this.review = true;
        this.$nextTick(() => {
          const date = val.replace(/-/g, '');
          this.$refs[this.id].contentWindow.review(date, date, 'ezopen://open.ys7.com/D39764798/1.rec');
        });
      },
      onload() {
        if (this.$refs[this.id]) {
          console.log('添加新video-------------------------------------------------------');
          this.$store.dispatch('settings/addVideos', this.$refs[this.id]);
        }
      },
      getRandomCode(length) {
        if (length > 0) {
          const data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
          let nums = "";
          for (let i = 0; i < length; i++) {
            const r = parseInt(Math.random() * 61);
            nums += data[r];
          }
          return nums;
        } else {
          return false;
        }
      }
    },
    beforeDestroy() {
      this.$store.dispatch('settings/destroyVideo');
    }
  }
</script>

<style lang="scss" scoped>
  .operator-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    .progress-bar {
      padding: 5px;
    }
    .action-bar {
      text-align: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      a,
      .el-dropdown {
        color: #fff;
        padding: 0 3px;
      }
    }
  }
  .video-player {
    width: 100%;
    position: relative;
  }
  .iframe-video {
     border: 0;
   }
</style>
