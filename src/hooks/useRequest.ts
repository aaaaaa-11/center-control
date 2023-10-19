import { ref } from 'vue'
import type { AxiosResponse } from 'axios'

export default function useRequest() {
  const loading = ref(false)

  const sendRequest = <T>(
    request: Promise<AxiosResponse<ResponseData<T>>>
  ): Promise<ResponseData<T>> => {
    loading.value = true
    return new Promise((resolve, reject) => {
      request
        .then((res) => {
          const { code, msg, data } = res.data
          if (code === 0) {
            resolve(res.data)
          } else {
            reject(new Error(msg))
          }
        })
        .catch((e: Error) => {
          reject(e)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    loading,
    sendRequest,
  }
}
