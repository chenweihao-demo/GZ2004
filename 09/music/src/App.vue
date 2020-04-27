<template>
  <div id="app" @touchstart="touchstart" @touchend="touchend">
    <!-- 一级路由出口 -->
    <keep-alive>
      <router-view @tanslate-song-id="currentSongId = $event"></router-view>
    </keep-alive>

    <!-- 播放器 -->
    <audio v-if="currentSongUrl" :src="currentSongUrl" controls autoplay style="height:36px"></audio>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      currentSongId: "",
      touchstartX: 0
    };
  },
  computed: {
    currentSongUrl: function() {
      return `https://music.163.com/song/media/outer/url?id=${this.currentSongId}.mp3`;
    }
  },

  methods: {
    touchstart: function(event) {
      // console.log("开始", event.changedTouches[0].clientX);
      this.touchstartX = event.changedTouches[0].clientX;
      this.touchstartY = event.changedTouches[0].clientY;
    },
    touchend: function(event) {
      // console.log("结束", event.changedTouches[0].clientX);

      // 判断左滑动 返回上一页
      if (event.changedTouches[0].clientX - this.touchstartX > 50) {
        console.log("从左到右");
        this.touchstartX = 0;
        this.touchstartY = 0;
        this.routerBack();
      }
    },
    routerBack: function() {
      this.$router.back();
    }
  },
  watch: {
    // 当前播放id变化
    currentSongId: function() {}
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
