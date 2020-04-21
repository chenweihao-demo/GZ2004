<template>
  <div class="add-todo">
      <input type="text" v-model="newTodo">
      <button @click="addTodo">Add</button>
  </div>
</template>
<script>
export default {
    name: '',
    data: function () {
        return {
           newTodo: '' 
        }
    },
    methods: {
        addTodo: function () {
            this.$emit('translate-new-todo', this.newTodo)
            // console.log(this.newTodo)
            this.newTodo = ''
        }
    },
}
</script>