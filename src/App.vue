<template>
  <RouterView />
</template>

<script setup lang="ts">
import {} from 'vue'

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
</style>