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
          <FormItem label="名称" prop="name">
            <template v-slot:label>分类</template>
            <Select v-model="courses.category" :datas="methods"></Select>
          </FormItem>
          <FormItem label="名称" prop="name">
            <template v-slot:label>标题</template>
            <input type="text" v-model="courses.title" />
          </FormItem>
          <FormItem label="名称" prop="name">
            <template v-slot:label>售价</template>
            <div class="h-input-addon">
              <input type="text" placeholder="售价" v-model="courses.price" />
              <span class="h-input-addon">元</span>
            </div>
          </FormItem>
          <FormItem label="名称" prop="name">
            <template v-slot:label>封面</template>
             <!-- <Qiniu :options="options" type="image" data-type="file" v-model="file"></Qiniu> -->
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
// import qiniu from '../../demos/common/qiniu';
export default {
  components: {
    // Qiniu: qiniu
  },
  data() {
    return {
      courses: Courses.parse({}),
      loading: false,
      // eslint-disable-next-line standard/array-bracket-even-spacing
      methods: [{ title: 'GET', key: 'GET' }, { title: 'POST', key: 'POST' }, { title: 'DELETE', key: 'DELETE' }, { title: 'PUT', key: 'PUT' }, { title: 'PATCH', key: 'PATCH' } ],
      options: {
        max_file_size: '1mb',
        filters: {
          mime_types: [
            { title: 'Image files', extensions: 'jpg,gif,png' }
          ]
        }
      },
      file: null,
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
        R.Courses.create(this.courseCategories).then(resp => {
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
