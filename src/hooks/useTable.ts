import { reactive, ref } from 'vue'
import { createRole, deleteRole, queryRoleList, updateRole } from '@/api/role'
import { createUser, deleteUser, queryUserList, updateUser } from '@/api/user'
import useRequest from './useRequest'

export enum DATATYPES {
  ROLE = 'role',
  USER = 'user',
}
export enum ACTIONTYPES {
  GET = 'get',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}
const actions = {
  [DATATYPES.ROLE]: {
    [ACTIONTYPES.GET]: queryRoleList,
    [ACTIONTYPES.EDIT]: updateRole,
    [ACTIONTYPES.ADD]: createRole,
    [ACTIONTYPES.DELETE]: deleteRole,
  },
  [DATATYPES.USER]: {
    [ACTIONTYPES.GET]: queryUserList,
    [ACTIONTYPES.EDIT]: updateUser,
    [ACTIONTYPES.ADD]: createUser,
    [ACTIONTYPES.DELETE]: deleteUser,
  },
}

export default function useTable(tableType: DATATYPES) {
  const tableActions = actions[tableType]
  const { loading, sendRequest } = useRequest()

  const page = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  const tableData = ref([])

  const getData = (params: any) => {
    sendRequest(
      tableActions[ACTIONTYPES.GET]({
        ...params,
        ...page,
      })
    )
      .then((res: any) => {
        const { list, total } = res.data
        tableData.value = list
        page.total = total
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addData = (params: any, callback?: (params?: any) => any) => {
    sendRequest(tableActions[ACTIONTYPES.ADD](params))
      .then((res) => {
        callback?.(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editData = (params: any, callback?: (params?: any) => any) => {
    sendRequest(tableActions[ACTIONTYPES.EDIT](params))
      .then((res) => {
        callback?.(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteData = (params: any, callback?: (params?: any) => any) => {
    sendRequest(tableActions[ACTIONTYPES.DELETE](params))
      .then((res) => {
        callback?.(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    getData,
    addData,
    editData,
    deleteData,
    loading,
    page,
    tableData,
  }
}
