<style lang="less">
.table-basic-vue {
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">课程</span></div>
    <div class="h-panel-bar">
      <Form :labelWidth="110">
        <FormItem label="标题搜索">
          <input type="text" v-model="search.title" placeholder="课程标题" />
        </FormItem>
        <FormItem label="分类">
          <template v-slot:label>分类</template>
          <Select v-model="search.category_id" :filterable="true" :datas="categories" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem>
          <Button class="h-btn h-btn-primary" @click="getData(true)">搜索</Button>
          <Button class="h-btn" @click="reset()">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div class="h-panel-body">
      <p>
        <Button class="h-btn h-btn-primary" icon="h-icon-plus" @click="create()">添加</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem :width="60" title="序号">
          <template slot-scope="{ index }">{{ index + 1 }} </template>
        </TableItem>
        <TableItem prop="title" title="名称"></TableItem>
        <TableItem title="封面">
          <template slot-scope="{ data }">
            <ImagePreview :datas="thumb(data.thumb)" @click="openPreview1" />
            <!-- <img v-if="data.thumb" :src="thumb(data.thumb)" class="avatar" width="50px" height="50px" @click="openPreview"> -->
          </template>
        </TableItem>
        <TableItem prop="price" title="售价"></TableItem>
        <TableItem prop="category_id" title="分类"></TableItem>
        <TableItem title="推荐">
          <template slot-scope="{ data }">
            {{ data.is_rec == 1 ? '是' : '否' }}
          </template>
        </TableItem>
        <TableItem title="订阅数" :width="70">
          <template slot-scope="{ data }">
            <a v-tooltip trigger="hover" content="点击查看详情">10</a>
          </template>
        </TableItem>
        <TableItem title="状态">
          <template slot-scope="{ data }">
            <span class="h-tag h-tag-green" v-if="data.status == 1">显示</span>
            <span class="h-tag h-tag-red" v-else>隐藏</span>
          </template>
        </TableItem>
        <TableItem :width="170" prop="published_at" title="上线时间" :format="dateFormat"></TableItem>
        <TableItem title="操作" align="center" :width="170">
          <template slot-scope="{ data }">
            <Poptip content="确定要执行该操作吗？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
            <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
            <button class="h-btn h-btn-s" @click="goChapter(data)">章节</button>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination v-if="pagination.total > 0" align="right" v-model="pagination" @change="changePage" />
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
      loading: false,
      categories: [],
      search: {
        title: '',
        category_id: 0
      }
    };
  },
  mounted() {
    R.CourseCategoryies.all().then(resp => {
      if (resp.code !== 0) {
        HeyUI.$Message.error(resp.msg);
        return;
      }
      this.categories = resp.data;
    });
    this.getData();
  },
  methods: {
    thumb(thumbSrc) {
      return 'https://image.twho.top/' + thumbSrc;
    },
    openPreview1(data) {
      this.$ImagePreview(data);
    },
    changePage() {
      this.getData(true);
    },
    dateFormat(value) {
      if (!value) {
        return null;
      } else {
        return manba(value).format('YYYY/MM/DD HH:mm:ss');
      }
    },
    getData(reload) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      R.Courses.index(this.pagination).then(resp => {
        if (resp.code === 0) {
          let data = resp.data;
          console.log('data', data);
          this.datas = data.list;
          this.pagination.total = data.total;
        } else {
          HeyUI.$Message.error(resp.msg);
        }
        this.loading = false;
      });
    },
    create() {
      this.$router.push({ name: 'CourseCreate' });
    },
    remove(data, item) {
      let id = item.id;
      let status = item.status ? 0 : 1;
      R.CourseCategoryies.delete({ id, status }).then(resp => {
        if (resp.code === 0) {
          // data.indexOf(item)
          item.status = status;
          HeyUI.$Message.success('更新成功！');
          return;
        }
        HeyUI.$Message.error(resp.msg);
      });
    },
    edit(item) {
      this.$router.push({ name: 'CourseEdit', params: { id: item.id } });
    },
    goChapter(data) {
      this.$router.push({ name: 'CourseChapter', params: { id: data.id, title: data.title } });
    },
    reset() {
      this.search.title = '';
      this.search.category_id = 0;
    }
  },
  computed: {}
};
</script>
