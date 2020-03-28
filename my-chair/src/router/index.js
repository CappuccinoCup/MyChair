import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Start from "../views/Start";
import Login from "../views/Login"
import Register from "../views/Register"
import Home from "../views/Home";
import VWelcome from "../views/VWelcome";
import NotFound from "../components/404"

Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'Start',
    component: Start
  },
  {
    path: '/login', name: 'Login',
    component: Login,
    // 如果在已登录情况下使用url进入登录界面，则将url转到 Welcome 页面
    beforeEnter: ((to, from, next) => {
      if (store.state.token) {
        next('/');
      } else {
        next();
      }
    })
  },
  {
    path: '/register', name: 'Register',
    component: Register,
    // 如果在已登录情况下使用url进入注册界面，则将url转到 Welcome 页面
    beforeEnter: ((to, from, next) => {
      if (store.state.token) {
        next('/');
      } else {
        next();
      }
    })
  },
  {
    path: '/home', name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/VWelcome', name: 'VWelcome',
    component: VWelcome
  },
  {
    path: '*', name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 前端登录拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
