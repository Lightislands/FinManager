import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './router';
import {store} from './store/store';
import Vuetify from 'vuetify';

import appCss from './app.css';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(appCss);

const router = new VueRouter({
  mode: 'history',
  routes
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});


