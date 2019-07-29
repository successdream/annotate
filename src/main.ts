import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import axios from 'axios';
axios.defaults.baseURL = '/api/';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini' });

import './assets/style/style.scss';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
