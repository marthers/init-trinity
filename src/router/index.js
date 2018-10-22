import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import routes from './routes.js'
import {getToken} from './../libs/util'
import { deflate } from 'zlib';
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to,from,next) => {
  iView.LoadingBar.start();
  next()
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
export default router;
