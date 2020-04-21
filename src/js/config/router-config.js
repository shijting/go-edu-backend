import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthPage } from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
  const routerParam = {
    mode: 'history',
    routes: [{
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['components/login/index'], resolve)
    }, {
      path: '/',
      component: (resolve) => require(['components/app/app-frame'], resolve),
      children: [{
        path: '',
        name: 'Home',
        component: (resolve) => require(['components/home/index'], resolve),
        meta: { title: '首页', icon: 'icon-monitor' }
      }, {
        path: '/system-error',
        name: 'SystemError',
        component: (resolve) => require(['components/error-pages/500'], resolve),
        meta: { title: '系统错误' }
      }, {
        path: '/permission-error',
        name: 'PermissionError',
        component: (resolve) => require(['components/error-pages/403'], resolve),
        meta: { title: '权限错误' }
      },
      {
        path: '/notfound-error',
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
        component: (resolve) => require(['components/management/users'], resolve),
        meta: { title: '用户管理' }
      }, {// 管理员
        path: '/administrator',
        name: 'Administrator',
        component: (resolve) => require(['components/administrators/index'], resolve),
        meta: { title: '管理员', icon: 'icon-paper' }
      }, {
        path: '/administrator/create',
        name: 'AdministratorCreate',
        component: (resolve) => require(['components/administrators/create'], resolve),
        meta: { title: '添加管理员', icon: 'icon-paper' }
      }, {
        path: '/administrator/edit',
        name: 'AdministratorEdit',
        component: (resolve) => require(['components/administrators/edit'], resolve),
        meta: { title: '编辑管理员', icon: 'icon-paper' }
      }, {// 角色相关
        path: '/administrator-role',
        name: 'AdministratorRole',
        component: (resolve) => require(['components/roles/index'], resolve),
        meta: { title: '角色', icon: 'icon-paper' }
      }, {
        path: '/role-create',
        name: 'RoleCreate',
        component: (resolve) => require(['components/roles/create'], resolve),
        meta: { title: '角色' }
      }, {
        path: '/role-edit',
        name: 'RoleEdit',
        component: (resolve) => require(['components/roles/edit'], resolve),
        meta: { title: '角色' }
      }, {
        path: '/form',
        name: 'Form',
        component: (resolve) => require(['components/demo-components/form'], resolve),
        meta: { title: '表单', icon: 'icon-paper' }
      }, {
        path: '/form-detail',
        name: 'FormDetail',
        component: (resolve) => require(['components/demo-components/form-detail'], resolve),
        meta: { title: '表单详情' }
      }, {
        path: '/autocomplete1',
        name: 'Autocomplete1',
        component: (resolve) => require(['components/demo-components/autocomplete1'], resolve),
        meta: { title: '自动补全' }
      }, {
        path: '/autocomplete2',
        name: 'Autocomplete2',
        component: (resolve) => require(['components/demo-components/autocomplete2'], resolve),
        meta: { title: '自动补全2' }
      }, {
        path: '/autocomplete3',
        name: 'Autocomplete3',
        component: (resolve) => require(['components/demo-components/autocomplete3'], resolve),
        meta: { title: '自动补全3' }
      }, {
        path: '/icons',
        name: 'Icons',
        component: (resolve) => require(['components/demo-components/icons'], resolve),
        meta: { title: '图表列表', icon: 'icon-grid' }
      }, {
        path: '/form-basic',
        name: 'FormBasic',
        component: (resolve) => require(['components/demo-components/form/basic'], resolve),
        meta: { title: '基础表单', icon: 'icon-paper' }
      }, {
        path: '/form-create',
        name: 'FormCreate',
        component: (resolve) => require(['components/demo-components/form/create'], resolve),
        meta: { title: '创建表单' }
      }, {
        path: '/table-basic',
        name: 'TableBasic',
        component: (resolve) => require(['components/demo-components/table/basic'], resolve),
        meta: { title: '基础表格' }
      }, {
        path: '/table-search',
        name: 'TableSearch',
        component: (resolve) => require(['components/demo-components/table/search'], resolve),
        meta: { title: '查询表格' }
      }, {
        path: '/table-detail',
        name: 'TableDetail',
        component: (resolve) => require(['components/demo-components/table/detail'], resolve),
        meta: { title: '表格详情' }
      }, {
        path: '/account-basic',
        name: 'AccountBasic',
        component: (resolve) => require(['components/demo-components/account/account'], resolve),
        meta: { title: '个人中心', icon: 'icon-head' }
      }, {
        path: '/account-setting/',
        name: 'AccountSetting',
        component: (resolve) => require(['components/demo-components/account/account-setting'], resolve),
        children: [{
          path: 'security-setting',
          name: 'SecuritySetting',
          component: (resolve) => require(['components/demo-components/account/modules/security-setting'], resolve),
          meta: { title: '安全设置' }
        }, {
          path: 'notice-setting',
          name: 'NoticeSetting',
          component: (resolve) => require(['components/demo-components/account/modules/notice-setting'], resolve),
          meta: { title: '通知设置' }
        }],
        meta: { title: '个人设置' }
      }, {
        path: '/info-basic',
        name: 'InfoBasic',
        component: (resolve) => require(['components/demo-components/info/basic'], resolve),
        meta: { title: '基础信息' }
      }, {
        path: '/info-detail',
        name: 'InfoDetail',
        component: (resolve) => require(['components/demo-components/info/detail'], resolve),
        meta: { title: '信息详情' }
      }, {
        path: '/address-picker',
        name: 'AddressPicker',
        component: (resolve) => require(['components/demo-components/components/address-picker'], resolve),
        meta: { title: '地址选择器' }
      }, {
        path: '/chart',
        name: 'Chart',
        component: (resolve) => require(['components/demo-components/components/chart'], resolve),
        meta: { title: '图表' }
      }, {
        path: '/code-editor',
        name: 'CodeEditor',
        component: (resolve) => require(['components/demo-components/components/code-editor'], resolve),
        meta: { title: '代码编辑器' }
      }, {
        path: '/markdown-editor',
        name: 'MarkdownEditor',
        component: (resolve) => require(['components/demo-components/components/markdown-editor'], resolve),
        meta: { title: 'markdown编辑器' }
      }, {
        path: '/ricktext-editor',
        name: 'RicktextEditor',
        component: (resolve) => require(['components/demo-components/components/richtext-editor'], resolve),
        meta: { title: '富文本编辑器' }
      }, {
        path: '/baidu-map',
        name: 'BaiduMap',
        component: (resolve) => require(['components/demo-components/components/baidu-map'], resolve),
        meta: { title: '百度地图' }
      }, {
        path: '*',
        name: 'CommonNotfoundError',
        component: (resolve) => require(['components/error-pages/404'], resolve),
        meta: { title: '页面找不到' }
      }]
    }]
  };

  let router = new VueRouter(routerParam);
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
