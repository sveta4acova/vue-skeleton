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
  const token = localStorage.getItem('token');
  const expiresOut = localStorage.getItem('expiresOut');

  if (to.path !== '/login' && !token || (token && expiresOut < new Date().getTime())) {
    next({ name: 'Login' });
  } else {
    if (token && !store.state.session.user.email) {
      store.dispatch('session/remind');
    }
    next();
  }
});

export default router;
