<template>
    <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :headers="myHeaders"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
var token = Utils.getLocal('token');
export default {
  props: {
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageUrl: '',
      myHeaders: { Authorization: token }
    };
  },
  methods: {
    handleSuccess(res, file) {
      console.log('file uploaded', res);
      // console.log(file);
      if (res.code != 0) {
        HeyUI.$Message.error(res.msg);
        return;
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.data.path;
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG && !isPNG && !isGIF) {
        HeyUI.$Message.error('上传头像图片只能是 JPG,PNG,GIF 格式!');
        return false;
      }
      if (!isLt1M) {
        HeyUI.$Message.error('上传头像图片大小不能超过 1MB!');
        return false;
      }
      return true;
    }
  },
  watch: {
    imageUrl(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
