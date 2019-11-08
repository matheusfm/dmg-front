import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueLogger from 'vuejs-logger'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const options = {
  isEnabled: true,
  logLevel: 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: false,
  separator: '|',
  showConsoleColors: true
}

Vue.use(VueLogger, options)
Vue.use(BootstrapVue)

const axios = Axios.create({
  baseURL: 'http://localhost:8080/v1', //TODO environment variable
  headers: { 'Accept': 'application/json' },
})

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
