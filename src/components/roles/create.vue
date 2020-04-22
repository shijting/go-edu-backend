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
        <span class="h-panel-title">添加权限</span>
      </div>
      <div class="h-panel-body">
        <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
       </p>
       <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="roles">
          <FormItem label="名称" prop="role_name">
            <template v-slot:label>名称</template>
            <input type="text" v-model="roles.role_name" />
          </FormItem>
          <FormItem label="描述" prop="description">
            <template v-slot:label>描述</template>
            <textarea rows="3" v-autosize v-wordcount="200" v-model="roles.description"></textarea>
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
import Roles from 'model/Roles';
export default {
  data() {
    return {
      roles: Roles.parse({}),
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
  methods: {
    back() {
      this.$router.push({ name: 'AdministratorRole' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        R.Roles.create(this.roles).then(resp => {
          this.loading = false;
          console.log('data', resp);
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            return;
          }
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'AdministratorRole' });
        });
      }
    }
  }
};
</script>
