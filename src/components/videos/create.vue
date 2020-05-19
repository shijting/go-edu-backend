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
        <span class="h-panel-title">添加视频</span>
      </div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
        </p>
        <Form mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="videos">
          <FormItem label="课程" prop="course_id">
            <template v-slot:label>课程</template>
            <Select v-model="videos.course_id" :datas="courses" keyName="id" titleName="title" @change="getChapterByCourseId"></Select>
          </FormItem>
          <FormItem label="章节" prop="chapter_id">
            <template v-slot:label>章节</template>
            <Select v-model="videos.chapter_id" :datas="chapters" keyName="id" titleName="title"></Select>
          </FormItem>
          <FormItem label="名称" prop="title">
            <template v-slot:label>标题</template>
            <input type="text" v-model="videos.title" />
          </FormItem>
          <FormItem label="试看" prop="is_free">
            <template v-slot:label>试看</template>
            <h-switch v-model="videos.is_free">
              <span slot="open" class="h-icon-check"></span>
              <span slot="close" class="h-icon-close"></span>
            </h-switch>
          </FormItem>
          <FormItem label="视频" prop="aliyun_video_id">
            <template v-slot:label>上传至阿里云{{videos.aliyun_video_id}}</template>
            <AliyunUpload v-model="videos.aliyun_video_id"></AliyunUpload>
          </FormItem>
          <FormItem label="时长(秒)" prop="duration">
            <template v-slot:label>时长</template>
            <input type="number" v-model="videos.duration" />
          </FormItem>
          <FormItem label="显示" prop="status">
            <template v-slot:label>显示</template>
            <h-switch v-model="videos.status">
              <span slot="open" class="h-icon-check"></span>
              <span slot="close" class="h-icon-close"></span>
            </h-switch>
          </FormItem>
          <FormItem label="seo关键词" prop="seo_keywords">
            <template v-slot:label>SEO关键词</template>
            <input type="text" v-model="videos.seo_keywords" />
          </FormItem>
          <FormItem label="SEO描述" prop="seo_description">
            <template v-slot:label>SEO描述</template>
            <textarea v-model="videos.seo_description"></textarea>
          </FormItem>
          <FormItem label="课程描述" prop="description">
            <template v-slot:label>课程描述</template>
            <Tinymce v-model="videos.description" imageAction="/backend/v1/upload/editor"></Tinymce>
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
import Videos from 'model/Videos';
import tinymce from '../common/tinymce';
import aliyun from '../common/videos/aliyun';
export default {
  components: {
    Tinymce: tinymce,
    AliyunUpload: aliyun
  },
  data() {
    return {
      videos: Videos.parse({}),
      loading: false,
      imageUrl: '',
      courses: [],
      chapters: [],
      validRules: {
        rules: {
          title: {
            minLen: 2,
            maxLen: 60,
            required: true
          },
          course_id: {
            required: true
          },
          chapter_id: {
            required: true
          },
          aliyun_video_id: {
            required: true
          }
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
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
    },
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
    back() {
      this.$router.back();
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.videos.status = this.videos.status ? 1 : 0;
        this.videos.is_free = this.videos.is_free ? 1 : 0;
        this.videos.course_id = parseInt(this.videos.course_id);
        this.videos.chapter_id = parseInt(this.videos.chapter_id);
        this.videos.duration = parseInt(this.videos.duration);
        this.loading = true;
        R.Videos.create(this.videos).then(resp => {
          this.loading = false;
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            this.loading = false;
            return;
          }
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Video' });
        });
      }
    }
  }
};
</script>
