import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  createDevice,
  deleteDevice,
  deleteDevices,
  queryDeviceList,
  updateDevice,
  type deviceListData,
} from '@/api/device'

const deviceList = ref<Device[]>([])

export enum ActionTypes {
  c = 'create',
  u = 'update',
  d = 'delete',
  da = 'deleteAll',
}
export const useDeviceStore = defineStore('device', () => {
  // 根据分页等条件获取设备列表
  const getDeviceList = (params: DevicePageParams): Promise<deviceListData> => {
    return new Promise((resolve, reject) => {
      queryDeviceList(params)
        .then((res) => {
          const { data, code, msg } = res.data
          if (code === 0) {
            resolve(data)
          } else {
            reject(new Error(msg))
          }
        })
        .catch((e) => {
          console.log(e)
          reject(e)
        })
    })
  }
  // 获取所有设备
  const getAllDevices = (): Promise<null> => {
    return new Promise((resolve, reject) => {
      deviceList.value = []
      getDeviceList({
        pageNum: 1,
        pageSize: 999,
      })
        .then((res) => {
          const { list, total } = res
          deviceList.value = list
          resolve(null)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  // 操作设备
  const actions = {
    [ActionTypes.c]: createDevice,
    [ActionTypes.u]: updateDevice,
    [ActionTypes.d]: deleteDevice,
    [ActionTypes.da]: deleteDevices,
  }
  const deviceAction = (type: ActionTypes, params: any) => {
    debugger
    return new Promise((resolve, reject) => {
      actions[type](params)
        .then((res) => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
          } else {
            reject(new Error(msg))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  return {
    deviceList,
    getDeviceList,
    getAllDevices,
    deviceAction,
  }
})
