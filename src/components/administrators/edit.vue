<style lang="less">
.basic-form-vue {
  .h-panel-body {
    padding-right: 60px;
  }
}
</style>

<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">添加管理员</span>
      </div>
      <div class="h-panel-body">
        <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
       </p>
       <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="administrator">
          <FormItem label="邮箱" prop="email">
            <template v-slot:label>邮箱</template>
            <p>{{administrator.email}}</p>
          </FormItem>
          <FormItem label="姓名" prop="name">
            <template v-slot:label>姓名</template>
            <input type="text" v-model="administrator.name" />
          </FormItem>
          <FormItem label="权限角色" prop="method">
            <template v-slot:label>权限角色</template>
            <Select v-model="administrator.role_id" :multiple="true" :datas="roles"></Select>
          </FormItem>
          <FormItem label="密码" prop="password">
            <template v-slot:label>密码</template>
            <input type="text" v-model="administrator.password" />
             <span class="h-tag h-tag-yellow">不修改密码请不要填写</span>
          </FormItem>
          <FormItem>
            <Button :loading="loading" color="primary" @click="submit">修改</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Administrator from 'model/Administrator';
export default {
  data() {
    return {
      id: 0,
      administrator: Administrator.parse({}),
      loading: false,
      roles: [],
      validRules: {
        rules: {
          name: {
            minLen: 3,
            maxLen: 20,
            required: true
          },
          email: {
            type: 'email',
            required: true
          }
        }
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.init();
  },
  methods: {
    init() {
      R.Administrator.edit({ id: this.id }).then(resp => {
        if (resp.code !== 0) {
          HeyUI.$Message.error(resp.message);
          return false;
        }
        const role = resp.data.role;
        console.log('id', this.administrator.role_id);
        this.administrator.name = role.name;
        this.administrator.email = role.email;
        if (role.roles && role.roles.length > 0) {
          role.roles.forEach(i => {
            console.log('item', i);
            this.administrator.role_id.push(parseInt(i.id));
          });
        }
        console.log('id', this.administrator.role_id);
        const roles = resp.data.roles;
        if (roles && roles.length > 0) {
          roles.forEach(item => {
            this.roles.push({ title: item.role_name, key: item.id });
          });
        }
      });
    },
    back() {
      this.$router.push({ name: 'Administrator' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        // this.loading = true;
        R.Administrator.update({ id: parseInt(this.id), ...this.administrator }).then(resp => {
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.message);
            return false;
          }
          HeyUI.$Message.success('修改成功');
          this.$router.push({ name: 'Administrator' });
        });
      }
    }
  }
};
</script>
