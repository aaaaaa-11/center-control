<template>
  <div class="full over-hidden pos-rel home-page">
    <PageMap ref="pageMap" />
    <PageHeader />
    <RouterView class="pos-abs router-page"
      @changeViewer="changeViewer"
      @flyTo="flyTo"
      @createArrowWall="createArrowWall"
      @changeMarkerVisible="changeMarkerVisible"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageMap from '@/components/PageMap/Index.vue'
import PageHeader from '@/components/PageHeader/Index.vue'
import { useMainStore } from '@/stores/useMainStore';
import type { CesiumPos } from '@/hooks/cesium/useCesiumMap';
const { getAllRegions } = useMainStore()
getAllRegions()

const pageMap = ref()
const changeViewer = (pos:CesiumPos) => {
  pageMap.value.changeViewer(pos)
}
const flyTo = (pos:CesiumPos) => {
  pageMap.value.flyTo(pos)
}
type WallOption = {
  points: Array<CesiumPos>,
  visible: boolean
}
const createArrowWall = (options:WallOption) => {
  pageMap.value.createArrowWall(options)
}
const changeMarkerVisible = (options:Array<any>) => {
  pageMap.value.changeMarkerVisible(options)
}
</script>

<style lang="less">
.home-page {
  @height: @headerH + 10px;
  .router-page {
    top: @height;
    height: calc(100% - @height);
  }
}
</style>