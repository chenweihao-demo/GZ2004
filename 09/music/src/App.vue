<template>
  <div id="app">
    
    <!-- 一级路由出口 -->
    <router-view />

    <!-- 播放器 -->
    <audio src='xx' controls style="height:36px"></audio>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
