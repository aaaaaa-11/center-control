import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCesiumMap, { type CesiumPos } from '@/hooks/cesium/useCesiumMap'
import type { WallOptions } from '@/hooks/cesium/useArrowWall';
const {
  initCesiumMap,
  create3Dtileset,
  getCameraPos,
  setCesiumViewer,
  cesiumFlyTo,
  createCesiumArrowWall,
  changeWallVisible,
  changeCesiumMarkers,
  removeCesiumMarkers,
} = useCesiumMap()

export const enum MapTypeHooks {
  CESIUM = 'c',
  AMAP = 'a',
}
export const useMapStore = defineStore('map', () => {

  const mapType = ref<MapTypeHooks>(MapTypeHooks.CESIUM)
  let pageMap:any = {}

  const initCesium = (mapId: string) => {
    pageMap.viewer = initCesiumMap(mapId)
    create3Dtileset(false)
  }
  const initAMap = (mapId: string) => {
  }
  const initMap = (mapId: string) => {
    console.log('initMap');
    if (mapType.value === MapTypeHooks.CESIUM) {
      initCesium(mapId)
    } else {
      initAMap(mapId)
    }
  }

  const getPos = () => {
    if (mapType.value === MapTypeHooks.CESIUM) {
      return getCameraPos()
    }
  }
  const setViewer = (pos:CesiumPos) => {
    if (mapType.value === MapTypeHooks.CESIUM) {
      return setCesiumViewer(pos)
    }
  }
  const flyToPos = (pos:CesiumPos) => {
    if (mapType.value === MapTypeHooks.CESIUM) {
      return cesiumFlyTo(pos)
    }
  }
  const createWall = (options:WallOptions) => {
    if (mapType.value === MapTypeHooks.CESIUM) {
      return createCesiumArrowWall(options)
    }
  }
  const changeMarkers = (markers:Array<any>) => {
    if (mapType.value === MapTypeHooks.CESIUM) {
      return changeCesiumMarkers(markers)
    }
  }
  const removeMarkers = () => {
    if (mapType.value === MapTypeHooks.CESIUM) {
      return removeCesiumMarkers()
    }
  }
  return {
    mapType,
    initMap,
    setViewer,
    flyToPos,
    getPos,
    pageMap,
    createWall,
    changeWallVisible,
    changeMarkers,
    removeMarkers,
  }
})
