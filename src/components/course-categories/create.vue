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
        <span class="h-panel-title">添加分类</span>
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
          <FormItem label="描述" prop="sort">
            <template v-slot:label>排序(降序)</template>
            <Slider v-model="courseCategories.sort" :range="{start: 0, end: 2000}"></Slider>
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
    // R.Permissions.list({ id: 0 }).then(resp => {
    //   console.log('resp', resp);
    //   if (resp.code !== 0) {
    //     return;
    //   }
    //   if (resp.data.list.length > 0) {
    //     resp.data.list.forEach(item => {
    //       console.log('item', item);
    //       let parentNode = { title: item.permission_name, id: item.id };
    //       this.param.datas.push(parentNode);
    //       this.childrenNode(item);
    //     });
    //   }
    // });
  },
  methods: {
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
    back() {
      this.$router.push({ name: 'CourseCategories' });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        R.CourseCategoryies.create(this.courseCategories).then(resp => {
          this.loading = false;
          console.log('data', resp);
          if (resp.code !== 0) {
            HeyUI.$Message.error(resp.msg);
            this.loading = false;
            return;
          }
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'CourseCategories' });
        });
      }
    }
  }
};
</script>
