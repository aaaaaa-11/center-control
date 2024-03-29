import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  queryRegionList,
  createRegion,
  updateRegion,
  deleteRegion,
  deleteRegions,
} from '@/api/region'

const regionList = ref<Region[]>([])

export enum ActionTypes {
  c = 'create',
  u = 'update',
  d = 'delete',
  da = 'deleteAll',
}
export const useRegionStore = defineStore('region', () => {
  // 根据分页等条件获取区域
  const getRegionList = (params: PageParams): Promise<Region[]> => {
    return new Promise((resolve, reject) => {
      queryRegionList(params)
        .then((res) => {
          const { data, code, msg } = res.data
          if (code === 0) {
            const list = data.list
            resolve(list)
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
  // 获取所有区域
  const getAllRegions = (): Promise<null> => {
    return new Promise((resolve, reject) => {
      regionList.value = []
      getRegionList({
        pageNum: 1,
        pageSize: 999,
      })
        .then((res) => {
          regionList.value = res
          resolve(null)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  // 操作区域
  const actions = {
    [ActionTypes.c]: createRegion,
    [ActionTypes.u]: updateRegion,
    [ActionTypes.d]: deleteRegion,
    [ActionTypes.da]: deleteRegions,
  }
  const regionAction = (type: ActionTypes, params: any) => {
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
    regionList,
    getRegionList,
    getAllRegions,
    regionAction,
  }
})
