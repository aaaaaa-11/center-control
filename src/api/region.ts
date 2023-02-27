import axios from './index'
type RegionListParams = {
  pageNum: number,
  pageSize: number,
  name?: string // 区域名称，模糊查询
}
// 获取区域列表
export const getRegionList = (params: RegionListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get('/region/query_region_list', {
    params: { pageNum, pageSize }
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



