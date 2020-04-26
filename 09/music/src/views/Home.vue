<template>
  <div class="home">
    <HomeLink></HomeLink>

    <div class="personalized">
      <CardTitle>推荐歌单</CardTitle>
      <ul class="songlist">
        <SongListCard v-for="(item, index) in randomPersonalizeds()" :key="index" :songList="item"></SongListCard>
      </ul>
    </div>

    <div class="newsong">
      <CardTitle>推荐音乐</CardTitle>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import CardTitle from "@/components/CardTitle.vue";
import SongListCard from "@/components/SongListCard.vue";
import HomeLink from "@/components/HomeLink.vue";

export default {
  name: "Home",
  data: function() {
    return {
      personalizeds: [],
      newsongs: []
    };
  },
  components: {
    // HelloWorld
    CardTitle,
    SongListCard,
    HomeLink
  },
  methods: {
    // 获取推荐歌单
    getPersonalized: function() {
      this.axios
        .get("/personalized")
        .then(response => {
          // 如果数据正确
          // console.log(response);
          this.personalizeds = response.data.result;
          // 获取到的数据放入本地存储
          window.localStorage.setItem(
            "personalizeds",
            // 过期时间1小时
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              result: response.data.result
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getNewSong: function() {},

    // 随机取六个推荐歌单
    randomPersonalizeds: function() {
      // 截取前六个
      return [...this.personalizeds].slice(0, 6);

      // 深拷贝数组
      // var arr = [...this.personalizeds];

      // var newArr = [];
      // for (let i = 0; i < 6; i++) {
      //   var r = Math.floor(Math.random() * arr.length);
      //   newArr.push(...arr.splice(r, 1));
      // }
      // console.log(newArr);

      // return newArr;
    }
  },
  created() {
    // 每次创建组件都拿数据 太频繁 本地存储
    const cachePersonalizeds = JSON.parse(
      window.localStorage.getItem("personalizeds")
    );
    if (cachePersonalizeds && cachePersonalizeds.expire > Date.now()) {
      // 存在并且还没有过期
      this.personalizeds = cachePersonalizeds.result;
    } else {
      // 已经过期
      this.getPersonalized();
    }
  }
};
</script>

<style lang="less">
.songlist {
  display: flex;
  flex-wrap: wrap;
}
</style>
