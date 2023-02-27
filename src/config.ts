// 一些全局配置
const currentHostname = window.location.hostname
const dev = currentHostname.includes('localhost')
const publicHostname = '127.0.0.1'
const hostname = dev ? publicHostname : currentHostname

export default {
  title: '总控演示系统',
  baseURL: `http://${hostname}:16789/center-control`,
  cameraTo: null, // { lng, lat, ...}
  waterColor: '#122F32',
  navList: [ // 页面菜单，后期做一下菜单管理，从后台获取
    {
      name: '首页',
      routeName: 'mainpage',
      auth: 'mainpage'
    },
    {
      name: '大数据中心',
      routeName: 'datacenter',
      auth: 'datacenter'
    },
    {
      name: '监控播放',
      routeName: 'camera',
      auth: 'camera'
    },
    {
      name: '操作日志',
      routeName: 'log',
      auth: 'log'
    },
    {
      name: '数据管理后台',
      link: 'http://test-link',
      auth: 'link'
    },
    {
      name: '配置管理',
      children: [
        {
          name: '区域管理',
          routeName: 'regionMgt',
          auth: 'regionMgt'
        },
        {
          name: '设备管理',
          routeName: 'deviceMgt',
          auth: 'deviceMgt'
        },
        {
          name: '角色管理',
          routeName: 'roleMgt',
          auth: 'roleMgt'
        },
        {
          name: '账号管理',
          routeName: 'accountMgt',
          auth: 'accountMgt'
        },
      ]
    },
  ]
}
