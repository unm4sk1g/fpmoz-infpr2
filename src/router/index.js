import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import (/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/deals',
    name: 'Popusti',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Deals.vue')
  }
]

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  routes
})

export default router
