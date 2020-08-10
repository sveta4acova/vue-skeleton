import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from '@config/router';
import store from '@store/store';

Vue.use(VueRouter);
Vue.use(Vuelidate);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
