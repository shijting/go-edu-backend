<style lang="less">
@gradient-color: #3788ee;
@bg-color: #f7f8fa;
@title-color:#3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.login-vue {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: @bg-color;
  .login-container {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-content {
      letter-spacing: 2px;
      background: #FFF;
      padding: 70px 30px 20px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border-radius: 3px;
      box-sizing: border-box;
      >div {
        margin: 30px 0;
        &.login-input {
          position: relative;
          .placeholder {
            position: absolute;
            color: @placeholder-color;
            top: 6px;
            font-size: 16px;
            transition: all .2s;
            left: 0;
            pointer-events: none;
          }
          input {
            font-size: 16px;
            padding: 8px 0;
            height: 40px;
            width: 100%;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #d3d3d3;
            box-shadow: inset 0 0 0 1000px #fff;
            outline: none;
            box-sizing: border-box;
            transition: .3s;
            font-weight: 200;
            &:focus {
              border-bottom-color: @gradient-color;
              box-shadow: inset 0 0 0 1000px #fff;
            }
          }
          input:focus + .placeholder, .placeholder.fixed{
            font-size: 13px;
            top: -16px;
          }
          input:-webkit-autofill + .placeholder {
            font-size: 13px;
            top: -16px;
          }
        }
        &.login-title {
          font-size: 30px;
          color: @title-color;
          line-height: 1;
          margin: -16px 0px 40px;
          font-weight: 200;
        }

      }
      > .buttonDiv {
        margin-top: 45px;
        .h-btn {
          padding: 12px 0;
          font-size: 18px;
          opacity: .8;
          border-radius: 3px;
          background: @gradient-color;
          border-color: @gradient-color;
          &:hover {
            opacity: 1;
            background: @gradient-color;
            border-color: @gradient-color;
          }
        }
      }
    }
    .copyright {
      letter-spacing: 1px;
      margin-top: 30px;
      color: @text-color;
      a {
        color: @text-color;
      }
    }
  }
}
</style>

<template>
  <div class="login-vue">
    <div class="login-container">
      <div class="login-content">
        <div class="login-title">管理系统</div>
        <div class="login-name login-input">
          <input type="text" name="email" v-model="login.email" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.email != '' && login.email != null}">用户名</span>
        </div>
        <div class="login-password login-input">
          <input type="password" name="password" v-model="login.password" @keyup.enter="submit" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.password != '' && login.password != null}">密码</span>
        </div>
        <div class="buttonDiv">
          <Button :loading="loading" block color="primary" size="l" @click="submit">登录</Button>
        </div>
      </div>
      <p class="copyright"> Copyright © 2020 shjting - <a href="">shjting.top</a></p>
    </div>
  </div>
</template>
<script>

import Login from 'model/login/Login';
import { isAuthPage } from 'js/config/menu-config';
// import store from 'js/vuex/store';

export default {
  data() {
    return {
      login: Login.parse({}),
      loading: false
    };
  },
  mounted() {
  },
  methods: {
    submit() {
      console.log('login', Login.dispose(this.login));
      // this.loading = true;
      if (this.login.email == '' || this.login.email == null || this.login.password == '' || this.login.password == null) {
        return;
      }

      R.Login.login(Login.dispose(this.login)).then(resp => {
        console.log('123', resp);
        if (resp.code === 0) {
          this.$Loading('加载中');
          console.log('SYS_MENUS', resp.data.menus);
          G.set('SYS_MENUS', resp.data.menus);
          G.trigger('SYS_MENU_UPDATE');
          if (!isAuthPage(this.$route.name)) {
            this.$router.replace({ name: 'PermissionError' });
          }
          // let msg = resp.body;
          Utils.saveLocal('token', resp.data.token);
          console.log('token', Utils.getLocal('token'));
          // store.dispatch('login', resp.data);
          this.loading = false;
          this.$Loading.close();
          window.location = '/';
        } else {
          HeyUI.$Message.error(resp.msg);
        }
        this.loading = false;
      });
      // store.dispatch('login', this.login);
    }
  }
};
</script>
