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
          <FormItem label="姓名" prop="name">
            <template v-slot:label>姓名</template>
            <input type="text" v-model="administrator.name" />
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <template v-slot:label>邮箱</template>
            <input type="text" v-model="administrator.email" />
          </FormItem>
          <FormItem label="密码" prop="password">
            <template v-slot:label>密码</template>
            <input type="text" v-model="administrator.password" />
          </FormItem>
          <FormItem label="权限角色" prop="method">
            <template v-slot:label>权限角色</template>
            <Select v-model="administrator.role_id" :multiple="true" :datas="roles"></Select>
          </FormItem>
          <FormItem>
            <Button :loading="loading" color="primary" @click="submit">添加</Button>
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
          password: {
            minLen: 6,
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
    R.Roles.list().then(resp => {
      if (resp.code != 0) {
        HeyUI.$Message.error(resp.msg);
        return;
      }
      if (resp.data.length > 0) {
        resp.data.forEach(item => {
          this.roles.push({ title: item.role_name, key: item.id });
        });
      }
    });
  },
  methods: {
    back() {
      this.$router.push({ name: 'Administrator' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        // this.loading = true;
        R.Administrator.create(this.administrator).then(resp => {
          console.log('data', resp);

          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            return;
          }
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Administrator' });
        });
      }
    }
  }
};
</script>
