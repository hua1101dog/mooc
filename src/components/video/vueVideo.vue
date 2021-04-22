<template>
    <div class="vue-video">
        <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            @play="onPlayerPlay"
            @ended="ended"
            autoPlay
            :options="playerOptions"
            @statechanged="playerStateChanged($event)">
        ></video-player>
    </div>
</template>

<script>
export default {
    name:'vueVideo',
    props:['url'],
    data(){
      return {}
    },
    mounted(){
        // this.playerOptions.sources[0].src = this.url
        this.$refs.videoPlayer.player.on('error',function(){
            console.log('捕捉错误信息')
        })
    },
    // props:['code'],
    // watch:{
    //     url(old,val){
    //         this.playerOptions.sources[0].src=val
    //     }
    // },
    computed: {
      playerOptions() {
       return {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: true, //true回放。
                muted: false, // 消除声音
                // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时player按比例缩放以适应其容器。
                sources: [{
                    type:"application/x-mpegURL",
                    // src:'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'
                    src: this.url
                }],
                // poster: "../../static/images/test.jpg", //封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    // durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            };
      },
      player() {
          return this.$refs.videoPlayer.player
      }
    },
    methods:{
        //监听播放器播放状态
        playerStateChanged(playerCurrentState) {
            // if(!playerCurrentState.timeupdate){
            //     console.log('player current update state', playerCurrentState)
            // }
        },
        onPlayerCanplay(player) {
            console.log('player Canplay!', player)
        },
        ended() {
            console.log('移除')
        },
        onPlayerPlay(player) {
            console.log("点击play");
        },
        onPlayerPause(player){
            console.log("点击pause")
        }
    }
}
</script>

<style lang="scss" scoped>

.vue-video{
    .video-js .vjs-icon-placeholder {
        width: 100%;
        height: 100%;
    }
}
</style>
