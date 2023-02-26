import useCesium from './useCesium'
const Cesium = useCesium()

export default function useCesiumTiles () {
  let tileset:any;
  const createCesium3DTileset = (viewer:any) => {
    tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(69380),
      })
    );
    return tileset
  }
  const readyPromise = () => {
    return tileset.readyPromise
  }
  return {
    createCesium3DTileset
  }
}
