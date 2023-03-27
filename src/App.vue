<template>
  <div id="loading-page">
    <img class="loading-icon" src="/loading.png" alt="">
  </div>

  <a-config-provider :locale="locale">
    <RouterView class="pos-rel over-hidden full" />
  </a-config-provider>
  <div class="pos-abs bg-blue-top block page-footer">
    <div style="width:300px;margin:0 auto; padding:20px 0;">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34082202000368" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="@/assets/icon/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#fff;">皖公网安备 34082202000368号</p></a>
		 	</div>
  </div>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  const locale = zhCN
  dayjs.locale('zh-cn');
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 600px;
}
#app {
  background-color: @bgBlue;
  color: #fff;
  overflow: auto;
  position: relative;
  .page-footer {
    z-index: 1000;
    bottom: 0;
  }
}
#loading-page {
  position: absolute;
  z-index: 9999;
  background-color: rgba(22, 200, 206, 0.2);
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 600px;
}
#loading-page .loading-icon {
  width: 34px;
  height: 34px;
  opacity: 0.5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: loading 1.5s ease infinite;
}
@keyframes loading {
  from {
    opacity: 0.5;
    transform: rotate(0);
  }
  to {
    opacity: 1;
    transform: rotate(360deg);
  }
}
</style>