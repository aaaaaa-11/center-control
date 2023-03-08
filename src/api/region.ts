import axios from './index'
type RegionListParams = {
  pageNum: number,
  pageSize: number,
  name?: string // 区域名称，模糊查询
}
// 获取区域列表
export const queryRegionList = (params: RegionListParams) => {
  const { pageNum, pageSize, name = '' } = params
  return axios.get('/region/query_region_list', {
    params: { pageNum, pageSize, name }
  })
}
// 增加区域
type RegionItem = {
  parent_id: number,
  title: string,
  id?: number
}
export const createRegion = (params: RegionItem) => {
  const { parent_id, title } = params
  return axios.post('/region/create_region', { parent_id, name: title })
}
// 修改区域
export const updateRegion = (params: RegionItem) => {
  const { parent_id, title, id } = params
  return axios.post('/region/update_region', { parent_id, name: title, id })
}
// 删除区域
export const deleteRegion = (id: number) => {
  return axios.post('/region/delete_region', { id })
}



