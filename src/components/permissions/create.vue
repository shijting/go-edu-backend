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
       <Form  mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="permission">
          <FormItem label="上级权限" prop="pid">
            <template v-slot:label>上级权限{{permission.pid}}</template>
            <TreePicker :option="param" :useConfirm="useConfirm" :disabled="disabled" ref="treepicker" v-model="permission.pid"></TreePicker>
            <!-- <Select v-model="permission.pid" :datas="pids"></Select> -->
          </FormItem>
          <FormItem label="名称" prop="permission_name">
            <template v-slot:label>名称</template>
            <input type="text" v-model="permission.permission_name" />
          </FormItem>
          <FormItem label="唯一标识" prop="unique_key">
            <template v-slot:label>唯一标识</template>
            <input type="text" v-model="permission.unique_key" />
            <span class="h-tag h-tag-yellow">与前端路由的key一致</span>
          </FormItem>
          <FormItem label="请求方法" prop="method">
            <template v-slot:label>请求方法</template>
            <Select v-model="permission.method" :datas="methods"></Select>
            <!-- <input type="text" v-model="permission.method" /> -->
          </FormItem>
          <FormItem label="路由" prop="url">
            <template v-slot:label>路由</template>
            <input type="text" v-model="permission.url" />
          </FormItem>
          <FormItem label="描述" prop="description">
            <template v-slot:label>描述</template>
            <textarea rows="3" v-autosize v-wordcount="200" v-model="permission.description"></textarea>
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
import Permission from 'model/AdministratorPermission';
export default {
  data() {
    return {
      permission: Permission.parse({}),
      loading: false,
      pids: [{ title: '顶级权限', id: 0 }],
      disabled: false,
      useConfirm: false,
      param: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: [{ title: '顶级权限', id: 0 }]
      },
      // eslint-disable-next-line standard/array-bracket-even-spacing
      methods: [{ title: 'GET', key: 'GET' }, { title: 'POST', key: 'POST' }, { title: 'DELETE', key: 'DELETE' }, { title: 'PUT', key: 'PUT' }, { title: 'PATCH', key: 'PATCH' } ],
      validRules: {
        rules: {
          pid: {
            required: true
          },
          permission_name: {
            minLen: 2,
            maxLen: 30,
            required: true
          },
          unique_key: {
            minLen: 3,
            maxLen: 50,
            required: true
          },
          method: {
            required: true
          },
          url: {
            minLen: 1,
            maxLen: 100,
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
    R.Permissions.list({ id: 0 }).then(resp => {
      console.log('resp', resp);
      if (resp.code !== 0) {
        return;
      }
      if (resp.data.list.length > 0) {
        resp.data.list.forEach(item => {
          console.log('item', item);
          let parentNode = { title: item.permission_name, id: item.id };
          this.param.datas.push(parentNode);
          this.childrenNode(item);
        });
      }
    });
  },
  methods: {
    childrenNode(item) {
      if (item.children && item.children.length > 0) {
        item.children.forEach(childrenItem => {
          this.param.datas.push({ title: childrenItem.permission_name, id: childrenItem.id, parent: childrenItem.pid });
          if (childrenItem.children && childrenItem.children.length > 0) {
            this.childrenNode(childrenItem);
          }
        });
      }
    },
    back() {
      this.$router.push({ name: 'AdministratorPermission' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        R.Permissions.create(this.permission).then(resp => {
          this.loading = false;
          console.log('data', resp);
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            this.loading = false;
            return;
          }
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'AdministratorPermission' });
        });
      }
    }
  }
};
</script>
