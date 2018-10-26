// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import iView from 'iview';
import axios from '@/libs/api.request';
import 'babel-polyfill';
import 'es6-promise/auto';
// import importDirective from './directives/index';
console.log(iView)
iView.Notice.config({
    top     : 350,
    duration: 1
});
Vue.use(iView);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import 'iview/dist/styles/iview.css'
// import './index.less'
Vue.config.productionTip = false
Vue.prototype.$axios     = axios;
/**
 * 注册指令
 */
// importDirective(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template  : '<App/>'
})
