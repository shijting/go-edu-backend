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
        <span class="h-panel-title">编辑角色</span>
      </div>
      <div class="h-panel-body">
        <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
       </p>
       <Form  mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="roles">
          <FormItem label="名称" prop="role_name">
            <template v-slot:label>名称</template>
            <input type="text" v-model="roles.role_name" />
          </FormItem>
          <FormItem label="描述" prop="description">
            <template v-slot:label>描述</template>
            <textarea rows="3" v-autosize v-wordcount="200" v-model="roles.description"></textarea>
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
import roles from 'model/Roles';
export default {
  data() {
    return {
      id: 0,
      roles: roles.parse({}),
      loading: false,
      validRules: {
        rules: {
          role_name: {
            minLen: 2,
            maxLen: 20,
            required: true
          },
          description: {
            maxLen: 200
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
      R.Roles.edit({ id: this.id }).then(resp => {
        console.log(resp);
        if (resp.code !== 0) {
          HeyUI.$Message.error(resp.msg);
          return false;
        }
        this.roles = resp.data;
      });
    },
    back() {
      this.$router.push({ name: 'AdministratorRole' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        R.Roles.update({ id: this.id, ...this.roles }).then(resp => {
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            return false;
          }
          HeyUI.$Message.success('修改成功');
          this.$router.push({ name: 'AdministratorRole' });
          this.loading = false;
        });
      }
    }
  }
};
</script>
