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
        <span class="h-panel-title">添加课程</span>
      </div>
      <div class="h-panel-body">
        <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
       </p>
       <Form  mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="courses">
          <FormItem label="分类" prop="category_id">
            <template v-slot:label>分类</template>
            <Select v-model="courses.category_id" :datas="categories" keyName="id" titleName="name"></Select>
          </FormItem>
          <FormItem label="名称" prop="title">
            <template v-slot:label>标题</template>
            <input type="text" v-model="courses.title" />
          </FormItem>
          <FormItem label="名称" prop="price">
            <template v-slot:label>售价</template>
             <div class="h-input-group" v-width="300">
              <input  type="number" v-model="courses.price" />
              <span class="h-input-addon">元</span>
            </div>
            <span class="h-tag h-tag-yellow">0元表示免费</span>
          </FormItem>
          <FormItem label="封面" prop="thumb">
            <template v-slot:label>封面</template>
             <!-- <image-upload v-model="courses.thumb" name="封面"></image-upload> -->
             <upload-image v-model="courses.thumb" action="/backend/v1/upload/image"></upload-image>
          </FormItem>
          <FormItem label="显示" prop="status">
            <template v-slot:label>显示</template>
            <h-switch v-model="courses.status">
              <span slot="open" class="h-icon-check"></span>
              <span slot="close" class="h-icon-close"></span>
            </h-switch>
          </FormItem>
          <FormItem label="推荐" prop="is_rec">
            <template v-slot:label>推荐</template>
            <h-switch v-model="courses.is_rec">
              <span slot="open" class="h-icon-check"></span>
              <span slot="close" class="h-icon-close"></span>
            </h-switch>
          </FormItem>
          <FormItem label="上架时间" prop="published_at">
            <template v-slot:label>上架时间</template>
            <DatePicker v-model="courses.published_at" v-width="300" type="datetime"></DatePicker>
          </FormItem>
          <FormItem label="seo关键词" prop="seo_keywords">
            <template v-slot:label>seo关键词</template>
            <input type="text" v-model="courses.seo_keywords" />
          </FormItem>
          <FormItem label="SEO描述" prop="seo_description">
            <template v-slot:label>SEO描述</template>
            <textarea v-model="courses.seo_description"></textarea>
          </FormItem>
          <FormItem label="课程描述" prop="description">
            <template v-slot:label>课程描述</template>
            <Tinymce v-model="courses.description" imageAction="/backend/v1/upload/editor"></Tinymce>
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
import Courses from 'model/Courses';
import tinymce from '../common/tinymce';
import UploadImage from '../common/upload-image';
export default {
  components: {
    Tinymce: tinymce,
    UploadImage
  },
  data() {
    return {
      courses: Courses.parse({}),
      loading: false,
      imageUrl: '',
      // eslint-disable-next-line standard/array-bracket-even-spacing
      categories: [],
      validRules: {
        rules: {
          title: {
            minLen: 2,
            maxLen: 60,
            required: true
          },
          category_id: {
            required: true
          },
          price: {
            required: true
          },
          thumb: {
            required: true
          },
          published_at: {
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
      R.CourseCategoryies.all().then(resp => {
        if (resp.code !== 0) {
          HeyUI.$Message.error(resp.msg);
          return;
        }
        this.categories = resp.data;
      });
    },
    back() {
      this.$router.push({ name: 'Course' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.courses.status = this.courses.status ? 1 : 0;
        this.courses.is_rec = this.courses.is_rec ? 1 : 0;
        this.courses.price = parseFloat(this.courses.price);
        console.log('a', this.courses);
        this.loading = true;
        R.Courses.create(this.courses).then(resp => {
          this.loading = false;
          console.log('data', resp);
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            this.loading = false;
            return;
          }
          HeyUI.$Message.success('添加成功');
          // this.$router.push({ name: 'CourseCategories' });
        });
      }
    }
  }
};
</script>
