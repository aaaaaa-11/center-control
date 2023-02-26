import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore, type Permission } from './useUserStore'
import config from '@/config'
import { getRegionList } from '@/api/region'
import { getDeviceList } from '@/api/deviceList'

export type NavItem = {
  name: string,
  routeName?: string,
  link?: string,
  auth: string,
  showChildren?: boolean,
  children?: Array<NavItem>
}
export type NavListType = Array<NavItem>

export type RegionItem = {
  name: string,
  id: number,
  parentId: number | null
}
export type RegionListType = Array<RegionItem>

export type DeviceItem = {
  id: number,
  name: string,
  regionId: number,
  regionName: string,
}
export type DeviceListType = Array<DeviceItem>

const navData: NavListType = JSON.parse(JSON.stringify(config.navList))
export const useMainStore = defineStore('main', () => {
  const { permission } = useUserStore()

  const manuList = computed(():NavListType => {
    return navData.filter(n => {
      if (n.children?.length) {
        n.children = n.children.filter(c => !c.auth || permission[c.auth as keyof Permission])
        return n.children?.length
      } else {
        return !n.auth || permission[n.auth as keyof Permission]
      }
    })
  })

  const regionList = ref<RegionListType>([])
  const getAllRegions = () => {
    return new Promise((resolve, reject) => {
      getRegionList({
        pageNum: 1,
        pageSize: 999
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 0) {
          const list = data.list
          regionList.value = list
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


  const deviceList = ref<DeviceListType>([])
  type DeviceListParams = {
    pageNum: number,
    pageSize: number,
    deviceName?: string,
    regionId?: number,
  }

  const getDevices = (params:DeviceListParams) => {
    return new Promise((resolve, reject) => {
      getDeviceList(params).then(res => {
        const { code, msg, data } = res.data
        if (code === 0) {
          resolve(data.list)
        }else {
          reject(new Error(msg))
        }
      }).catch (e => {
        reject(e)
      })
    })
  }
  return {
    manuList,
    regionList,
    getAllRegions,
    deviceList,
    getDevices,
  }
})
