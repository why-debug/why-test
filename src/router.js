import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from "./views/Index"

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: "/home"
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                title: '圈子视频彩铃'
            },
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: () => import('./views/Login/index.vue')
        },
        {
            path: '/video-show',
            name: 'videoShow',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/VideoShow/index.vue')
        },
        {
            path: '/service-ring',
            name: 'serviceRing',
            meta: {
                title: '上传视频彩铃'
            },
            component: () => import('./views/Business/ServiceRing.vue')
        },
        {
            path: '/success',
            name: 'success',
            meta: {
                title: '成功'
            },
            component: () => import('./views/Notify/Success.vue')
        },
        {
            path: '/upload-list',
            name: 'uploadList',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Mine/UploadList.vue')
        },
        {
            path: '/qa',
            name: 'qa',
            meta: {
                title: '圈子视频彩铃-常见问题解答'
            },
            component: () => import('./views/Qa/index.vue')
        },
        {
            path: '/mine',
            name: 'mine',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Mine/index.vue')
        },
        {
            path: '/nob',
            name: 'nob',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Notify/NoBusiness.vue')
        },
        {
            path: '/manage-video',
            name: 'manageVideo',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Mine/ManageVideo')
        },
        {
            path: '/create-circle',
            name: 'createCircle',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Business/CreateCircle')
        },
        {
            path: '/edit-circle',
            name: 'editCircle',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Business/EditCircleInfo')
        },
        {
            path: '/add-member',
            name: 'addMember',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Business/AddMember')
        },
        {
            path: '/video-progress',
            name: 'videoProgress',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Business/videoProgress')
        },
        {
            path: '/add-ring-video',
            name: 'addRingVideo',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Business/AddRingVideo')
        },
        {
            path: '/circle-list',
            name: 'circleList',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Business/CircleList')
        },
        {
            path: '/circle-detail',
            name: 'circleDetail',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Mine/CircleDetail')
        },
        {
            path: '/manage-list',
            name: 'manageList',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Mine/ManageCircleList')
        },
        {
            path: '/exhibition',
            name: 'exhibition',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Share/Exhibition')
        },
        {
            path: '/share',
            name: 'share',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Share/index')
        },
        {
            path: '/share/success',
            name: 'shareSuccess',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Share/Success.vue')
        },
        {
            path: '/withoutPermission',
            name: 'withoutPermission',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Notify/WithoutPermission.vue')
        },
        {
            path: '/sms',
            name: 'sms',
            meta: {
                title: '圈子视频彩铃'
            },
            component: () => import('./views/Sms/Sms.vue')
        }
    ]
})
