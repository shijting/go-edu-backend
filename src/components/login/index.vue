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
          .captcha-wrapper {
            height: 42px;
            background-color: rgba(0, 0, 0, 0.03);
          }
          // #embed-captcha {
          //   width: 300px;
          //   margin: 0 auto;
          // }
          // .show {
          //     display: block;
          // }
          // .hide {
          //     display: none;
          // }
          // #notice {
          //     color: red;
          // }
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
        <!-- add -->
        <div class="login-input">
          <div class="captcha-wrapper">
            <div id="embed-captcha"></div>
          </div>
          <!-- <p id="wait" class="show">正在加载验证码......</p> -->
          <!-- <p id="notice" class="hide">请先完成验证</p> -->
        </div>
        <!-- end -->
        <div class="buttonDiv">
          <Button :loading="loading" block color="primary" size="l" @click="submit">登录</Button>
        </div>
      </div>
      <!-- add -->
      <br>
      <input type="hidden" id="status" name="geetest_success">
      <!-- end -->
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
      loading: false,
      token: '',
      validate: false
    };
  },
  mounted() {
    this.initGeetest('#embed-captcha');
  },
  methods: {
    initGeetest(captchaWrapper) {
      R.Geetest.init({ id: 1 }).then(resp => {
      // eslint-disable-next-line no-undef
        initGeetest({
          gt: resp.gt,
          challenge: resp.challenge,
          new_captcha: resp.new_captcha,
          product: 'float',
          width: '260px',
          offline: !resp.success
        }, (captchaObj) => {
          this.captchaObj = captchaObj;
          captchaObj.appendTo(captchaWrapper);
          captchaObj.onReady(() => {
            // DOM 准备好后，隐藏 #loading-tip 元素
            // document.getElementById('loading-tip').style.display = 'none';
          });
          captchaObj.onSuccess(() => {
            // 用户验证成功后，进行实际的提交行为
            // todo
            let result = captchaObj.getValidate();
            R.Geetest.validate(result).then(resp => {
              if (resp.code !== 0) {
                HeyUI.$Message.error(resp.msg);
                captchaObj.reset();
                return;
              }
              this.validate = true;
              this.token = resp.data.token;
            }).catch(err => {
              HeyUI.$Message.error('验证错误,请检查网络连接是否正常');
              console.log('validate faild', err);
            });
          });
          captchaObj.onError((error) => {
            HeyUI.$Message.error('验证错误', error);
            captchaObj.reset();
          });
        });
      }).catch(err => {
        console.log('geetest init failed', err);
        HeyUI.$Message.error('初始化验证码失败，请检查网络连接是否正常');
      });
    },
    submit() {
      if (!this.validate) {
        HeyUI.$Message.error('请先完成验证');
        return;
      }
      this.loading = true;
      if (this.login.email == '' || this.login.email == null || this.login.password == '' || this.login.password == null) {
        return;
      }
      console.log('token', this.token);
      R.Login.login({ ...this.login, token: this.token }).then(resp => {
        if (resp.code === 0) {
          this.$Loading('加载中');
          // console.log('SYS_MENUS', resp.data.menus);
          G.set('SYS_MENUS', resp.data.menus);
          G.trigger('SYS_MENU_UPDATE');
          if (!isAuthPage(this.$route.name)) {
            this.$router.replace({ name: 'PermissionError' });
          }
          // let msg = resp.body;
          Utils.saveLocal('token', resp.data.token);
          // store.dispatch('login', resp.data);
          window.location = '/';
        } else {
          HeyUI.$Message.error(resp.msg);
        }
        this.loading = false;
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loading = false;
        HeyUI.$Message.error('网络连接错误！');
        console.log(err);
      });
      // store.dispatch('login', this.login);
    }
  }
};
</script>
