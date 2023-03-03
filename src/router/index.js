import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import routes from '@/router/routes';
import { store } from '@/store';
import * as types from '@/store/mutation-types';

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes],
})

router.beforeEach((to, from, next) => {
  store.commit(types.SUCCESS, null)
  store.commit(types.ERROR, null)
  return next()
});

export default router
