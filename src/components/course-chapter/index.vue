<style lang='less'>
  .table-basic-vue {}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">课程《{{$route.params.title}}》</span></div>
    <div class="h-panel-body">
       <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
         <Button class="h-btn h-btn-primary" icon="h-icon-plus" @click="create()">添加</Button>
       </p>
        <Table :loading="loading" :datas="datas">
          <TableItem :width="60" title="序号">
            <template slot-scope="{index}">{{index+1}} </template>
          </TableItem>
          <TableItem  prop="title" title="章节名称"></TableItem>
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
        <p></p>
        <Pagination v-if="pagination.total>0"  align="right" v-model="pagination" @change="changePage" />
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
    back() {
      this.$router.push({ name: 'Course' });
    },
    changePage() {
      this.getData(true);
    },
    dateFormat(value) {
      if (!value) {
        return null;
      } else {
        return manba(value).format('YYYY/MM/DD HH:mm');
      }
    },
    getData(reload) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      R.CourseChapter.index({ ...this.pagination, id: this.$route.params.id }).then(resp => {
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
      this.$router.push({ name: 'CourseChapterCreate', params: { id: this.$route.params.id } });
    },
    remove(data, item) {
      let id = item.id;
      R.CourseChapter.delete({ id }).then(resp => {
        if (resp.code === 0) {
          // data.indexOf(item)
          data.splice(data.indexOf(item), 1);
          HeyUI.$Message.success('更新成功！');
          return;
        }
        HeyUI.$Message.error(resp.msg);
      });
    },
    edit(item) {
      this.$router.push({ name: 'CourseChapterEdit', params: { id: item.id } });
    }
  },
  computed: {

  }
};
</script>
