import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home' 
import AllBillers from './components/AllBillers'
import Register from './components/Register'
 

Vue.use(Router)

export default new Router({
    routes : [
     { path: '*', redirect: '/home' },
     { path: '/home', component: Home },
     { path: '/allBillers', component: AllBillers },
     { path: '/register', component: Register }
    ],
 })