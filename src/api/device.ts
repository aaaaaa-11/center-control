import axios from './index'
type DeviceListParams = {
  pageNum: number,
  pageSize: number,
  region_id?: number,
  name?: string // 设备名称，模糊查询
}
// 获取设备列表
export const queryDeviceList = (params: DeviceListParams) => {
  const { pageNum, pageSize, name = '', region_id } = params
  return axios.get('/device/query_device_list', {
    params: { pageNum, pageSize, name, region_id }
  })
}
// 增加设备
type DeviceItem = {
  region_id: number,
  name: string,
  id?: number
}
export const createDevice = (params: DeviceItem) => {
  const { region_id, name } = params
  return axios.post('/device/create_device', { region_id, name })
}
// 修改设备
export const updateDevice = (params: DeviceItem) => {
  const { region_id, name, id } = params
  return axios.post('/device/update_device', { region_id, name, id })
}
// 删除设备
export const deleteDevice = (id: number) => {
  return axios.post('/device/delete_device', { id })
}






