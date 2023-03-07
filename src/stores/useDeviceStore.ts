import { ref } from 'vue'
import { defineStore } from 'pinia'
import { querDeviceList } from '@/api/device'

export interface DeviceItem {
  id: number,
  regionId: number,
  [prosName: string]: any
}

type PageParams = {
  pageNum: number,
  pageSize: number
}
const deviceList = ref<DeviceItem[]>([])

export const useDeviceStore = defineStore('device', () => {

  // 根据分页等条件获取设备列表
  const getDeviceList = <T>(params: PageParams):Promise<T> => {
    return new Promise((resolve, reject) => {
      querDeviceList(params).then((res) => {
        const { data, code, msg } = res.data
        if (code === 0) {
          const list = data.list
          resolve(list)
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
      }).then((res) => {
        deviceList.value = res as DeviceItem[]
        resolve(null)
      }).catch(e => {
        reject(e)
      })
    })
  }

  return {
    deviceList,
    getDeviceList,
    getAllDevices,
  }
})
