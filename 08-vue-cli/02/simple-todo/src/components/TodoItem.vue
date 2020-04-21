<template>
  <li class="item" :class="{complated: todo.complated}">{{todo.text}}</li>
</template>
<script>
export default {
  name: "TodoItem",
  props: ["todo"]
};
</script>
<style>
li {
  list-style: none;
}
li.complated {
    text-decoration: line-through;
}
</style>
