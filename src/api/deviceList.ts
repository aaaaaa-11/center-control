import axios from './index'
// 获取设备列表
type DeviceListParams = {
  pageNum: number,
  pageSize: number,
  deviceName?: string,
  regionId?: number,
}
export const getDeviceList = (params: DeviceListParams) => {
  const { pageNum, pageSize, regionId } = params
  // return axios.post('/device/query_device_list', {
  //   pageNum,
  //   pageSize,
  //   regionId
  // })
  const rId = regionId || 0
  return Promise.resolve({
    data: {
      code: 0,
      msg: 'success',
      data: {
        total: 1,
        list: [
          {
            id: 1,
            regionId: rId,
            lng: 144.94141840985228,
            lat: -37.79901200377621,
            alt: 63.53831949260134,
            regionName: '区域1',
            name: '监控1'
          }
        ]
        // list: new Array(1).fill(null).map((d, index) => ({
        //   id: index + rId + new Date().getTime(),
        //   regionId: rId,
        //   "lng": 144.94697 + index * 0.5,
        //   "lat": -37.819 + index * 0.5,
        //   regionName: '区域' + rId,
        //   name: rId + '监控' + index,
        // }))
      }
    }
  })
}
// 增加设备
// 删除设备
// 修改设备



