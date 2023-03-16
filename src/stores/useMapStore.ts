import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCesiumMap from '@/hooks/cesium/useCesiumMap'
const {
  initCesiumMap,
  create3Dtileset,
  getCameraPos,
  removeAllEntities,
  setCesiumViewer,
  cesiumFlyTo,
  changeCesiumWallVisible,
  changeCesiumMarkers,
  createMarkerByClickCesiumMap,
  viewerOff,
  viewerOn,
  removePreCreateMarker,
} = useCesiumMap()

export const enum MapTypeHooks {
  CESIUM = 'c',
  AMAP = 'a',
}

const mapType = ref<MapTypeHooks>(MapTypeHooks.CESIUM)
export const useMapStore = defineStore('map', () => {

  const mapActions:any = {
    [MapTypeHooks.CESIUM]: {
      initMap: initCesiumMap,
      create3Dtileset,
      getViewer: getCameraPos, // 获取相机视角
      removeAll: removeAllEntities,
      setViewer: setCesiumViewer, // 设置相机视角
      flyTo: cesiumFlyTo,
      changeWallVisible: changeCesiumWallVisible,
      changeMarkersVisible: changeCesiumMarkers,
      createMarkerByClickMap: createMarkerByClickCesiumMap,
      removePreCreateMarker,
    },
    [MapTypeHooks.AMAP]: {
      initMap: () => {}
    }
  }
  
  const mapAction = (aipName: string, ...params: any[]) => {
    const action = mapActions[mapType.value][aipName]
    if (!action) return
    console.log(aipName, params)
    action(...params)
  }

  const switchOpenPos = (open:boolean, cb:any) => {
    if (open) {
      viewerOn('cesiumMap', cb)
    } else {
      viewerOff('cesiumMap', cb)
    }
  }

  return {
    mapType,
    mapAction,
    switchOpenPos,
  }
})
