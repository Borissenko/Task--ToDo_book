import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Clampy from '@clampy-js/vue-clampy'

Vue.use(Clampy);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
