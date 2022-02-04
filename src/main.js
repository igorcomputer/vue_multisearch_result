
if(process.env.NODE_ENV === 'development') {
  require('./assets/styles/reset.css');
}
require('./assets/styles/main.css');

import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#mutlis_result')

console.log("Multisearch APP (MODE IS): " + process.env.NODE_ENV);