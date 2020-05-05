<template>
  <div class="prism-player" id="J_prismPlayer"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    R.Player.auth().then(resp => {
      console.log('respsss', resp);
      // eslint-disable-next-line no-new
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-new
      new Aliplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '500px',
        autoplay: false,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        autoPlayDelay: 2,
        autoPlayDelayDisplayText: '正在加载中...',
        loadDataTimeout: '',
        controlBarVisibility: 'hover',
        useH5Prism: true,
        // 播放方式二：点播用户推荐
        vid: resp.VideoMeta.VideoId,
        playauth: resp.PlayAuth,
        cover: resp.VideoMeta.CoverURL,
        encryptType: 1 // 当播放私有加密流时需要设置。
      });
    });
  }
};
</script>
