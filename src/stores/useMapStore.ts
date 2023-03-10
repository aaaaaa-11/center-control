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
} = useCesiumMap()

export const enum MapTypeHooks {
  CESIUM = 'c',
  AMAP = 'a',
}

const mapType = ref<MapTypeHooks>(MapTypeHooks.CESIUM)
export const useMapStore = defineStore('map', () => {
  const openPos = ref<boolean>(false) // 开启点位选择，为true时点击地图可返回坐标信息
  const switchOpenPos = (open: boolean) => {
    openPos.value = open
    //   if (open) { // 开启监听
    //     addEventListener // 点击地图时，生成点位
    //   } else {
    //     // 关闭监听
    //   }
  }

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
      createMarkerByClickMap: createMarkerByClickCesiumMap
    },
    [MapTypeHooks.AMAP]: {
      initMap: () => {}
    }
  }
  
  const mapAction = (aipName: string, ...params: any[]) => {
    const action = mapActions[mapType.value][aipName]
    if (!action) return
    console.log(params)
    action(...params)
  }

  return {
    mapType,
    mapAction,
    switchOpenPos,
  }
})
// export const useMapStore = defineStore('map', () => {

//   const mapType = ref<MapTypeHooks>(MapTypeHooks.CESIUM)
//   let pageMap:any = {}

//   const initCesium = (mapId: string) => {
//     pageMap.viewer = initCesiumMap(mapId)
//     create3Dtileset(false)
//   }
//   const initAMap = (mapId: string) => {
//   }
//   const initMap = (mapId: string) => {
//     console.log('initMap');
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       initCesium(mapId)
//     } else {
//       initAMap(mapId)
//     }
//   }

//   const getPos = () => {
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       return getCameraPos()
//     }
//   }
//   const setViewer = (pos:CesiumPos) => {
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       return setCesiumViewer(pos)
//     }
//   }
//   const flyToPos = (pos:CesiumPos) => {
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       return cesiumFlyTo(pos)
//     }
//   }
//   const createWall = (options:WallOptions) => {
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       return createCesiumArrowWall(options)
//     }
//   }
//   const changeMarkers = (markers:Array<any>) => {
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       return changeCesiumMarkers(markers)
//     }
//   }
//   const removeMarkers = () => {
//     if (mapType.value === MapTypeHooks.CESIUM) {
//       return removeCesiumMarkers()
//     }
//   }
//   return {
//     mapType,
//     initMap,
//     setViewer,
//     flyToPos,
//     getPos,
//     pageMap,
//     createWall,
//     changeWallVisible,
//     changeMarkers,
//     removeMarkers,
//   }
// })
