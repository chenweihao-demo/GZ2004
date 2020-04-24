<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">推荐音乐</router-link> |
      <router-link to="/hot">热歌榜</router-link> |
      <router-link to="/search">搜索</router-link>
    </div>
    <!-- 一级路由出口 -->
    <router-view />

    <!-- 播放器 -->
    <audio src="" controls></audio>

  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
