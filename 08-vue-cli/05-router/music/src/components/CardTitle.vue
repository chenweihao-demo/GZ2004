<template>
  <div class="title">
    <h3>
      <slot></slot>
    </h3>
  </div>
</template>

<style lang="less" scoped>
    h3 {
        &:before {
           content: '00'; 
        }
    }
</style>