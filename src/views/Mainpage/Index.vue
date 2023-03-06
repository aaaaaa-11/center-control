<template>
  <div class="main-page">
    <section class="bg-blue-right main-page-side main-page-left">
      <DeviceTree />
      <MapTools/>
    </section>
    <section class="bg-blue-left main-page-side main-page-right">
      <RightPanel />
    </section>
  </div>
</template>

<script setup lang="ts">
import MapTools from './MapTools.vue'
import DeviceTree from './DeviceTree.vue'
import RightPanel from './RightPanel.vue';
</script>

<style lang="less">
.main-page {
  width: 100%;
  &-side {
    top: 0px;
    bottom: 10px;
    width: 340px;
    position: absolute;
    z-index: 10;
  }
  &-left {
    padding: 20px;
    left: 10px;
  }
  &-right {
    right: 10px;
  }
}
</style>