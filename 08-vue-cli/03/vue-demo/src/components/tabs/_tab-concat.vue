<template>
  <div class="concat">
    concat组件内容
    <button @click="getParent">获取父组件</button>
  </div>
</template>

<script>
export default {
  name: "tab-concat",
  methods: {
      getParent: function() {
          console.log('this.$parent', this.$parent)
      }
  },
};
</script>

<style>
</style>