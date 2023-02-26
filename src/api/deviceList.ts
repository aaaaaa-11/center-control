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
        total: 10,
        list: new Array(10).fill(null).map((d, index) => ({
          id: index + rId + new Date().getTime(),
          regionId: rId,
          regionName: '区域' + rId,
          name: rId + '监控' + index,
        }))
      }
    }
  })
}
// 增加设备
// 删除设备
// 修改设备



