import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta:  { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
    meta:  { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import( '../views/Add.vue'),
    meta: { requiresAuth: true }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    const user = auth.currentUser
    console.log(user)

    if (!user) {
      next({
        path: '/login'
      })
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
