import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/add',
    name: 'AddPage',
    component: () => import('../views/EditPage.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditPage',
    component: () => import('../views/EditPage.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
