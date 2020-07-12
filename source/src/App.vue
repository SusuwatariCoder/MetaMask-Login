<template>
  <div id="app">
    <img src="https://github.com/SusuwatariCoder/MetaMask-Login/blob/master/img/logo.d1d2d5c7.png?raw=true">
    <HelloWorld msg="MetaMask开发实例"/>
  </div>
</template>

<script>
import HelloWorld from './components/MetaMask.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 20%;
  height: 20%;
}
</style>
