const fullMenus = [
  {
    title: '概况',
    key: 'Home',
    icon: 'icon-monitor',
    count: 0
  },
  {
    title: '用户',
    key: 'Users',
    icon: 'icon-head',
    children: [
    ]
  },
  {
    title: '订单',
    key: 'Orders',
    icon: 'icon-paper',
    children: [
    ]
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
    title: '设置',
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
