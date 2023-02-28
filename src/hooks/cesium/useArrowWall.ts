import useCesium from './useCesium'
import type { CesiumPos } from './useCesiumMap'
const Cesium = useCesium()

export type WallOptions = {
  clampToGround?: boolean,
  depthTest?: boolean,
  color?: string,
  points?: Array<CesiumPos>,
  width?: number,
}
export default function useCesiumArrowWall () {
  let marker:any  = null
  const createWall = (viewer:any, wallOptions: WallOptions) => {
    const { clampToGround = false, depthTest = false, color = '#fbb929', points = [], width = 30 } = wallOptions
    const arr = points.reduce((prev:any, cur) => {
      return [...prev, cur.lng, cur.lat, cur.alt]
    }, [])
    marker = new Cesium.Entity({
      polyline: {
        clampToGround, // 是否贴地
        depthFailMaterial: depthTest ? undefined : Cesium.Color.fromCssColorString(color), // 被遮挡时的材质，相当于关闭depth test
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(arr),
        width: width,
        zIndex: 0,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(color))
      }
    })
    viewer.entities.add(marker)
  }

  const changeVisible = (bool:boolean) => {
    if (marker) {
      marker.show = bool
    }
  }

  return {
    marker,
    createWall,
    changeVisible
  }
}
