// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import axios from 'axios'

import { Button, Row, Col, Swipe, SwipeItem, Lazyload } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
