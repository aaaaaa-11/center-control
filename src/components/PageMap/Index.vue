<template>
  <div class="pos-rel full over-hidden page-map">
    <div class="full map-container" :id="mapId"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMapStore } from '@/stores/useMapStore'
const { initMap } = useMapStore()

let mapId = 'pageMap'


onMounted(() => {
  console.log('initMap', initMap)
  initMap(mapId)
})
</script>

<style lang="less">
.page-map {
  z-index: 1;
  background-color: rgb(94, 179, 179);
}
</style>