<template>
<div class="table-basic-vue frame-page h-panel">
  <div class="h-panel-bar"><span class="h-panel-title">给【】分配权限</span></div>
  <div class="h-panel-body">
    <p>{{value}}</p>
    <p>
      <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
      <Button @click="chooseAll" color="primary">全选</Button>
      <Button @click="cleanAll">清空</Button>
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
    // let list = [
    //   { id: 1, title: '一级' },
    //   { id: 2, title: '二级' },
    //   { id: 3, title: '三级' },
    //   { id: 10, title: '一级-0', parent: '1' },
    //   { id: 11, title: '一级-1', parent: '1' },
    //   { id: 12, title: '一级-2', parent: '1' },
    //   { id: 13, title: '一级-3', parent: '1' },
    //   { id: 14, title: '一级-4', parent: '1' },
    //   { id: 20, title: '二级-0', parent: '2' },
    //   { id: 21, title: '二级-1', parent: '2' },
    //   { id: 22, title: '二级-2', parent: '2' },
    //   { id: 23, title: '二级-3', parent: '2' },
    //   { id: 24, title: '二级-4', parent: '2' },
    //   { id: 30, title: '三级-0', parent: '3' },
    //   { id: 31, title: '三级-1', parent: '3' },
    //   { id: 32, title: '三级-2', parent: '3' },
    //   { id: 33, title: '三级-3', parent: '3' },
    //   { id: 34, title: '三级-4', parent: '3' }
    // ];
    return {
      loading: false,
      value: [1, 23, 31],
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
    // this.$Loading.close();
    this.init();
  },
  methods: {
    init() {
      R.Permissions.index().then(resp => {
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

    },
    back() {
      this.$router.push({ name: 'AdministratorRole' });
    }
  }
};
</script>
