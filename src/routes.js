import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home' 
import AllBillers from './components/AllBillers'
import Register from './components/Register'
import Login from './components/Login'
 

Vue.use(Router)

export default new Router({
    routes : [
     { path: '*', redirect: '/Login' },
     { path: '/home', component: Home },
     { path: '/allBillers', component: AllBillers },
     { path: '/register', component: Register },
     { path: '/login', component: Login },
     { path: '/logout', component: Login }
    ],
 })