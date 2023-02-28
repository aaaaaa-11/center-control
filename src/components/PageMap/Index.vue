<template>
  <div class="pos-rel full over-hidden page-map">
    <div class="full map-container" :id="mapId"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMapStore } from '@/stores/useMapStore'
import type { CesiumPos } from '@/hooks/cesium/useCesiumMap';
const { initMap, getPos, setViewer, flyToPos, createWall, changeWallVisible, changeMarkers, removeMarkers } = useMapStore()

let mapId = 'pageMap'
let wall: any = null

const changeViewer = (pos:CesiumPos) => {
  setViewer(pos)
}
const flyTo = (pos:CesiumPos) => {
  flyToPos(pos)
}
type WallOption = {
  points: Array<CesiumPos>,
  visible: boolean
}
const createArrowWall = (options:WallOption) => {
  const { points, visible } = options
  if (!wall && visible) {
    wall = createWall({ points })
  } else {
    changeWallVisible(visible)
  }
}

onMounted(() => {
  initMap(mapId)

  document.addEventListener('keyup', (e) => {
    if (e.key === 'g') {
      console.log(getPos());
    }
  })
})
onBeforeUnmount(() => {
  removeMarkers()
})
defineExpose({
  changeViewer,
  flyTo,
  createArrowWall,
  changeMarkerVisible: changeMarkers
})
</script>

<style lang="less">
.page-map {
  z-index: 1;
  background-color: rgb(94, 179, 179);
}
</style>