import config from '@/config'
import useCesium from './useCesium'
import useCesiumTiles from './useCesiumTiles'
const Cesium = useCesium()
const { createCesium3DTileset } = useCesiumTiles()

type CesiumPos = {
  lng: number;
  lat: number;
  alt?: number;
  pitch?: number,
  heading?: number
}
type WaterItem = {
  data: Array<CesiumPos>,
  alt?: number
}
type WaterDataType = Array<WaterItem>
export default function useCesiumMap () {
  let viewer:any = null
  const initCesiumMap = (container: string, configOptions?: any) => {
    const baseConfig = {
      animation: false, // 创建动画小部件
      baseLayerPicker: false, // 基础图层选项
      fullscreenButton: false, // 全局切换按钮
      vrButton: false, // vr按钮
      geocoder: false, // 地理位置搜索框
      homeButton: false,
      infoBox: false, // 信息框
      sceneModePicker: false, // 视角切换按钮
      selectionIndicator: false, //
      timeline: false,
      navigationHelpButton: false,
      // navigationInstructionsInitiallyVisible: true,
      scene3DOnly: true,// true时，每个几何实例将仅以 3D 形式呈现以节省 GPU 内存
      shouldAnimate: true,
      // clockViewModel // 用于控制当前时间的时钟视图模型
      // selectedImageryProviderViewModel // 当前基础图像层的视图模型，如果未提供，则使用第一个可用的基础层。此值仅在 baseLayerPicker 设置为 true 时有效
      // imageryProviderViewModels // 可从 BaseLayerPicker 中选择的 ProviderViewModel 数组。此值仅在 baseLayerPicker 设置为 true 时有效
      // selectedTerrainProviderViewModel // 当前基础地形层的视图模型，如果未提供，则使用第一个可用的基础层。此值仅在 baseLayerPicker 设置为 true 时有效
      // terrainProviderViewModels // 可从 BaseLayerPicker 中选择的 ProviderViewModel 数组。此值仅在 baseLayerPicker 设置为 true 时有效
      // imageryProvider: true,
      // terrainProvider: true,
      // skyBox // 用于渲染星星的天空盒。当 时undefined，使用默认星号。如果设置为false，则不会添加天空盒、太阳或月亮。
      // skyAtmosphere // 蔚蓝的天空，以及环绕地球边缘的光芒。设置为false将其关闭
      // fullscreenElement, // 按下全屏按钮时要置于全屏模式的元素或 id
      // useDefaultRenderLoop: true, // 如果此小部件应控制渲染循环，则为 True，否则为 false
      // targetFrameRate: true,
      showRenderLoopErrors: false, // 如果为 true，如果出现渲染循环错误，此小部件将自动向用户显示包含错误的 HTML 面板
      // useBrowserRecommendedResolution: true,
      // automaticallyTrackDataSourceClocks: true, // 如果为 true，此小部件将自动跟踪新添加的数据源的时钟设置，并在数据源的时钟发生变化时进行更新。如果您想独立配置时钟，请将此设置为 false
      // contextOptions // 传递给 的上下文和 WebGL 创建属性Scene
      // sceneMode // 初始场景模式。
      // mapProjection: true, // 在 2D 和哥伦布视图模式中使用的地图投影
      // globe: true 在场景中使用的地球仪。如果设置为false，则不会添加地球
      // orderIndependentTranslucency: true,
      // creditContainer // 将包含 的 DOM 元素或 ID CreditDisplay。如果未指定，学分将添加到小部件本身的底部
      // creditViewport // 将包含由 .创建的信用弹出窗口的 DOM 元素或 ID CreditDisplay。如果未指定，它将出现在小部件本身之上
      // dataSources // 	小部件可视化的数据源集合。如果提供此参数，则假定该实例为调用者所有，并且不会在销毁查看器时被销毁
      // shadows: true, // 确定阴影是否由光源投射
      // terrainShadows: true // 	确定地形是否投射或接收来自光源的阴影
      mapMode2D: true, // 	确定 2D 地图是否可旋转或可以在水平方向上无限滚动
      // projectionPicker: false, // 如果设置为 true，将创建 ProjectionPicker 小部件
      // blurActiveElementOnCanvasFocus: true,
      // requestRenderMode: true,
      // maximumRenderTimeChange: true,
      // depthPlaneEllipsoidOffset: true,
      // msaaSamples: true,
    }
    viewer = new Cesium.Viewer(container, {
      ...baseConfig,
      ...configOptions
    })
    return viewer
  }

  const setViewer = ({ lng, lat, alt = 500, pitch = 0, heading = 0 }: CesiumPos) => {
      const pitchInRadians = Cesium.Math.toRadians(pitch - 90)
      const headingInRadians = Cesium.Math.toRadians(heading)
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(+lng, +lat, +alt),
        orientation: {
          heading: headingInRadians,
          pitch: pitchInRadians,
          roll: 0.0
        }
      })
  }

  const initWater = (tileset:any, waterData: WaterDataType) => {
    waterData.forEach(water => {
      const data = water.data.map(i => ({
        ...i,
        alt: water.alt
      }))
      tileset.addWater({
        points: data,
        color: config.waterColor,
        wave: 2,
        frequency: 100
      })
    })
  }

  const create3Dtileset = (water: boolean, waterData: WaterDataType = []) => {
    const tileset = createCesium3DTileset(viewer)
    tileset.readyPromise.then(() => {
      water && initWater(tileset, waterData)
      config.cameraTo ? setViewer(config.cameraTo) : viewer.zoomTo(tileset)
      // Apply the default style if it exists
      const extras = tileset.asset.extras;
      if (
        Cesium.defined(extras) &&
        Cesium.defined(extras.ion) &&
        Cesium.defined(extras.ion.defaultStyle)
      ) {
        tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
      }
    })
  }

  return {
    initCesiumMap,
    viewer,
    create3Dtileset
  }
}