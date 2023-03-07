import axios from './index'
type DeviceListParams = {
  pageNum: number,
  pageSize: number,
  regionId?: number,
  name?: string // 区域名称，模糊查询
}
// 获取区域列表
export const querDeviceList = (params: DeviceListParams) => {
  const { pageNum, pageSize, name = '', regionId } = params
  return axios.get('/region/query_region_list', {
    params: { pageNum, pageSize, name, regionId }
  })
}
// new Array(5).fill(null).map((i, index) => {
//   return {
//     name: '区域' + index,
//     id: index,
//     children: new Array(Math.random() * 10).fill(null).map((i, innerIndex) => ({
//       name: '区域' + index + '_' + innerIndex,
//       id: index + innerIndex + 100
//     }))
//   }
// })
// 增加区域
// 删除区域
// 修改区域



