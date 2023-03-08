import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createDevice, deleteDevice, queryDeviceList, updateDevice } from '@/api/device'

export interface DeviceItem {
  id: number,
  regionId: number,
  [prosName: string]: any
}

type PageParams = {
  pageNum: number,
  pageSize: number,
  region_id?: number
}
const deviceList = ref<DeviceItem[]>([])
export enum DeviceAction {
  c = 'create',
  u = 'update',
  d = 'delete'
}
export const useDeviceStore = defineStore('device', () => {

  // 根据分页等条件获取设备列表
  type Res = { total:number, list: DeviceItem[] }
  const getDeviceList = (params: PageParams):Promise<Res> => {
    return new Promise((resolve, reject) => {
      queryDeviceList(params).then((res) => {
        const { data, code, msg } = res.data
        if (code === 0) {
          resolve(data)
        } else {
          reject(new Error(msg))
        }
      }).catch(e => {
        console.log(e);
        reject(e)
      })
    })
  }
  const getAllDevices = () => {
    return new Promise((resolve, reject) => {
      deviceList.value = []
      getDeviceList({
        pageNum: 1,
        pageSize: 999
      }).then((res: Res) => {
        const list = res.list
        deviceList.value = list
        resolve(null)
      }).catch(e => {
        reject(e)
      })
    })
  }
  // 操作设备
  const actions = {
    [DeviceAction.c]: createDevice,
    [DeviceAction.u]: updateDevice,
    [DeviceAction.d]: deleteDevice,
  }
  const deviceAction = (type: DeviceAction, params: any) => {
    return new Promise((resolve, reject) => {
      actions[type](params).then(res => {
        const { code, data, msg } = res.data
        if (code === 0) {
          resolve(data)
        } else {
          reject(new Error(msg))
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  return {
    deviceList,
    getDeviceList,
    getAllDevices,
    deviceAction
  }
})
