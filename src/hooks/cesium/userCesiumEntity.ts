import useCesium from './useCesium'
import type { CesiumPos } from './useCesiumMap';
const Cesium = useCesium()
export type EntityOptions = {
  icon: any,
  size: Array<any>,
  position: CesiumPos,
  offset?: Array<number>
}
export default class CesiumEntity {
  marker: any;
  constructor (options:EntityOptions, viewer:any) {
    const { icon, size, position, offset = [0, 0] } = options
    const alt = position.alt || 10
    const cartesian = Cesium.Cartesian3.fromDegrees(+position.lng, +position.lat, +alt)
    this.marker = new Cesium.Entity({
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
    viewer.entities.add(this.marker)
  }

  setPosition (position:CesiumPos) {
    const cartesian = Cesium.Cartesian3.fromDegrees(+position.lng, +position.lat, +(position.alt || 500))
    this.marker.position = cartesian
  }
  changeMarkerVisible (visible: boolean) {
    this.marker.show = visible
  }
  removeMarker (viewer:any) {
    viewer.entities.remove(this.marker)
  }
}
