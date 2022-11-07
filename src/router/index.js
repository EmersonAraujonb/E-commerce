import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import "firebase/compat/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/cart',
    name: 'cart',
     meta: {
       requiresAuth: true
     },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/Checkout',
    name: 'Checkout',
     meta: {
       requiresAuth: true
     },
    component: () => import('../views/Checkout.vue')
   
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next)=>{
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next('login'); 
    
//   else if(!requiresAuth && currentUser) next('/');
  
//   else next();
    
// })

// router.beforeEach((to, from, next) => {
//   const uid = sessionStorage.getItem('Uid')
//   // if (to.name !== 'login' && !uid) {
//   //   next({ name: 'login' });
//   // } else {
//   //   next();
//   // }

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     uid ? next() : next({ path: '/login' })
//   } else {
//     next()
//   }
// });

export default router
