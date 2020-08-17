import Vue from 'vue'
import Router from 'vue-router'

import AllBillers from './views/AllBillers'
import Register from './views/Register'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import AddInvoice from './views/AddInvoice'
import ViewInvoices from './views/ViewInvoices'
import CreateInvoice from './views/CreateInvoice'

Vue.use(Router)

export default new Router({
    routes : [
     { path: '*', redirect: '/login' },
     { path: '/register', component: Register },
     { path: '/login', component: Login },
     { path: '/logout', component: Login },

     { path: '/dashboard', component: Dashboard , children:[
        { path: '/allBillers', component: AllBillers },
        { path: '/addInvoice', component: AddInvoice },
        { path: '/viewInvoices', component: ViewInvoices },
        { path: '/createInvoice', component: CreateInvoice },
        { path: '*',component: AllBillers },
     ]}
    ],
 })