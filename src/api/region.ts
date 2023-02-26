import axios from './index'
type RegionListParams = {
  pageNum: number,
  pageSize: number,
  name?: string // 区域名称，模糊查询
}
// 获取区域列表
export const getRegionList = (params: RegionListParams) => {
  // return axios.post('/region/query_region_list', {})
  return Promise.resolve({
    data: {
      code: 0,
      msg: 'success',
      data: {
        total: 50,
        list: new Array(50).map((i, index) => ({
          id: index + 1,
          name: '区域' + index + 1,
          parentId: Math.floor(Math.random() * 50)
        }))
      }
    }
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



