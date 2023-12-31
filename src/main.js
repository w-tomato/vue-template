import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/index'

import '@/icons' // icon
import '@/permission' // permission control
import * as EventNames from './constants/busEventNames'
import moment from 'moment'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('formatStandardTime', function(value) {
  if (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
})

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    // 全局事件名称枚举，新增事件名称时，需要在此js内添加枚举，以防止冲突
    Vue.prototype.$eventNames = EventNames
  },
  render: h => h(App)
})
