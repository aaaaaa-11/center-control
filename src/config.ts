// 一些全局配置
const currentHostname = window.location.hostname
const dev = currentHostname.includes('localhost')
const publicHostname = '127.0.0.1'
const hostname = dev ? publicHostname : currentHostname

export default {
  title: '总控演示系统',
  baseURL: `http://${hostname}:16789/center-control`,
  cameraTo: {
    lng: 144.94385694652598,
    lat: -37.86303316113539,
    alt: 3206.1195804532713,
    pitch: 61.30164496795608,
    heading: 360,
  },
  overlookPos: {
    lng: 144.95719947366646,
    lat: -37.80623914866371,
    alt: 6764.24215745795,
    pitch: 0,
    heading: 359.99999999999994,
  },
  waterColor: '#122F32',
  navList: [
    // 页面菜单，后期做一下菜单管理，从后台获取
    {
      name: '首页',
      routeName: 'mainpage',
      auth: 'mainpage',
    },
    {
      name: '大数据中心',
      routeName: 'datacenter',
      auth: 'datacenter',
    },
    {
      name: '监控播放',
      routeName: 'camera',
      auth: 'camera',
      link: `http://dongpeipei.top/video-players`,
    },
    {
      name: '操作日志',
      routeName: 'log',
      auth: 'log',
    },
    {
      name: '数据管理后台',
      link: 'http://test-link',
      auth: 'link',
    },
    {
      name: '配置管理',
      children: [
        {
          name: '区域管理',
          routeName: 'regionMgt',
          auth: 'regionMgt',
        },
        {
          name: '设备管理',
          routeName: 'deviceMgt',
          auth: 'deviceMgt',
        },
        {
          name: '角色管理',
          routeName: 'roleMgt',
          auth: 'roleMgt',
        },
        {
          name: '账号管理',
          routeName: 'accountMgt',
          auth: 'accountMgt',
        },
      ],
    },
  ],
}
