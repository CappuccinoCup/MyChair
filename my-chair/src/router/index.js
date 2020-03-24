import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index.vue'
import Login from '@/components/Login'
import Register from '@/components/Register'
import store from '@/store/index'
import messager from '@/messager'

Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'Index',
    component: Index,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
  {
    path: '/login', name: 'Login',
    component: Login,
    // 如果在已登录情况下使用url进入登录界面，则将url转到主页
    beforeEnter: ((to, from, next) => {
      if (store.state.token) {
        messager.$message({
          showClose: true, type: 'warning',
          message: '请先退出登录'
        });
        next('/');
      } else {
        next();
      }
    })
  },
  {
    path: '/register', name: 'Register',
    component: Register,
    // 如果在已登录情况下使用url进入注册界面，则将url转到主页
    beforeEnter: ((to, from, next) => {
      if (store.state.token) {
        messager.$message({
          showClose: true, type: 'warning',
          message: '请先退出登录'
        });
        next('/');
      } else {
        next();
      }
    })
  },
  {
    path: '/home', name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about', name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 当页面路由不存在时，默认跳转到主页
    path: '*', redirect: '/'
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
      messager.$message({
        showClose: true, type: 'warning',
        message: '请先登录'
      });
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router
