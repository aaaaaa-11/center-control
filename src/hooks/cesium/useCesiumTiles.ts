import type { Viewer } from 'cesium';
import useCesium, { type CesiumPos } from './useCesium'
const Cesium = useCesium()

export interface WaterItem {
  data: CesiumPos[],
  alt?: number
}

export default function useCesiumTiles () {
  let tileset:any;

  // 加载3d模型，目前先用cesium上提供的一个模型
  const createCesium3DTileset = (viewer:Viewer) => {
    return new Promise((resolve, reject) => {
      tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: Cesium.IonResource.fromAssetId(69380),
        })
      );
      tileset.readyPromise.then(() => {
        // Apply the default style if it exists
        const extras = tileset.asset.extras;
        if (
          Cesium.defined(extras) &&
          Cesium.defined(extras.ion) &&
          Cesium.defined(extras.ion.defaultStyle)
        ) {
          tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
        }
        resolve(null)
      })
    })
  }


  // 初始化水面
  const initWater = (waterData: WaterItem[], color: string) => {
    waterData.forEach(water => {
      const data = water.data.map(i => ({
        ...i,
        alt: water.alt
      }))
      tileset.addWater({
        points: data,
        color,
        wave: 2,
        frequency: 100
      })
    })
  }

  return {
    createCesium3DTileset,
    initWater
  }
}
