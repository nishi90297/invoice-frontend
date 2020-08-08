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
    NavBar
  }
}
</script>

<style lang="scss">
  @import 'src/assets/scss/app.scss';
</style>
