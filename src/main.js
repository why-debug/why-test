import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './utils/config'
import common from './utils/common'
import moment from "moment"
import 'amfe-flexible/index.js'
import {Storage, jumpHtml} from './api/common'
// import VueMasonryPlugin from 'vue-masonry'
const overTime = new Storage()

import {Button, Dialog, Field, Cell, CellGroup, Uploader, Icon, List, Toast, Notify, Tab, Tabs, Loading, Tag} from 'vant';
import {Tabbar, TabbarItem, Popup, Picker} from 'vant';
import {Checkbox, CheckboxGroup, Step, Steps, SwipeCell} from 'vant';
import {DropdownMenu, DropdownItem} from 'vant';

// Vue .use(VueMasonryPlugin)
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Button);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Toast);
Vue.use(SwipeCell);
Vue.use(Notify);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Icon).use(List);
Vue.use(Cell).use(CellGroup);
Vue.use(Tab).use(Tabs);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Step).use(Steps);



Vue.config.productionTip = false;

Vue.prototype.$config = config
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
    /!* 路由发生变化修改页面title *!/
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()

    /*if(to.path === '/sms') {
        next()
    } else {
        const userPhone = overTime.get("circleUserPhone")
        if (!userPhone) {
            if (to.path === '/' || to.path === "/login" || to.path.indexOf("share") > 0 || to.path === "/home") {
                next()
            } else {
                overTime.set('now_url', to.path) //当前页url与参数放入缓存
                next('/login')
            }
        } else {
            next()
        }
    }*/

    /*if(to.path === '/sms') {
        next()
    } else {

        const userPhone = overTime.get("circleUserPhone")
        if (!userPhone) {
            if (to.path === '/' || to.path === "/login" || to.path.indexOf("share") > 0) {
                next()
            } else {
                overTime.set('now_url',to.fullPath) //当前页url与参数放入缓存
                next('/')
            }
        } else {
            if (to.path === '/') {
                next('/home')
            } else {
                const path = jumpHtml(overTime.get("role"), to.fullPath)
                if(path == to.fullPath) {
                    next()
                } else {
                    next(path)
                }
            }
        }
    }*/
})
// 小管道
const LIST_STATUS = {'-2': '违规违纪或者侵犯版权', '-1': '分发失败', '0': '未分发', '1': '分发中', '2': '分发成功', '5': '转码中'};
Vue.filter('listStatus', function (value) {
    if (!value && value !== 0) return value;
    return LIST_STATUS[value.toString()];
})

//格式化时间管道
Vue.filter("formatTime", value => {
    if (!!!value) return value

    return moment(value).format("YYYY-MM-DD")
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
