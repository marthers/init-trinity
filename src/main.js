// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import iView from 'iview';
import importDirective from './directives/index';
Vue.use(iView);
import 'iview/dist/styles/iview.css'
// import './index.less'
Vue.config.productionTip = false

/**
 * 注册指令
 */
importDirective(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template  : '<App/>'
})
