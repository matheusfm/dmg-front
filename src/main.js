import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

const axios = Axios.create({
  baseURL: process.env.VUE_APP_DMG_API_URL,
  headers: { 'Accept': 'application/json' },
})

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(function (config) {
  config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('bearerToken') }
  return config
})

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
