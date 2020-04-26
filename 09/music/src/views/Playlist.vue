<template>
  <div class="palylist">
    <!-- palylist {{$route.query.id}} -->
    <div class="header">
      <div class="mask" :style="{backgroundImage: `url(${songListDetail.coverImgUrl})`}"></div>
      <div class="fl">
        <img :src="songListDetail.coverImgUrl" alt />
        <span class="playcount">
          <i class="fa fa-headphones"></i>
          {{playCountParse(songListDetail.playCount)}}
        </span>
        <span class="icon">歌单</span>
      </div>
      <div class="fr">
        <h3>{{songListDetail.name}}</h3>
        <img :src="songListDetail.creator.avatarUrl" alt />
        <span>{{songListDetail.creator.nickname}}</span>
      </div>
    </div>

    <!--  -->
    <div class="info">
      <div class="tags">
        <span>标签：</span>
        <i v-for="(tag, index) in songListDetail.tags" :key="index">{{tag}}</i>
      </div>
      <div class="desc" :class="{show: showMoreDesc}">
        <span>简介：</span>
        <span>{{songListDetail.description}}</span>
      </div>
      <div class="more" @click="showMoreDesc = !showMoreDesc">
        <i v-if="showMoreDesc" class="fa fa-angle-up"></i>
        <i v-else class="fa fa-angle-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      songListId: this.$route.query.id,
      songListDetail: null,
      showMoreDesc: false
    };
  },
  methods: {
    getSongListDetail: function() {
      this.axios
        .get("/playlist/detail", {
          params: {
            id: this.songListId
          }
        })
        .then(response => {
          // 如果数据正确
          this.songListDetail = response.data.playlist;
          //   console.log(response.data);

          // 获取到的数据放入本地存储
          window.localStorage.setItem(
            "sl-" + this.$route.query.id,
            // 过期时间1小时
            JSON.stringify({
              expire: Date.now() + 3 * 60 * 60 * 1000,
              result: response.data.result
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    playCountParse: function(n) {
      if (n > 100000000) return (n / 100000000).toFixed(1) + "亿";
      if (n > 10000) return (n / 10000).toFixed(1) + "万";
    }
  },

  // 第一次进入的时候
  created() {
    // 每次创建组件都拿数据 太频繁 本地存储
    const cacheSongListDetail = JSON.parse(
      window.localStorage.getItem("sl-" + this.songListId)
    );
    if (cacheSongListDetail && cacheSongListDetail.expire > Date.now()) {
      // 存在并且还没有过期
      this.songListDetail = cacheSongListDetail.result;
    } else {
      // 已经过期
      this.getSongListDetail();
    }
  },

  // 创建完成组件 第一次之后 需要监听路由 @待定
  // 路由更新守卫 进入路由之前 拦截路由
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    // console.log(to, from);
    from;
    this.songListId = Number(to.query.id);
    next();
    console.log("xxx");
  },

  watch: {
    songListId: function() {
      console.log("变化了");
    }
  }
};
</script>


<style lang="less" scoped>
img {
  max-width: 100%;
}
.header {
  display: flex;
  padding: 30px 15px;
  position: relative;
  overflow: hidden;
  color: white;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(30px) brightness(0.8);
    transform: scale(1.5);
    background-position: center;
  }
  .fl {
    flex: 4;
    position: relative;
    font-size: 12px;
    line-height: 18px;
    .xxx() {
      position: absolute;
      left: 0;
      top: 0;
    }
    .playcount {
      .xxx();
      width: 100%;
      text-align: right;
      padding: 0 5px;

      background: rgba(0, 0, 0, 0.3);
    }
    .icon {
      .xxx();
      top: 15px;
      background: #bb3b3f;
      padding: 0 10px;

      border-top-right-radius: 1em;
      border-bottom-right-radius: 1em;
    }
  }
  .fr {
    flex: 6;
    padding-left: 15px;
    h3 {
      padding: 5px 0 20px 0;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      padding-left: 15px;
    }
  }
}

.info {
  padding: 0 10px;
  line-height: 1.5em;
  font-size: 14px;
  .tags {
    margin: 10px 0;
    span {
      vertical-align: middle;
    }
    i {
      font-size: 12px;
      margin-right: 5px;
      font-style: normal;
      border: 1px solid lightgray;
      border-radius: 12px;
      padding: 2px 5px;
    }
  }
  .desc {
    height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    // background: red;
    &.show {
      height: auto;
    }
    span {
      white-space: pre-wrap;

      vertical-align: baseline;
    }
  }
  .more {
    overflow: hidden;
    i {
      float: right;
      font-size: 16px;
    }
  }
}
</style>