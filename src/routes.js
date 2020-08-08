import Vue from 'vue'
import Router from 'vue-router'

import AllBillers from './components/AllBillers'
import Register from './components/Register'
import Login from './components/Login'
 

Vue.use(Router)

export default new Router({
    routes : [
     { path: '*', redirect: '/login' },
     { path: '/allBillers', component: AllBillers },
     { path: '/register', component: Register },
     { path: '/login', component: Login },
     { path: '/logout', component: Login }
    ],
 })