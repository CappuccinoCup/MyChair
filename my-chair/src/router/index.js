import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import messager from '../messager'
import VWelcome from '../views/VWelcome';
import NotFound from '../components/404'

Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'VWelcome',
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

export default router;
