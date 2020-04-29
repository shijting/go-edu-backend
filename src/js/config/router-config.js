import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthPage, fullKeys } from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
  const routerParam = {
    mode: 'history',
    routes: [{
      path: '/login',
      name: 'Login',
      authorized: false,
      component: (resolve) => require(['components/login/index'], resolve)
    }, {
      path: '/',
      component: (resolve) => require(['components/app/app-frame'], resolve),
      children: [{
        path: '',
        name: 'Home',
        authorized: true,
        component: (resolve) => require(['components/home/index'], resolve),
        meta: { title: '首页', icon: 'icon-monitor' }
      }, {
        path: '/system-error',
        name: 'SystemError',
        authorized: false,
        component: (resolve) => require(['components/error-pages/500'], resolve),
        meta: { title: '系统错误' }
      }, {
        path: '/permission-error',
        name: 'PermissionError',
        authorized: false,
        component: (resolve) => require(['components/error-pages/403'], resolve),
        meta: { title: '权限错误' }
      },
      {
        path: '/notfound-error',
        authorized: false,
        name: 'NotfoundError',
        component: (resolve) => require(['components/error-pages/404'], resolve),
        meta: { title: '页面找不到' }
      }, {
        path: '/authorization',
        name: 'Authorization',
        component: (resolve) => require(['components/management/authorization'], resolve),
        meta: { title: '权限管理' }
      }, {
        path: '/users',
        name: 'Users',
        authorized: true,
        component: (resolve) => require(['components/management/users'], resolve),
        meta: { title: '用户管理' }
      }, {// 管理员
        path: '/administrator',
        name: 'Administrator',
        authorized: true,
        component: (resolve) => require(['components/administrators/index'], resolve),
        meta: { title: '管理员', icon: 'icon-paper' }
      }, {
        path: '/administrator/create',
        name: 'AdministratorCreate',
        authorized: true,
        component: (resolve) => require(['components/administrators/create'], resolve),
        meta: { title: '添加管理员', icon: 'icon-paper' }
      }, {
        path: '/administrator/edit/:id',
        name: 'AdministratorEdit',
        authorized: true,
        component: (resolve) => require(['components/administrators/edit'], resolve),
        meta: { title: '编辑管理员', icon: 'icon-paper' }
      }, {// 角色相关
        path: '/administrator-role',
        name: 'AdministratorRole',
        authorized: true,
        component: (resolve) => require(['components/roles/index'], resolve),
        meta: { title: '角色', icon: 'icon-paper' }
      }, {
        path: '/role-create',
        name: 'RoleCreate',
        authorized: true,
        component: (resolve) => require(['components/roles/create'], resolve),
        meta: { title: '角色' }
      }, {
        path: '/role-edit/:id',
        name: 'RoleEdit',
        authorized: true,
        component: (resolve) => require(['components/roles/edit'], resolve),
        meta: { title: '角色' }
      }, {
        path: '/set-permissions/:id/:roleName',
        name: 'SetPermissions',
        authorized: true,
        component: (resolve) => require(['components/roles/setPermissions'], resolve),
        meta: { title: '权限' }
      }, {// 权限相关
        path: '/administrator-permissions',
        name: 'AdministratorPermission',
        authorized: true,
        component: (resolve) => require(['components/permissions/index'], resolve),
        meta: { title: '权限列表' }
      }, {
        path: '/permission-create',
        name: 'PermissionCreate',
        authorized: true,
        component: (resolve) => require(['components/permissions/create'], resolve),
        meta: { title: '添加权限' }
      }, {
        path: '/permission-edit/:id',
        name: 'PermissionEdit',
        authorized: true,
        component: (resolve) => require(['components/permissions/edit'], resolve),
        meta: { title: '编辑权限' }
      }, {// 课程分类
        path: '/course-categories',
        name: 'CourseCategories',
        authorized: true,
        component: (resolve) => require(['components/course-categories/index'], resolve),
        meta: { title: '分类列表' }
      }, {
        path: '/course-categories/create',
        name: 'CourseCategoriesCreate',
        authorized: false,
        component: (resolve) => require(['components/course-categories/create'], resolve),
        meta: { title: '创建分类' }
      }, {
        path: '/course-categories/edit',
        name: 'CourseCategoriesEdit',
        authorized: false,
        component: (resolve) => require(['components/course-categories/edit'], resolve),
        meta: { title: '编辑分类' }
      }, {
        path: '*',
        authorized: false,
        name: 'CommonNotfoundError',
        component: (resolve) => require(['components/error-pages/404'], resolve),
        meta: { title: '页面找不到' }
      }]
    }]
  };

  let router = new VueRouter(routerParam);
  // 开始
  const getKeys = function (menus) {
    let keys = [];
    for (let menu of menus) {
      if (menu.authorized === true) {
        keys.push(menu.name);
        if (menu.children && menu.children.length) {
          keys.push(...getKeys(menu.children));
        }
      }
    }
    return keys;
  };
  let fullMenuKeys = getKeys(routerParam.routes[1].children);
  console.log(123);
  fullKeys(fullMenuKeys);
  // 结束
  let isFirstRouter = true;
  let whiteList = ['Login'];
  router.beforeEach((to, from, next) => {
    const token = Utils.getLocal('token');
    if (whiteList.includes(to.name)) {
      next();
      return;
    } else {
      if (!token) {
        next({ name: 'Login' });
        return;
      }
    }
    if (!isFirstRouter && !isAuthPage(to.name)) {
      next({ name: 'PermissionError' });
      return;
    }
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 管理应用';
    } else {
      document.title = '管理系统';
    }
    isFirstRouter = false;
    next();
  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
    // baidu 统计，如果有自己的统计，请至index.html修改至自己的埋点
    // if (window._hmt) {
    //   window._hmt.push(['_trackPageview', window.location.pathname]);
    // }
  });
  return router;
};

export default initRouter;
