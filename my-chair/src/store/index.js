import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 从本地存取，防止页面刷新时数据丢失
    token: localStorage.getItem('token') || null,
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || null,
    themeIsDark: localStorage.getItem('theme') === 'dark'
  },
  mutations: {
    login(state, data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userDetails', JSON.stringify(data.userDetails));
      state.userDetails = data.userDetails;
      state.token = data.token;
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      state.userDetails = null;
      state.token = null;
    },
    changeTheme(state, dark) {
      // 将当前主题储存起来
      const theme = dark ? 'dark' : 'light';
      localStorage.removeItem('theme');
      localStorage.setItem('theme', theme);
      state.themeIsDark = dark;
    }
  },
  actions: {},
  modules: {}
});
