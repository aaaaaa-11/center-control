/* 请求相关类型 */

interface PageParams {
  pageNum: number
  pageSize: number
}

interface PageParamsWithName {
  pageNum: number
  pageSize: number
  name?: string // 使用name模糊查询
}
