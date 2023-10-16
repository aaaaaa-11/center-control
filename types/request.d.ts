/* 请求相关类型 */

interface ResponseData<T> {
  data: T;
  code: number;
  msg: string;
}

interface LoginData extends ResponseData {
  data: {
    name: string;
  }
}

// 响应数据类型
interface ResponseRes extends Response {
  data: ResponseData;
}

interface LoginResponse extends ResponseRes {
  data: LoginData
}