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
      console.log('login', param);
      return Ajax.postJson('/v1/administrator/login', param);
    },
    logout(param) {
      return Ajax.post('/logout', param);
    }
  },
  Geetest: {
    init(params) {
      return Ajax.get('/v1/geetest?t=' + (new Date()).getTime());
    },
    validate(params) {
      return Ajax.postJson('/v1/geetest', params);
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
      return Ajax.get(`/v1/role/edit/${params.id}`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/role`, params);
    },
    list() {
      return Ajax.get(`/v1/roles`);
    },
    permissions(params) {
      return Ajax.patchJson(`/v1/role/permissions/update`, params);
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
      return Ajax.get(`/v1/permission/edit/${params.id}`);
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
    all(params) {
      return Ajax.get(`/v1/course-categories/all`);
    },
    create(params) {
      return Ajax.postJson('/v1/course-categories', params);
    },
    edit(params) {
      return Ajax.get(`/v1/course-categories/edit/${params.id}`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/course-categories`, params);
    },
    delete(params) {
      return Ajax.delete(`/v1/course-categories?id=${params.id}&status=${params.status}`);
    }
  },
  Courses: {
    index(params) {
      return Ajax.get(`/v1/courses?page=${params.page}&pageSize=${params.size}`);
    },
    create(params) {
      return Ajax.postJson('/v1/courses', params);
    },
    edit(params) {
      return Ajax.get(`/v1/courses/edit/${params.id}`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/courses`, params);
    },
    all(params) {
      return Ajax.get(`/v1/courses/all`);
    }
  },
  CourseChapter: {
    index(params) {
      return Ajax.get(`/v1/course-chapter?course_id=${params.id}&page=${params.page}&pageSize=${params.size}`);
    },
    create(params) {
      return Ajax.postJson('/v1/course-chapter', params);
    },
    edit(params) {
      return Ajax.get(`/v1/course-chapter/edit/${params.id}`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/course-chapter`, params);
    },
    delete(params) {
      return Ajax.delete(`/v1/course-chapter?id=${params.id}`);
    },
    courseChapter(params) {
      return Ajax.get(`/v1/course-chapter/chapter-course/${params.course_id}`);
    }
  },
  AliyunVod: {
    aliyunVodAuthTokenCreate(params) {
      return Ajax.get(`/v1/vod/auth-token?file_name=${params.file_name}`);
    },
    aliyunVodAuthTokenRefresh(params) {
      return Ajax.get(`/v1/vod/auth-token/refresh/${params.video_id}`);
    }
  },
  Videos: {
    create(params) {
      return Ajax.postJson('/v1/video', params);
    },
    index(params) {
      return Ajax.get(`/v1/video?page=${params.page}&pageSize=${params.size}&title=${params.title}&course_id=${params.course_id}&chapter_id=${params.chapter_id}`);
    },
    edit(params) {
      return Ajax.get(`/v1/video/edit/${params.id}`);
    },
    update(params) {
      return Ajax.patchJson(`/v1/video`, params);
    },
    delete(params) {
      return Ajax.delete(`/v1/video?id=${params.id}`);
    }
  },
  Player: {
    auth() {
      return Ajax.get(`/v1/video/auth`);
    }
  }
};

export default Request;
