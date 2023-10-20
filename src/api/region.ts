import axios from './index'

type RegionListData = {
  list: Region[]
  total: number
}

// 获取区域列表
export const queryRegionList = (params: PageParams) => {
  const { pageNum, pageSize } = params
  return axios.get<ResponseData<RegionListData>>('/region/query_region_list', {
    params: { pageNum, pageSize },
  })
}
// 增加区域
type RegionItem = Omit<Region, 'id'>
export const createRegion = (params: RegionItem) => {
  const { parentId, title } = params
  return axios.post<ResponseData<number>>('/region/create_region', {
    parent_id: parentId,
    name: title,
  })
}
// 修改区域
export const updateRegion = (params: Region) => {
  const { parentId, title, id } = params
  return axios.post<ResponseData<number>>('/region/update_region', {
    parent_id: parentId,
    name: title,
    id,
  })
}
// 删除区域
export const deleteRegion = (id: number) => {
  return axios.post<ResponseData<null>>('/region/delete_region', { id })
}
// 批量删除区域
export const deleteRegions = (ids: number[]) => {
  return axios.post<ResponseData<null>>('/region/delete_regions', { ids })
}
