import axios from './index'

export type deviceListData = {
  list: Device[]
  total: number
}

// 获取设备列表
export const queryDeviceList = (params: DevicePageParams) => {
  const { pageNum, pageSize, regionId } = params
  return axios.get<ResponseData<deviceListData>>('/device/query_device_list', {
    params: { pageNum, pageSize, region_id: regionId },
  })
}

// 增加设备
type DeviceItem = Omit<Device, 'id'>
export const createDevice = (params: DeviceItem) => {
  const { regionId, name } = params
  return axios.post<ResponseData<number>>('/device/create_device', {
    region_id: regionId,
    name,
  })
}
// 修改设备
export const updateDevice = (params: Device) => {
  const { regionId, name, id, lng, lat, alt } = params
  return axios.post<ResponseData<number>>('/device/update_device', {
    region_id: regionId,
    name,
    id,
    lng,
    lat,
    alt,
  })
}
// 删除设备
export const deleteDevice = (id: number) => {
  return axios.post<ResponseData<null>>('/device/delete_device', { id })
}
// 批量删除设备
export const deleteDevices = (ids: number[]) => {
  return axios.post<ResponseData<null>>('/device/delete_devices', { ids })
}
