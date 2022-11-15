<template>
  <div id="app">
    <ToDoList/>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue'

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style>
html {
  background-color: #F4F4F4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #F4F4F4;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
