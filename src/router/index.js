import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '../views/Auth.vue'
import ToDo from '../views/ToDo.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo,
    beforeEnter(to, from, next) {
      if(store.state.token === true) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    beforeEnter(to, from, next) {
      if(store.state.token === true) {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
