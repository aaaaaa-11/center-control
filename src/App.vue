<template>
  <div id="loading-page">
    <img class="loading-icon" src="/loading.png" alt="">
  </div>
  <RouterView class="pos-rel over-hidden full" />
</template>

<script setup lang="ts">
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