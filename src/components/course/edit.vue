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
        <span class="h-panel-title">编辑分类</span>
      </div>
      <div class="h-panel-body">
        <p>
         <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回</Button>
       </p>
       <Form  mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="validRules" :model="courseCategories">
          <FormItem label="名称" prop="name">
            <template v-slot:label>名称</template>
            <input type="text" v-model="courseCategories.name" />
          </FormItem>
          <FormItem label="排序" prop="sort">
            <template v-slot:label>排序(降序)</template>
            <Slider v-model="courseCategories.sort" :range="{start: 0, end: 2000}"></Slider>
          </FormItem>
          <FormItem label="状态" prop="sort">
            <template v-slot:label>状态</template>
            <h-switch v-model="courseCategories.status">
              <span slot="open" class="h-icon-check"></span>
              <span slot="close" class="h-icon-close"></span>
            </h-switch>
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
import CourseCategories from 'model/CourseCategories';
export default {
  data() {
    return {
      courseCategories: CourseCategories.parse({}),
      loading: false,
      validRules: {
        rules: {
          name: {
            minLen: 2,
            maxLen: 30,
            required: true
          }
        }
      }
    };
  },
  mounted() {
    R.CourseCategoryies.edit({ id: this.$route.params.id }).then(resp => {
      if (resp.code !== 0) {
        HeyUI.$Message.error(resp.msg);
      }
      this.courseCategories = resp.data;
    });
  },
  methods: {
    back() {
      this.$router.push({ name: 'CourseCategories' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        this.courseCategories.status = this.courseCategories.status == false ? 0 : 1;
        R.CourseCategoryies.update(this.courseCategories).then(resp => {
          this.loading = false;
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            this.loading = false;
            return;
          }
          HeyUI.$Message.success('编辑成功');
          this.$router.push({ name: 'CourseCategories' });
        });
      }
    }
  }
};
</script>
