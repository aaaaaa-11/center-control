<template>
  <div class="pos-abs bg-blue-bottom page-header">
    <p class="fs14 pos-abs page-header-left">
      <!-- 访问量：{{ visitInfo }} -->
      {{ time }}
    </p>
    <p class="text-center fs28 bold title" :tm="title">{{ title }}</p>
    <p class="fs14 pos-abs page-header-right">
      您好，{{ userInfo.userName }}
      <span class="text-red logout" @click="logout">退出</span>
    </p>
    <PageMenu />
  </div>
</template>

<script setup lang="ts">
import config from '@/config';
import { useUserStore } from '@/stores/useUserStore';
import dayjs from 'dayjs';
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router';
import PageMenu from './PageMenu.vue';
const $router = useRouter()
const { userInfo, visitInfo, clearUserInfo } = useUserStore()
const title = config.title
const time = ref<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'))
let timer = setInterval(() => {
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
onBeforeUnmount(() => {
  clearInterval(timer)
})

const logout = () => {
  clearUserInfo()
  $router.push({
    name: 'login'
  })
}
</script>

<style lang="less">
.page-header {
  top: 0;
  left: 0;
  width: 100%;
  height: @headerH;
  z-index: 1;
  @lineH: @headerH * 0.5;
  .title {
    height: @lineH;
    line-height: @lineH;
    letter-spacing: 4px;
    -webkit-background-clip: text;
    background-image: linear-gradient(to bottom, #fff, #caebed);
    color: transparent;
  }
  &-left, &-right {
    top: 10px;
  }
  &-left {
   left: 20px;
  }
  &-right {
   right: 20px;
   .logout {
    margin-left: 20px;
    .pointer;
   }
  }
}
</style>