// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap-loader'
import BootstrapVue from 'bootstrap-vue'
import VueShortkey from 'vue-shortkey'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueShortkey)

Vue.mixin({
  methods: {
    formatPreview: function (str, cut) {
      if (typeof cut === 'undefined') {
        cut = 255
      }
      let spacePos = str.indexOf(' ', cut - 1)
      if (spacePos === -1) {
        return str
      }
      return str.substr(0, spacePos).replace(/[.,\-:;]+$/, '') + ' …'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
