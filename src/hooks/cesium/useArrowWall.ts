import type { Entity, Viewer } from 'cesium'
import useCesium, { type CesiumPos } from './useCesium'
const Cesium = useCesium()

export type WallOptions = {
  clampToGround?: boolean,
  depthTest?: boolean,
  color?: string,
  points?: CesiumPos[],
  width?: number,
  visible: boolean,
}

export default function useCesiumArrowWall () {
  const createWall = (wallOptions: WallOptions) => {
    const { clampToGround = true, depthTest = false, color = '#fbb929', points = [], width = 20 } = wallOptions
    const arr = points.reduce((prev:any, cur) => {
      return [...prev, cur.lng, cur.lat, cur.alt]
    }, [])
    let marker = new Cesium.Entity({
      polyline: {
        clampToGround, // 是否贴地
        depthFailMaterial: depthTest ? undefined : Cesium.Color.fromCssColorString(color), // 被遮挡时的材质，相当于关闭depth test
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(arr),
        width: width,
        zIndex: 0,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(color))
      }
    })
    return marker
  }

  const changeWallVisible = (bool:boolean, marker: Entity) => {
    if (marker) {
      marker.show = bool
    }
  }

  return {
    createWall,
    changeWallVisible,
  }
}
