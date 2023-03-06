import type { Entity } from 'cesium'
import useCesium, { type CesiumPos } from './useCesium'
const Cesium = useCesium()
export interface EntityOptions {
  icon: any,
  size: number[],
  position: CesiumPos,
  offset?: number[]
}

export default function useCesiumMarker () {
  // 创建点位实体
  const createMarker = (options: EntityOptions) => {
    const { icon, size, position, offset = [0, 0] } = options
    const alt = position.alt || 0
    const cartesian = Cesium.Cartesian3.fromDegrees(+position.lng, +position.lat, +alt)
    let marker:Entity = new Cesium.Entity({
      position: cartesian,
      billboard: {
        image: icon,
        // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        width: size[0], // default: undefined
        height: size[1],
        // scaleByDistance: {
        //   near: 50.0, nearValue: 4.0, far: 1800, farValue: 0.5
        // },
        pixelOffset: new Cesium.Cartesian2(...offset)
      }
    })
    return marker
  }

  // 设置点位位置
  const setMarkerPos = (position:CesiumPos, marker: Entity) => {
    const cartesian = Cesium.Cartesian3.fromDegrees(+position.lng, +position.lat, +(position.alt || 0))
    marker.position = new Cesium.ConstantPositionProperty(cartesian)
  }

  // 切换点位显示/隐藏
  const changeMarkerVisible = (visible: boolean, marker: Entity) => {
    marker.show = visible
  }
  return {
    createMarker,
    setMarkerPos,
    changeMarkerVisible,
  }
}
