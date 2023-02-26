import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCesiumMap from '@/hooks/cesium/useCesiumMap'
const { initCesiumMap, create3Dtileset } = useCesiumMap()

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
  return {
    mapType,
    initMap,
    pageMap
  }
})
