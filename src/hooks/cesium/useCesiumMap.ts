import config from '@/config'
import type { WallOptions } from './useArrowWall'
import useArrowWall from './useArrowWall'
import useCesium from './useCesium'
import useCesiumTiles from './useCesiumTiles'
import CesiumEntify from './userCesiumEntity'
import type { EntityOptions } from './userCesiumEntity'
import markerIcon from '@/assets/icon/position.png'

const Cesium = useCesium()
const { createCesium3DTileset } = useCesiumTiles()
const { createWall, changeVisible } = useArrowWall()

export type CesiumPos = {
  lng: number;
  lat: number;
  alt?: number;
  pitch?: number,
  heading?: number,
  duration?: number,
  stay?: number
}
type WaterItem = {
  data: Array<CesiumPos>,
  alt?: number
}
type WaterDataType = Array<WaterItem>
let markerInstances:any = {}
export default function useCesiumMap () {
  let viewer:any = null
  // 初始化cesium地图
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

  // 切换视角
  const setCesiumViewer = ({ lng, lat, alt = 500, pitch = 0, heading = 0 }: CesiumPos) => {
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

  // 初始化水面
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

  // 加载3d模型，目前先用cesium上提供的一个模型
  const create3Dtileset = (water: boolean, waterData: WaterDataType = []) => {
    const tileset = createCesium3DTileset(viewer)
    tileset.readyPromise.then(() => {
      water && initWater(tileset, waterData)
      config.cameraTo ? setCesiumViewer(config.cameraTo) : viewer.zoomTo(tileset)
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

  // 获取摄像机视角
  const getCameraPos = () => {
    console.log('getCameraPos');
    const cartographic = viewer.camera.positionCartographic
    const lat = Cesium.Math.toDegrees(cartographic.latitude)
    const lng = Cesium.Math.toDegrees(cartographic.longitude)
    const alt = cartographic.height
    const pitch = Cesium.Math.toDegrees(viewer.camera.pitch) + 90
    const heading = Cesium.Math.toDegrees(viewer.camera.heading)
    return { lng, lat, alt, pitch, heading }
  }

  // 视角移动
  const cesiumFlyTo = (pos:CesiumPos) => {
    const { lng, lat, alt = 500, pitch = 0, heading = 0, duration = 3, stay = 1 } = pos
    const pitchInRadians = Cesium.Math.toRadians(pitch - 90)
    const headingInRadians = Cesium.Math.toRadians(heading)
    return new Promise((resolve, reject) => {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(+lng, +lat, +alt),
        orientation: {
          heading: headingInRadians,
          pitch: pitchInRadians,
          roll: 0.0
        },
        duration: duration,
        easingFunction: Cesium.EasingFunction.LINEAR_NONE,
        complete: () => {
          setTimeout(() => {
            resolve(1)
          }, stay * 1000)
        }
      })
    })
  }
  // 创建箭头路线
  const createCesiumArrowWall = (options:WallOptions) => {
    return createWall(viewer, options)
  }

  // 创建实体/改变实体显示隐藏
  const changeCesiumMarkers = (markers: Array<any>) => {
    markers.forEach(m => {
      if (!m.lng || !m.lat) return
      console.log('changeCesiumMarkers---', m.visible, markerInstances[m.id]);
      if (markerInstances[m.id]) {
        console.log(m.visible);
        markerInstances[m.id].changeMarkerVisible(m.visible);
      } else if (m.visible) {
        markerInstances[m.id] = new CesiumEntify({
          icon: markerIcon,
          size: [40, 40],
          position: {
            lng: m.lng,
            lat: m.lat,
            alt: m.alt || 500
          }
        }, viewer)
      }
    })
  }
  const removeCesiumMarkers = () => {
    Object.keys(markerInstances).forEach((m:any) => {
      markerInstances[m].removeMarker(viewer)
      markerInstances[m] = undefined
    })
  }
  return {
    initCesiumMap,
    viewer,
    cesiumFlyTo,
    changeWallVisible: changeVisible,
    setCesiumViewer,
    getCameraPos,
    create3Dtileset,
    createCesiumArrowWall,
    changeCesiumMarkers,
    removeCesiumMarkers,
  }
}