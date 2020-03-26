"use strict";

import Vue from 'vue';
import axios from 'axios';
import store from '../store/index'
import router from '../router/index'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (store.state.token) {
      // 判断是否有token，若存在，每个http header加上token
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    // console.log(error.response);
    if (error) {
      // 清除token 如果不是register/login, 跳转至login
      store.commit('logout');
      router.currentRoute.path !== '/login' &&
      router.currentRoute.path !== '/register' &&
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.path}
      })
    }
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin);

export default Plugin;
