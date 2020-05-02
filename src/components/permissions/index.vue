<style lang='less'>
  .table-basic-vue {}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">权限列表</span></div>
    <div class="h-panel-body">
       <p>
         <Button class="h-btn h-btn-primary" icon="h-icon-plus" @click="create()">添加</Button>
       </p>
        <Table :loading="loading" :datas="datas">
          <!-- <TableItem :width="60" title="序号">
            <template slot-scope="{index}">{{index+1}} </template>
          </TableItem> -->
          <TableItem  prop="permission_name" title="权限名称" treeOpener></TableItem>
          <TableItem  :width="160" prop="unique_key" title="唯一标识"></TableItem>
          <TableItem  :width="80" prop="method" title="请求方法"></TableItem>
          <TableItem  :width="200" prop="url" title="路由"></TableItem>
          <TableItem  prop="description" title="描述"></TableItem>
          <TableItem :width="170" prop="created_at" title="创建日期" :format="dateFormat"></TableItem>
          <TableItem title="操作" align="center" :width="130">
          <template slot-scope="{ data }">
            <Poptip content="确定要执行该操作吗？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
            <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
          </template>
        </TableItem>
        </Table>
    </div>
  </div>
</template>
<script>
import manba from 'manba';
export default {
  data() {
    return {
      keyword: '',
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      type: 'China',
      datas: [],
      counts: {},
      loading: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    dateFormat(value) {
      if (!value) {
        return null;
      } else {
        return manba(value).format('YYYY/MM/DD HH:mm:ss');
      }
    },
    getData() {
      this.loading = true;
      R.Permissions.index().then(resp => {
        console.log('resp', resp);
        if (resp.code === 0) {
          let data = resp.data;
          this.datas = data.list;
          this.pagination.total = data.total;
        } else {
          HeyUI.$Message.error(resp.msg);
        }
        this.loading = false;
      });
    },
    create() {
      this.$router.push({ name: 'PermissionCreate' });
    },
    remove(data, item) {
      let id = item.id;
      R.Permissions.delete({ id }).then(resp => {
        if (resp.code === 0) {
          data.splice(data.indexOf(item), 1);
          HeyUI.$Message.success('删除成功！');
          return;
        }
        HeyUI.$Message.error(resp.msg);
      });
    },
    edit(item) {
      console.log('1233', item);
      this.$router.push({ name: 'PermissionEdit', params: { id: item.id } });
    }
  },
  computed: {

  }
};
</script>
