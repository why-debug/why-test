import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{ path: '/', name: 'login', component: login },
  { path: '/Exit', name: 'login', component: () => import('../views/Exit.vue')},
  {
    path: '/Index', component: Index, children: [
      {
        path: '/Index/home', component: () => import('../views/home.vue'),
        meta: ['后台首页']
      },
      {
        path: '/Index/orde_manage', component: () => import('../views/orde_manage.vue'),
        meta: ['订单管理']
      },
      {
        path: '/Index/admin_add', component: () => import('../views/admin_add.vue'),
        meta: ['账号管理', '添加账号']
      },
      {
        path: '/Index/admin_list', component: () => import('../views/admin_list.vue'),
        meta: ['账号管理', '账号列表']
      },
      {
        path: '/Index/admin_Changepwd', component: () => import('../views/admin_Changepwd.vue'),
        meta: ['账号管理', '修改密码']
      },
      {
        path: '/Index/admin_edit/:id', component: () => import('../views/admin_edit.vue'),
        meta: ['账号管理', '修改账户']
      },
      {
        path: '/Index/goods_list', component: () => import('../views/goods_list.vue'),
        meta: ['商品管理', '商品列表']
      },
      {
        path: '/Index/goods_add', component: () => import('../views/goods_add.vue'),
        meta: ['商品管理', '新增商品']
      },
      {
        path: '/Index/counter_goods', component: () => import('../views/counter_goods.vue'),
        meta: ['销售统计', '商品统计']
      },
      {
        path: '/Index/counter_order', component: () => import('../views/counter_order.vue'),
        meta: ['销售统计', '订单统计']
      },
      { path: '/Index/admin_info', component: () => import('../views/admin_info.vue') }
    ],

  },

  ]
})
