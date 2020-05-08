<template>
    <Tinymce :id="tinymceId" v-model="data" :other_options="options"></Tinymce>
</template>
<script>
import tinymce from 'vue-tinymce-editor';
export default {
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
          xhr.open('POST', '/backend/api/v1/upload/image/tinymce');
          xhr.setRequestHeader('Authorization', 'Bearer ' + Utils.getLocal('token'));
          xhr.onload = function () {
            var json;
            if (xhr.status !== 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.location !== 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            success(json.location);
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
    }
  }
};
</script>
