import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/cart',
    name: 'cart',
   
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/Checkout',
    name: 'Checkout',
   
    component: () => import('../views/Checkout.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
