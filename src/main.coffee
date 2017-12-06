import Vue from 'vue'

import config from 'config/config'
import router from 'config/router'

import RootLayout from 'layouts/RootLayout'

import 'utils/filters'
import 'styles/main'

new Vue({
  el: '#v-app'
  router
  template: '<root-layout />'
  components:
    RootLayout: RootLayout
})
