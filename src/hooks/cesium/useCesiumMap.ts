import config from '@/config'
import type { Entity, Viewer } from 'cesium'
import useCesium, { type CesiumPos } from './useCesium'
import useArrowWall, { type WallOptions } from './useArrowWall'
import useCesiumTiles, { type WaterItem } from './useCesiumTiles'
import useCesiumMarker from './useCesiumMarker'
import markerIcon from '@/assets/icon/position.png'

const Cesium = useCesium()
const { createCesium3DTileset, initWater } = useCesiumTiles()
const { createMarker } = useCesiumMarker()
const { createWall, changeWallVisible } = useArrowWall()

export interface CesiumMarker {
  id: number;
  lng?: number;
  lat?: number;
  alt?: number;
  visible?: boolean;
  icon?: string;
}

let markerInstances:any = {} // 设备点位
let wallMarker: any // 路线
let preCreateMarker: any // 设备管理里面创建的点位
export default function useCesiumMap () {
  let viewer: Viewer
  // 初始化cesium地图
  const initCesiumMap = (container: string, configOptions?: Viewer.ConstructorOptions) => {
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
      // mapMode2D: true, // 	确定 2D 地图是否可旋转或可以在水平方向上无限滚动
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
  }

  // 切换视角
  const setCesiumViewer = ({ lng, lat, alt = 0, pitch = 0, heading = 0 }: CesiumPos) => {
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

  // 创建3d模型[，初始化水面，切换视角]
  const create3Dtileset = (waterData?: WaterItem[], color: string = config.waterColor) => {
    createCesium3DTileset(viewer).then(() => {
      waterData?.length && initWater(waterData, color)
      config.cameraTo && setCesiumViewer(config.cameraTo)
    })
  }

  // 获取摄像机视角
  const getCameraPos = () => {
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
  const changeCesiumWallVisible = (options:WallOptions) => {
    console.log(options, wallMarker);
    if (!wallMarker) {
      wallMarker = createWall(options)
      viewer.entities.add(wallMarker)
    } else {
      changeWallVisible(options.visible, wallMarker)
    }
  }

  // 创建实体/改变实体显示隐藏
  const changeCesiumMarkers = (markers: CesiumMarker[]) => {
    markers.forEach(m => {
      if (!m.lng || !m.lat) return console.log('坐标信息不全', m);
      if (markerInstances[m.id]) {
        markerInstances[m.id].changeMarkerVisible(m.visible);
      } else if (m.visible) {
        const marker = createMarker({
          icon: m.icon || markerIcon,
          size: [40, 40],
          position: {
            lng: m.lng,
            lat: m.lat,
            alt: m.alt || 50
          }
        })
        markerInstances[m.id] = marker
        viewer.entities.add(marker)
      }
    })
  }
  // 移除markerInstances
  const removeCesiumMarkers = () => {
    Object.keys(markerInstances).forEach((m:any) => {
      removeCesiumEntity(markerInstances[m])
      markerInstances[m] = undefined
    })
  }
  // 移除cesium上的指定实体
  const removeCesiumEntity = (entity: Entity) => {
    viewer.entities.remove(entity)
  }
  // 移除地图上所有实体
  const removeAllEntities = () => {
    removeCesiumMarkers()
    removeCesiumEntity(wallMarker)
    removeCesiumEntity(preCreateMarker)
  }
  // 移除地图上所有实体
  const createMarkerByClickCesiumMap = (m: CesiumMarker) => {
    if (m.lng && m.lat && m.alt) {
      const marker = createMarker({
        icon: m.icon || markerIcon,
        size: [40, 40],
        position: {
          lng: m.lng,
          lat: m.lat,
          alt: m.alt || 50
        }
      })
      preCreateMarker = marker
      viewer.entities.add(marker)
    }
  }
  return {
    initCesiumMap,
    cesiumFlyTo,
    setCesiumViewer,
    getCameraPos,
    create3Dtileset,
    changeCesiumWallVisible,
    changeCesiumMarkers,
    removeCesiumMarkers,
    removeCesiumEntity,
    removeAllEntities,
    createMarkerByClickCesiumMap,
  }
}