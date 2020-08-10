import VueRouter from 'vue-router';
import Login from '@pages/Login.vue';
import Main from '@pages/Main.vue';
import Contacts from '@pages/Contacts.vue';
import NotFound from '@pages/NotFound.vue';
import store from '@store/store';

const routes = [
  { path: '/', component: Main, name: 'Main' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/contacts', component: Contacts, name: 'Contacts' },
  { path: '*', component: NotFound, name: 'NotFound' }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.session.token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
