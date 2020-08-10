import users from '@api/users.js';

export default {
  namespaced: true,
  state: () => ({
    token: null,
    refreshToken: null,
    user: {},
    errors: null,
    wait: false,
  }),

  mutations: {
    set(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.wait = false;
      state.errors = null;
    },
    setErrors(state, payload) {
      state.errors = payload;
      state.wait = false;
    },
    setWait(state, wait) {
      state.wait = wait;
    },
  },

  actions: {
    async login({ commit }, data) {
      try {
        commit('setWait', true);
        const res = await users.login(data);
        commit('set', {
          token: res.data.idToken,
          refreshToken: res.data.refreshToken,
          user: {
            email: res.data.email,
          },
        });
      } catch (e) {
        commit('setErrors', 'Wrong login or password');
      }
    }
  },

  getters: {
    token: ({ token }) => token,
    user: ({ user }) => user,
  }
};
