<template>
  <div class="user">
    <h3>{{$route.params.username}} 的个人主页</h3>
  </div>
</template>
<script>
export default {
  // 生命周期 创建完成
  // 多个用户共用一个组件 user/nick => user/nicholas 组件的生命周期钩子不会再被调用。
  created() {
    console.log("created", this.$route.params.username);
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      console.log("路由变化", to, from, to.params.username);
    }
  }
};
</script>
