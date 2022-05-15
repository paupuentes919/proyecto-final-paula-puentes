<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
 
}
html{
  background-color: black;
   background-image: url(assets/new-pac-man.png);
   background-repeat: no-repeat;
   background-size: 115em 55em;
   background-position-y: 60px;
   background-position-x: center;
}
</style>
