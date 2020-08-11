import Vue from 'vue'
import Router from 'vue-router'

import AllBillers from './views/AllBillers'
import Register from './views/Register'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
 

Vue.use(Router)

export default new Router({
    routes : [
     { path: '*', redirect: '/login' },
     { path: '/register', component: Register },
     { path: '/login', component: Login },
     { path: '/logout', component: Login },

     { path: '/dashboard', component: Dashboard , children:[
        { path: '*',component: AllBillers },
        { path: '/allBillers', component: AllBillers },
     ]}
    ],
 })