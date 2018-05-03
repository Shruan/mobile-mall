import Vue from 'vue'
import Vuex from 'vuex'
import plugin from './plugins/plugins'

import globalModule from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    globalModule
  },
  plugin,
  scrict: process.env.NODE_ENV !== 'production'
})
