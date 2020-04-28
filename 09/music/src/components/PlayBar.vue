<template>
  <div class="playbar">
    <!-- bottom -->
    <div class="playbarbottom" @click="showFullscreen=true">
      <img class="thumb" :class="{active: playing}" :src="currentSong.picUrl" alt />
      <div class="info">
        <h5>{{currentSong.name}}</h5>
        <span>{{joinArtists(currentSong.song.artists)}}</span>
      </div>
      <div class="progress" @click.stop="playing = !playing">
        <canvas width="36" height="36" id="canvas"></canvas>
        <i v-if="playing" class="fa fa-pause"></i>
        <i v-else class="fa fa-play"></i>
      </div>
      <div class="playlist"></div>
    </div>

    <!-- fullscreen -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="showFullscreen" class="fullscreenplay">
        <div class="mask" :style="{backgroundImage: `url(${currentSong.picUrl})`}"></div>
        <i class="fa fa-arrow-left" @click="showFullscreen=false"></i>
      </div>
    </transition>

    <audio :src="currentSongUrl" autoplay></audio>
  </div>
</template>

<script>
export default {
  props: {
    currentSong: Object
  },
  data: function() {
    return {
      playing: false,
      showFullscreen: false
    };
  },
  methods: {
    joinArtists: function(artists) {
      return artists.map(artist => artist.name).join(" / ");
    },
    drawProgress: function() {
      var canvas = this.$el.querySelector("#canvas");
      var audio = this.$el.querySelector("audio");

      var duration = this.currentSong.song.duration;

      audio.ontimeupdate = function() {
        /** @type {HTMLCanvasElement} */
        // console.log(canvas);
        // 获取canvas元素
        var context = canvas.getContext("2d");
        // console.log(duration, this.currentTime * 1000);
        // console.log((this.currentTime * 100) / duration);
        context.clearRect(0, 0, 36, 36);

        context.beginPath();
        context.arc(18, 18, 17, 0, 2 * Math.PI);
        context.closePath();
        context.strokeStyle = "gray";
        // 描边样式
        context.lineWidth = "1";
        // 描边宽度
        context.stroke(); // 路径描边

        context.beginPath();
        context.arc(
          18,
          18,
          17,
          -0.5 * Math.PI,
          -0.5 * Math.PI + 2 * Math.PI * ((this.currentTime * 1000) / duration)
        );
        // context.closePath();
        context.strokeStyle = "rgba(255,0,0,0.7)";
        // 描边样式
        context.lineWidth = "1";
        // 描边宽度
        context.stroke(); // 路径描边
      };
    }
  },

  computed: {
    currentSongUrl: function() {
      if (this.currentSong)
        return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
      else return "";
    }
  },

  mounted() {
    var audio = this.$el.querySelector("audio");

    this.drawProgress();

    audio.onplay = () => {
      console.log("开始播放");
      this.playing = true;
    };
    audio.onpause = () => {
      console.log("暂停播放");
      this.playing = false;
    };
  },

  watch: {
    playing: function(value) {
      var audio = this.$el.querySelector("audio");
      if (value) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.playbarbottom {
  padding: 5px 0;
  background: white;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .margin () {
    margin: 0 10px;
  }
  .thumb {
    .margin;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    animation: rotate 6s linear infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
  }
  .info {
    flex: 1;
    font-size: 12px;
    line-height: 18px;
    h5 {
    }
    span {
      color: gray;
    }
  }
  .progress {
    .margin;
    width: 28px;
    height: 28px;
    // background: lightgray;
    position: relative;
    #canvas {
      width: 100%;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      color: lightgray;
      font-size: 12px;
      display: block;
      margin-top: -6px;
      margin-left: -6px;
      line-height: 1em;
      width: 12px;
      height: 12px;
      text-align: center;
    }
  }
  .playlist {
    .margin;
    width: 28px;
    height: 28px;
    background: red;
  }
}

.fullscreenplay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  .mask {
    filter: blur(30px);
    transform: scale(2);
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-color: lightblue;
    position: absolute;
    z-index: -1;
  }
}
.fadeIn {
  animation-duration: 0.3s;
}
</style>