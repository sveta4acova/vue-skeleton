import users from '@api/users.js';

const initState = {
  token: null,
  expiresOut: null,
  refreshToken: null,
  user: {},
  errors: null,
  wait: false,
};

export default {
  namespaced: true,
  state: () => initState,

  mutations: {
    set(state, payload = {}) {
      for (let key of Object.keys(payload)) {
        state[key] = payload[key];
      }
    },
  },

  actions: {
    async login({ commit }, data) {
      try {
        commit('set', { wait: true });
        const res = await users.login(data);
        const expiresOut = new Date().getTime() + res.data.expiresIn * 1000;
        const token = res.data.idToken;

        commit('set', {
          token,
          expiresOut,
          refreshToken: res.data.refreshToken,
          user: {
            email: res.data.email,
          },
          errors: null,
          wait: false,
        });

        localStorage.setItem('expiresOut', expiresOut);
        localStorage.setItem('token', token);

        return res.data;
      } catch (e) {
        commit('set', { errors: 'Wrong login or password', wait: false });
        return null;
      }
    },

    logout({ commit }) {
      commit('set', initState);
      localStorage.removeItem('expiresOut');
      localStorage.removeItem('token');
    },

    async remind({ commit }) {
      try {
        commit('set', { wait: true });
        const token = localStorage.getItem('token');
        const res = await users.getUser(token);
        const dataKeys = Object.keys(res.data);

        commit('set', {
          token: localStorage.getItem('token'),
          expiresOut: localStorage.getItem('expiresOut'),
          user: {
            email: res.data[dataKeys[0]].email,
          },
          errors: null,
          wait: false,
        });

        return res.data;
      } catch (e) {
        commit('set', { errors: e, wait: false });
        return null;
      }
    }
  },

  getters: {
    token: ({ token }) => token,
    user: ({ user }) => user,
  }
};
