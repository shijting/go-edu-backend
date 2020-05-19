<style lang="less">
.table-basic-vue {
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">课程</span></div>
    <div class="h-panel-bar">
      <Form :labelWidth="110" >
        <FormItem label="标题搜索">
          <input type="text" v-model="search.title" placeholder="视频标题" />
        </FormItem>
        <FormItem label="课程搜索">
          <template v-slot:label>课程</template>
          <Select v-model="search.course_id" :datas="courses" keyName="id" titleName="title" @change="getChapterByCourseId"></Select>
        </FormItem>
        <FormItem label="章节搜索">
          <template v-slot:label>章节</template>
          <Select v-model="search.chapter_id" :datas="chapters" keyName="id" titleName="title"></Select>
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
        <TableItem prop="title" title="标题"></TableItem>
        <TableItem title="课程">
          <template slot-scope="{ data }">
            {{ data.course.title }}
          </template>
        </TableItem>
        <TableItem  title="章节">
          <template slot-scope="{ data }">
            {{ data.chapter.title }}
          </template>
        </TableItem>
        <TableItem title="试看" :width="90">
          <template slot-scope="{ data }">
            {{ data.is_free == 1 ? '是' : '否' }}
          </template>
        </TableItem>
        <TableItem title="状态" :width="90">
          <template slot-scope="{ data }">
            <span class="h-tag h-tag-green" v-if="data.status == 1">显示</span>
            <span class="h-tag h-tag-red" v-else>隐藏</span>
          </template>
        </TableItem>
        <TableItem :width="170" prop="created_at" title="创建日期" :format="dateFormat"></TableItem>
        <TableItem title="操作" align="center" :width="150">
          <template slot-scope="{ data }">
            <Poptip content="确定要执行该操作吗？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
            <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
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
      courses: [],
      chapters: [],
      loading: false,
      search: {
        title: '',
        course_id: 0,
        chapter_id: 0
      }
    };
  },
  mounted() {
    R.Courses.all().then(resp => {
      if (resp.code !== 0) {
        HeyUI.$Message.error(resp.msg);
        return;
      }
      this.courses = resp.data;
    }).catch(err => {
      console.log('err', err);
      HeyUI.$Message.error('获取课程列表失败，网络异常');
    });
    this.getData();
  },
  methods: {
    getChapterByCourseId(data) {
      R.CourseChapter.courseChapter({ course_id: data.id }).then(resp => {
        if (resp.code !== 0) {
          HeyUI.$Message.error(resp.msg);
          return;
        }
        this.chapters = resp.data;
      }).catch(err => {
        console.log('err', err);
        HeyUI.$Message.error('获取课程列表失败，网络异常');
      });
    },
    dateFormat(value) {
      if (!value) {
        return null;
      } else {
        return manba(value).format('YYYY/MM/DD HH:mm:ss');
      }
    },
    changePage() {
      this.getData(true);
    },
    getData(reload) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      console.log('this.search.course_id', this.search.course_id);
      this.search.course_id = this.search.course_id ? this.search.course_id : 0;
      this.search.chapter_id = this.search.chapter_id ? this.search.chapter_id : 0;
      R.Videos.index({ ...this.pagination, ...this.search }).then(resp => {
        if (resp.code === 0) {
          let data = resp.data;
          console.log('Videos data', data);
          this.datas = data.list;
          this.pagination.total = data.total;
        } else {
          HeyUI.$Message.error(resp.msg);
        }
        this.loading = false;
      });
    },
    create() {
      this.$router.push({ name: 'VideoCreate' });
    },
    remove(data, item) {
      let id = item.id;
      R.Videos.delete({ id }).then(resp => {
        if (resp.code === 0) {
          HeyUI.$Message.success('删除成功！');
          data.splice(data.indexOf(item), 1);
          return;
        }
        HeyUI.$Message.error(resp.msg);
      });
    },
    edit(item) {
      this.$router.push({ name: 'VideoEdit', params: { id: item.id, course_id: item.course_id } });
    },
    goChapter(data) {
      this.$router.push({ name: 'CourseChapter', params: { id: data.id, title: data.title } });
    },
    reset() {
      this.search.title = '';
      this.search.course_id = 0;
      this.search.chapter_id = 0;
    }
  },
  computed: {}
};
</script>
