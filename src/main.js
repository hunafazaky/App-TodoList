import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import moment from 'moment'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
  
Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM YYYY')
  }
});

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Axios
Vue.prototype.$http = axios;
// BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Default
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
