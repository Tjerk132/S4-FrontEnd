import Vue from 'vue';
import App from '@/routing/App.vue';
import router from '@/routing/router.js';
import VueCookies from 'vue-cookies';
import VueSession from 'vue-session';
import VueAlert from 'vue-simple-alert';
import Pagination from 'jw-vue-pagination';
import ZoomOnHover from 'vue-zoom-on-hover';
import StarRating from 'vue-star-rating';
import Notifications from 'vue-notification'
import velocity from 'velocity-animate';
// allow async/await 
// import 'babel-core/register';
// import 'babel-polyfill';

import '@/routing/ml.js';
 
Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.$cookies.config('7d');

Vue.use(VueSession);

Vue.use(VueAlert);

Vue.component('pagination', Pagination);

Vue.use(ZoomOnHover);

Vue.component('star-rating', StarRating);
// can also
// components: {
//    StarRating
// }

Vue.use(Notifications, { velocity });

new Vue({   
  render: h => h(App),
  router: router,
}).$mount('#app')