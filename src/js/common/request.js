import Ajax from './ajax';

const Request = {
  User: {
    info() {
      return Ajax.get('/v1/administrator/info');
    }
  },
  // Dict: {
  //   get() {
  //     return Ajax.get(`/dict`);
  //   }
  // },
  Home: {
    getMessageList() {
      return Ajax.get(`/home/messages`);
    }
  },
  Account: {
    menus() {
      return Ajax.get('/v1/permissions');
    }
  },
  Login: {
    login(param) {
      return Ajax.postJson('/v1/administrator/login', param);
    },
    logout(param) {
      return Ajax.post('/logout', param);
    }
  },
  Management: {
    users(params) {
      return Ajax.get('/management/users', params);
    },
    roles(params) {
      return Ajax.get('/management/roles', params);
    }
  },
  Administrator: {
    index(params) {
      return Ajax.get(`/v1/administrator?page=${params.page}&pageSize=${params.size}`);
    },
    create(params) {
      return Ajax.postJson('/v1/administrator', params);
    },
    status(params) {
      return Ajax.patchJson('/v1/administrator/status', params);
    },
    edit(params) {
      console.log('p', params);

      return Ajax.get(`/v1/administrator/edit/${params.id}`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/administrator/edit`, params);
    }
  },
  Roles: {
    index(params) {
      return Ajax.get(`/v1/role?page=${params.page}&pageSize=${params.size}`);
    },
    create(params) {
      return Ajax.postJson('/v1/role', params);
    },
    status(params) {
      return Ajax.patchJson('/v1/role/status', params);
    },
    edit(params) {
      console.log('p', params);
      return Ajax.get(`/v1/role/${params.id}/edit`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/role`, params);
    },
    list() {
      return Ajax.get(`/v1/roles`);
    },
    permissions(params) {
      return Ajax.patchJson(`/v1/role/update-permissions`, params);
    }
  },
  Permissions: {
    index(params) {
      return Ajax.get(`/v1/permission`);
    },
    getPermission(params) {
      return Ajax.get(`/v1/set-permission?role_id=${params.role_id}`);
    },
    list(params) {
      return Ajax.get(`/v1/permission-list?id=${params.id}`);
    },
    create(params) {
      return Ajax.postJson('/v1/permission', params);
    },
    edit(params) {
      return Ajax.get(`/v1/permission/${params.id}/edit`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/permission`, params);
    },
    delete(params) {
      return Ajax.delete(`/v1/permission/${params.id}`, params);
    }
  },
  CourseCategoryies: {
    index(params) {
      return Ajax.get(`/v1/course-categories?page=${params.page}&pageSize=${params.size}`);
    },
    getPermission(params) {
      return Ajax.get(`/v1/set-permission?role_id=${params.role_id}`);
    },
    list(params) {
      return Ajax.get(`/v1/permission-list?id=${params.id}`);
    },
    create(params) {
      return Ajax.postJson('/v1/course-categories', params);
    },
    edit(params) {
      return Ajax.get(`/v1/course-categories/${params.id}/edit`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/course-categories`, params);
    },
    delete(params) {
      return Ajax.delete(`/v1/course-categories?id=${params.id}&status=${params.status}`);
    }
  }
};

export default Request;
