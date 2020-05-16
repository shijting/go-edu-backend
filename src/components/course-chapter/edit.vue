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
        <span class="h-panel-title">编辑章节</span>
      </div>
      <div class="h-panel-body">
        <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
       </p>
       <Form  mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="courseChapter">
          <FormItem label="章节名称" prop="title">
            <template v-slot:label>章节名称</template>
            <input type="text" v-model="courseChapter.title" />
          </FormItem>
          <FormItem label="排序" prop="sort">
            <template v-slot:label>排序(升序)</template>
            <Slider v-model="courseChapter.sort" :range="{start: 0, end: 2000}"></Slider>
          </FormItem>
          <FormItem>
            <Button :loading="loading" color="primary" @click="submit">保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import CourseChapter from 'model/CourseChapter';
export default {
  data() {
    return {
      courseChapter: CourseChapter.parse({}),
      loading: false,
      id: 0,
      validRules: {
        rules: {
          title: {
            minLen: 2,
            maxLen: 60,
            required: true
          }
        }
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    R.CourseChapter.edit({ id: this.id }).then(resp => {
      if (resp.code != 0) {
        HeyUI.$Message.error(resp.msg);
        return;
      }
      this.courseChapter = resp.data;
    });
  },
  methods: {
    back() {
      this.$router.back();
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        R.CourseChapter.update(this.courseChapter).then(resp => {
          this.loading = false;
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            this.loading = false;
            return;
          }
          HeyUI.$Message.success('编辑成功');
          this.$router.back();
        });
      }
    }
  }
};
</script>
