<template>
  <div>
    <span>{{ video_id }}</span>
    <Button class="h-btn h-btn-primary" @click="selectVideo"><i class="h-icon-upload"></i> 选择视频</Button>
    <input type="file" ref="aliyunfile" v-show="false" @change="fileChange" />
    <Progress :percent="progress" :stroke-width="6" :color="color" v-show="showProgress"
      ><span slot="title">{{ uploadedStatus }}</span
      ><span slot="text">{{ progress }}%</span></Progress
    >
  </div>
</template>

<script>
export default {
  props: {
    courseId: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      video_id: '',
      uploader: null,
      progress: 0,
      showProgress: false,
      color: '',
      uploadedStatus: '上传进度'
    };
  },
  mounted() {
    this.uploader = new AliyunUpload.Vod({
      // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
      userId: '122',
      // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
      region: 'cn-shanghai',
      // 分片大小默认1M，不能小于100K
      partSize: 1048576,
      // 并行上传分片个数，默认5
      parallel: 5,
      // 网络原因失败时，重新上传次数，默认为3
      retryCount: 3,
      // 网络原因失败时，重新上传间隔时间，默认为2秒
      retryDuration: 2,
      // 开始上传
      onUploadstarted: uploadInfo => {
        this.showProgress = true;
        this.color = 'greed';
        this.uploadedStatus = '上传中...';
        R.AliyunVod.aliyunVodAuthTokenCreate({ course_id: 1 })
          .then(resp => {
            if (resp.code != 0) {
              HeyUI.$Message.error(resp.msg);
              return;
            }
            this.video_id = resp.data.video_id;
            console.log('resp.data', resp.data);
            console.log('this.uploader', this.uploader);
            this.uploader.setUploadAuthAndAddress(uploadInfo, resp.data.upload_auth, resp.data.upload_address, resp.data.video_id);
          })
          .catch(err => {
            HeyUI.$Message.error('获取阿里云视频上传凭证错误!');
            console.log('err', err);
          });
      },
      // 文件上传成功
      onUploadSucceed: uploadInfo => {
        this.uploadedStatus = '上传成功';
        console.log('onUpload success');
      },
      // 文件上传失败
      onUploadFailed: (uploadInfo, code, message) => {
        this.color = '#ff5500';
        this.uploadedStatus = '上传失败';
        console.log('onUploadfile');
      },
      // 文件上传进度，单位：字节
      onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
        this.progress = Math.ceil(loadedPercent * 100);
        console.log(
          'onUploadProgress:file:' + uploadInfo.file.name + ', fileSize:' + totalSize + ', percent:' + Math.ceil(loadedPercent * 100) + '%'
        );
      },
      // 上传凭证超时
      onUploadTokenExpired: uploadInfo => {},
      // 全部文件上传结束
      onUploadEnd: function (uploadInfo) {
        console.log('onUploadEnd: uploaded all the files');
      }
    });
  },
  methods: {
    selectVideo() {
      this.$refs.aliyunfile.click();
    },
    fileChange(event) {
      if (event.target.files.length === 0) {
        return;
      }
      this.uploader.addFile(event.target.files[0], null, null, null, '');
      this.uploader.startUpload();
    }
  }
};
</script>
