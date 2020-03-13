import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';
// import Vuetify from 'vuetify';
import VueCookies from 'vue-cookies';
import VueSession from 'vue-session';
import VueAlert from 'vue-simple-alert';
import Pagination from 'jw-vue-pagination';
import 'babel-polyfill';

window.axios = axios;

// Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.$cookies.config('7d');

Vue.use(VueSession);

Vue.use(VueAlert);

Vue.component('pagination', Pagination);

new Vue({   
  render: h => h(App),
  router: router,
}).$mount('#app')