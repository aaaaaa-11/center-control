import { reactive, ref } from "vue";
import { queryRoleList } from '@/api/role'
import { queryUserList } from '@/api/user'

export enum ACTIONTYPES {
  ROLE = 'role',
  USER = 'user',
}
const actions = {
  [ACTIONTYPES.ROLE]: queryRoleList,
  [ACTIONTYPES.USER]: queryUserList
}

export default function useTable (tableType: ACTIONTYPES) {
  const loading = ref(false)

  const page = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  const tableData = ref([])

  const getData = (params:any) => {
    loading.value = true
    return new Promise((resolve, reject) => {
      actions[tableType]({
        ...params,
        ...page
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 0) {
          const { list, total } = data
          tableData.value = list
          page.total = total
          resolve(res.data)
        } else {
          reject(msg)
        }
      }).catch((e:Error) => {
        reject(e)
      }).finally(() => {
        loading.value = false
      })
    })
  }

  return {
    getData,
    loading,
    page,
    tableData,
  }
}

