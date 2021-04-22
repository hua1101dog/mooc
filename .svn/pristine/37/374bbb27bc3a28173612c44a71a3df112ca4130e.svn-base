<template>
  <div style="width: 100%;height:100%;">
    <iframe
      v-if="equipmentId"
      :ref="iframeRef"
      class="iframe-video"
      @readystatechange ="onload"
      @load ="onload"
      :src="'/static/component/videoPlay.html?equipmentId='+equipmentId"
      style="width: 100%;height: 100%"
    ></iframe>
  </div>
</template>
<script>
export default {
  props: {
    equipmentId: [String, Number]
  },
  data() {
    return {
      showVideo: false,
    };
  },
  computed: {
    iframeRef() {
      return `iframe-${this.equipmentId}`
    }
  },
  beforeDestroy() {
    this.$store.dispatch('settings/destroyVideo');
  },
  methods: {
    onload() {
      if (this.$refs[this.iframeRef]) {
        console.log('添加新video-------------------------------------------------------');
        this.$store.dispatch('settings/addVideos', this.$refs[this.iframeRef]);
      }
    }
  }
};
</script>
<style>
</style>
