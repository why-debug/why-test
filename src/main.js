import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; //引入全局组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入全局样式
import './assets/reset.css'; //引入重置样式
import axios from "axios";

// import echarts from 'echarts'
Vue.prototype.axios=axios;
axios.defaults.baseURL='http://work.08321.org/sell/'
Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
