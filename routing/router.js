import Vue from 'vue'
import VueRouter from  'vue-router'
import routes from '@/routing/routes.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

export default router;