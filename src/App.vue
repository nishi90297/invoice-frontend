<template>
  <div id="app">
    <div id="nav">
      <nav-bar></nav-bar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import NavBar from './components/NavBar'

Vue.use(Buefy ,{
  defaultIconPack: 'fas'
})

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style lang="scss">
  @import 'src/assets/scss/app.scss';

.navbar {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;
    border-bottom: solid thin #6e248b;
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%; 
    /* the rest of your styling */
}
</style>
