<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-info">
      <div class="container px-6 py-4">
        <a class="navbar-brand text-light fw-bold" href="#">TO DO LIST APP</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
html {
  background-color:  #F4F4F4;
}
#app {
  background-color:  #F4F4F4;
  font-family: 'Poppins', sans-serif;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.px-6 {
  padding: 0 5rem !important;
}
.click {
  cursor: pointer;
}
</style>