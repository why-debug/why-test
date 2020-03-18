import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import index from '../views/index.vue'
Vue.use(VueRouter)

const routes = [
  //登录
  {
    path: '/',
    name: 'login',
    component: login,
  },
  //注册
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  //首页
  {
    path: '/index',
    name: 'index',
    component:index,
    children: [
      //首页
      { path: '/index/Home', component: () => import('../views/Home.vue')},
      //微聊
      { path: '/index/talk', component: () => import('../views/talk.vue') },
      //推荐
      { path: '/index/track', component: () => import('../views/track.vue') },
      //我的
      { path: '/index/Myhouse', component: () => import('../views/Myhouse.vue') },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
