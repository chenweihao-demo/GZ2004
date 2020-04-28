<template>
  <div class="playbar">
    <div class="playbarbottom">
      <img class="thumb" :src="currentSong.picUrl" alt />
      <div class="info">
        <h5>{{currentSong.name}}</h5>
        <span>{{joinArtists(currentSong.song.artists)}}</span>
      </div>
      <div class="progress">
        <canvas width="100" height="100" id="canvas"></canvas>
      </div>
      <div class="playlist"></div>
    </div>

    <audio :src="currentSongUrl" controls autoplay style="height:36px"></audio>
  </div>
</template>

<script>
export default {
  props: {
    currentSong: Object
  },
  methods: {
    joinArtists: function(artists) {
      return artists.map(artist => artist.name).join(" / ");
    },
    drawProgress: function() {
         var canvas = this.$el.querySelector("#canvas");
         var audio = this.$el.querySelector("audio");

        var duration = this.currentSong.song.duration;
        

        audio.ontimeupdate = function () {
            console.log(duration, this.currentTime);
        }
        

      /** @type {HTMLCanvasElement} */
      // console.log(canvas);
      // 获取canvas元素
      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(50, 50, 45, 0, 2 * Math.PI);
      context.closePath();
      context.strokeStyle = "lightgray";
      // 描边样式
      context.lineWidth = "3";
      // 描边宽度
      context.stroke(); // 路径描边
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
      this.drawProgress()
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
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .margin () {
    margin: 0 5px;
  }
  .thumb {
    .margin;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    animation: rotate 6s linear infinite;
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
    #canvas {
      width: 100%;
    }
  }
  .playlist {
    .margin;
    width: 28px;
    height: 28px;
    background: red;
  }
}
</style>