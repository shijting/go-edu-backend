<template>
    <Tinymce :id="tinymceId" v-model="data" :other_options="options"></Tinymce>
</template>
<script>
import tinymce from 'vue-tinymce-editor';
export default {
  props: {
    imageAction: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },
  components: {
    Tinymce: tinymce
  },
  data() {
    return {
      data: '',
      tinymceId: 'tinymce' + Math.ceil(Math.random() * 1000),
      options: {
        height: '400px',
        language: 'zh_CN',
        convert_urls: false,
        language_url: '/tinymce/zh_CN.js',
        automatic_uploads: true,
        images_upload_handler: (blobInfo, success, failure) => {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', this.imageAction);
          xhr.setRequestHeader('Authorization', Utils.getLocal('token'));
          xhr.onload = function () {
            var json;
            if (xhr.status !== 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json) {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            if (json.code !== 0) {
              failure('Error: ' + json.msg);
              return;
            }
            success(json.data.path);
          };
          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());

          xhr.send(formData);
        }
      }
    };
  },
  watch: {
    data(newValue, oldValue) {
      this.$emit('input', newValue);
    },
    value(newValue, oldValue) {
      this.data = newValue;
    }
  }
};
</script>
