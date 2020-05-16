<style lang='less'>
  .table-basic-vue {}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">角色</span></div>
    <div class="h-panel-body">
       <p>
         <Button class="h-btn h-btn-primary" icon="h-icon-plus" @click="create()">添加</Button>
       </p>
        <Table :loading="loading" :datas="datas">
          <TableItem :width="60" title="序号">
            <template slot-scope="{index}">{{index+1}} </template>
          </TableItem>
          <TableItem  prop="role_name" title="角色名称"></TableItem>
          <TableItem  prop="description" title="描述"></TableItem>
          <TableItem :width="170" prop="created_at" title="创建日期" :format="dateFormat"></TableItem>
          <TableItem  :width="100" title="状态" sort="auto">
            <template slot-scope="{ data }">
              <span class="h-tag h-tag-green" v-if="data.status==1">显示</span>
              <span class="h-tag h-tag-red" v-else>隐藏</span>
            </template>
          </TableItem>
          <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <Poptip content="确定要执行该操作吗？" @confirm="remove(datas, data)">
              <!-- <button class="h-btn h-btn-s h-btn-red" v-if="data.status ===1">隐藏</button>
              <button class="h-btn h-btn-s h-btn-yellow" v-else>显示</button> -->
              <Button class="h-btn h-btn-s" :text="true">{{data.status ===1 ? '隐藏' : '显示'}}</Button>
            </Poptip>
            <!-- <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
            <button class="h-btn h-btn-s" @click="setPermissions(data)">权限</button> -->
            <Button class="h-btn h-btn-s" :text="true" @click="edit(data)">编辑</Button>
            <Button class="h-btn h-btn-s" :text="true"  @click="setPermissions(data)">权限</Button>
          </template>
        </TableItem>
        </Table>
        <p></p>
        <Pagination v-if="pagination.total>0"  align="right" v-model="pagination" @change="changePage" />
    </div>
  </div>
</template>
<script>
import manba from 'manba';
import SetPermissions from './setPermissions';
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
        // return manba(value);
        return value ? manba(value).format('YYYY/MM/DD HH:mm:ss') : '';
      }
    },
    changePage() {
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      R.Roles.index(this.pagination).then(resp => {
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
      this.$router.push({ name: 'RoleCreate' });
    },
    remove(data, item) {
      let id = item.id;
      let status = item.status == 1 ? 0 : 1;

      R.Roles.status({ id, status }).then(resp => {
        if (resp.code === 0) {
          data[data.indexOf(item)].status = status;
          return;
        }
        HeyUI.$Message.error(resp.msg);
      });
    },
    edit(item) {
      this.$router.push({ name: 'RoleEdit', params: { id: item.id } });
    },
    setPermissions(item) {
      // this.$router.push({ name: 'SetPermissions', params: { id: item.id, roleName: item.role_name } });
      this.$Modal({
        type: `drawer-right`,
        hasMask: true,
        width: 500,
        component: {
          vue: SetPermissions,
          datas: { roleId: item.id, roleName: item.role_name }
        },
        events: {
          success: (modal, data) => {
            this.value = data;
          }
        }
      });
    }
  },
  computed: {

  }
};
</script>
