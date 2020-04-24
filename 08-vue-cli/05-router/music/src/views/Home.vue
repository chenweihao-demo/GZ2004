<template>
  <div class="home">
    <div class="personalized">
      <CardTitle>推荐歌单</CardTitle>
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

export default {
  name: "Home",
  data: function() {
    return {
      personalized: [],
      newsong: []
    };
  },
  components: {
    // HelloWorld
    CardTitle
  },
  methods: {
    getPersonalized: function() {
      this.axios
        .get("/sug?code=utf-8&q=%E7%94%B7%E8%A3%85")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getNewSong: function() {}
  },
  created() {
    this.getPersonalized();
  }
};
</script>
