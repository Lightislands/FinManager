import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './router';
import {store} from './store/store';
import {storeAuth} from './store/auth';
import Vuetify from 'vuetify';

import appCss from './styles/app.scss';

import axios from 'axios';

axios.defaults.baseURL = 'https://fin-manager-5eca2.firebaseio.com';
// // axios.defaults.headers.common['Authorization'] = 'something';
// axios.defaults.headers.get['Accepts'] = 'application/json' // ???????


// const reqInterceptors = axios.interceptors.request.use(config => {
//   console.log('interceptors Req', config);
//   // config.headers['SOME-HEADER']
//   return config;
// })
// const resInterceptors = axios.interceptors.response.use(res => {
//   console.log('interceptors Resp', res);
//   return config;
// })
// axios.interceptors.request.eject(reqInterceptors);
// axios.interceptors.response.eject(resInterceptors);

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
  storeAuth,
  render: h => h(App)
});


