<template>
    <div class="hls-video">
        <video id="video" class="video-js vjs-default-skin" controls preload="none" data-setup='{}'>
            <source src="" type="application/x-mpegURL">
        </video>
    </div>
</template>

<script>
export default {
    name:'hlsVideo',
    props:['url'],
    data(){
        return {
        }
    },
    mounted(){
        var player = videojs('video');
            player.ready(function() {
                var myPlayer = this;
                myPlayer.src(this.url);
                myPlayer.load(this.url);
                myPlayer.play();
            });
    },
    computed: {
       
    },
    methods:{
     
    }
}
</script>

<style lang="scss" scoped>
.hls-video{
    width: 100%; height: 100%;
}
#video{
    width: 100%; height: 100%;
}
</style>