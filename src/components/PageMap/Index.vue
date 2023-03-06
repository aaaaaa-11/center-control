<template>
  <div class="pos-rel full over-hidden page-map">
    <div class="full map-container" :id="mapId"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMapStore } from '@/stores/useMapStore'
const { mapAction } = useMapStore()

let mapId = 'pageMap'

onMounted(() => {
  mapAction('initMap', mapId)
  mapAction('create3Dtileset')

  document.addEventListener('keyup', (e) => {
    if (e.key === 'g') {
      console.log(mapAction('getViewer'));
    }
  })
})
onBeforeUnmount(() => {
  mapAction('removeAll')
})
</script>

<style lang="less">
.page-map {
  z-index: 1;
  background-color: rgb(94, 179, 179);
}
</style>