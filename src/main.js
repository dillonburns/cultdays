// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'
import metaInfo from './meta.js'

Vue.config.productionTip = false

Vue.use(Meta)

Vue.use(VueAnalytics, {
  id: 'UA-103392564-1',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  metaInfo
})
