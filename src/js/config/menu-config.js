const fullMenus = [
  {
    title: '首页',
    key: 'Home',
    icon: 'icon-monitor',
    count: 0
  },
  {
    title: '视频',
    key: 'Videos',
    icon: 'icon-air-play',
    children: [
      {
        title: '分类',
        key: 'CourseCategories'
      },
      {
        title: '课程',
        key: 'Course'
      },
      {
        title: '视频',
        key: 'video'
      }
    ]
  },
  {
    title: '系统',
    key: 'System',
    icon: 'icon-cog',
    children: [
      {
        title: '权限',
        key: 'AdministratorPermission'
      },
      {
        title: '角色',
        key: 'AdministratorRole'
      },
      {
        title: '管理员',
        key: 'Administrator'
      }
    ]
  },
  {
    title: 'Icons',
    key: 'Icons',
    icon: 'icon-heart'
  },
  {
    title: '列表应用',
    key: 'tablelist',
    icon: 'icon-grid-2',
    children: [
      {
        title: '基础表格',
        key: 'TableBasic'
      },
      {
        title: '查询列表',
        key: 'TableSearch'
      }
    ]
  },
  {
    title: '表单应用',
    key: 'form-folder',
    icon: 'icon-paper',
    children: [
      {
        title: '基础表单',
        key: 'Form'
      },
      {
        title: '表单详情',
        key: 'FormDetail'
      }
    ]
  },
  {
    title: '模糊匹配',
    key: 'AutoComplete-folder',
    icon: 'icon-disc',
    children: [
      {
        title: '模糊搜索',
        key: 'Autocomplete1'
      },
      {
        title: '场景应用',
        key: 'Autocomplete2'
      },
      {
        title: '复杂场景',
        key: 'Autocomplete3'
      }
    ]
  },
  {
    title: '扩展组件',
    key: 'Advance-folder',
    icon: 'icon-bar-graph-2',
    children: [
      {
        title: '图表',
        key: 'Chart'
      },
      {
        title: '富文本编辑器',
        key: 'RicktextEditor'
      },
      {
        title: '代码编辑器',
        key: 'CodeEditor'
      },
      {
        title: 'Markdown编辑器',
        key: 'MarkdownEditor'
      }, {
        title: '百度地图',
        key: 'BaiduMap'
      }
    ]
  },
  {
    title: '系统设置',
    key: 'SysSetting',
    icon: 'icon-cog',
    children: [
      {
        title: '个人中心',
        key: 'AccountBasic'
      },
      {
        title: '安全设置',
        key: 'SecuritySetting'
      },
      {
        title: '权限设置',
        key: 'Authorization'
      }
      // {
      //   title: '用户管理',
      //   key: 'Users'
      // }
    ]
  }
];

const getMenus = function (menuIdList = []) {
  return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
  let configMenu = [];
  for (let menu of menus) {
    let m = Utils.copy(menu);
    if (menuIdList.indexOf(m.key) > -1) {
      configMenu.push(m);
    }
    if (menu.children && menu.children.length) {
      m.children = getAuthMenu(menu.children, menuIdList);
    }
  }
  return configMenu;
};

const getKeys = function (menus) {
  let keys = [];
  for (let menu of menus) {
    keys.push(menu.key);
    if (menu.children && menu.children.length) {
      keys.push(...getKeys(menu.children));
    }
  }
  return keys;
};

let fullMenuKeys = getKeys(fullMenus);
console.log('init', fullMenuKeys);
const isAuthPage = function (name) {
  let menus = G.get('SYS_MENUS') || [];
  console.log(name, fullMenuKeys.indexOf(name), menus.indexOf(name));
  if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
    return false;
  }
  return true;
};
// 开始
let fullKeys = function (keys) {
  fullMenuKeys.push.apply(fullMenuKeys, keys);
  console.log('abc', keys, fullMenuKeys);
  // let abc = fullMenuKeys.concat(keys);
  // console.log('00', abc);
};

export { getMenus, fullMenus, fullMenuKeys, isAuthPage, fullKeys };
