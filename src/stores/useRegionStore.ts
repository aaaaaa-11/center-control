import { ref } from 'vue'
import { defineStore } from 'pinia'
import { queryRegionList, createRegion, updateRegion, deleteRegion } from '@/api/region'

export interface RegionItem {
  id: number,
  parent_id: number,
  name: string,
  [prosName: string]: any
}

type PageParams = {
  pageNum: number,
  pageSize: number
}
const regionList = ref<RegionItem[]>([])

export enum ActionTypes {
  c = 'create',
  u = 'update',
  d = 'delete'
}
export const useRegionStore = defineStore('region', () => {

  // 根据分页等条件获取区域
  const getRegionList = <T>(params: PageParams):Promise<T> => {
    return new Promise((resolve, reject) => {
      queryRegionList(params).then((res) => {
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
  // 获取所有区域
  const getAllRegions = () => {
    return new Promise((resolve, reject) => {
      regionList.value = []
      getRegionList({
        pageNum: 1,
        pageSize: 999
      }).then((res) => {
        regionList.value = res as RegionItem[]
        resolve(null)
      }).catch(e => {
        reject(e)
      })
    })
  }

  // 操作区域
  const actions = {
    [ActionTypes.c]: createRegion,
    [ActionTypes.u]: updateRegion,
    [ActionTypes.d]: deleteRegion,
  }
  const regionAction = (type: ActionTypes, params: any) => {
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
    regionList,
    getRegionList,
    getAllRegions,
    regionAction
  }
})
