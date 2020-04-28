<template>
<div class="table-basic-vue frame-page h-panel">
  <div class="h-panel-bar"><span class="h-panel-title">【{{$route.params.roleName}}】设置权限</span></div>
  <div class="h-panel-body">
    <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
    <Button @click="chooseAll" class="h-btn h-btn-s" :text="true">全选</Button>
    <Button @click="cleanAll" class="h-btn h-btn-s" :text="true">清空</Button>
    <p>
    </p>
    <Tree :option="param" ref="permissionsTree" :multiple="true" v-model="value" choose-mode="some"></Tree>
    <br/>
    <Button :loading="loading" color="primary" @click="submit">保存</Button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      value: [],
      param: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: []
      }
    };
  },
  created() {
    // this.$Loading('加载中...');
  },
  mounted() {
    console.log('id', this.$route.params.id);
    this.init();
  },
  methods: {
    init() {
      R.Permissions.getPermission({ role_id: this.$route.params.id }).then(resp => {
        if (resp.code !== 0) {
          HeyUI.$Message.error(resp.msg);
          return;
        }
        if (resp.data.list.length > 0) {
          resp.data.list.forEach(item => {
            let parentNode = { title: item.permission_name, id: item.id };
            console.log(parentNode);
            this.param.datas.push(parentNode);
            this.childrenNode(item);
          });
        }
        if (resp.data.permissions.length > 0) {
          resp.data.permissions.forEach(item => {
            this.value.push(parseInt(item.administrator_permissions_id));
          });
        }
      });
    },
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
    chooseAll() {
      this.$refs.permissionsTree.chooseAll();
    },
    cleanAll() {
      this.value = [];
    },
    submit() {
      R.Roles.permissions({ role_id: this.$route.params.id, permission_ids: this.value }).then(resp => {
        if (resp.code !== 0) {
          HeyUI.$Message.error(resp.msg);
          return;
        }
        this.$router.push({ name: 'AdministratorRole' });
        HeyUI.$Message.success('权限设置成功');
      });
    },
    back() {
      this.$router.push({ name: 'AdministratorRole' });
    }
  }
};
</script>
