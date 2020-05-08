<template>
  <div ref="qiniuPlayer"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    R.Player.auth().then(resp => {
      // eslint-disable-next-line no-new
      new QPlayer({
        url: 'https://image.twho.top/abcdef.mp4',
        container: this.$refs.qiniuPlayer,
        autoplay: true,
        isLive: true
      });
    });
  }
};
</script>
