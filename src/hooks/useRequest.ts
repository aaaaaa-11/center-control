import { ref } from "vue";

export default function useRequest () {
  const loading = ref(false)

  const sendRequest = (request: Promise<any>) => {
    loading.value = true
    return new Promise((resolve, reject) => {
      request.then(res => {
        const { code, msg } = res.data
        if (code === 0) {
          resolve(res.data)
        } else {
          reject(new Error(msg))
        }
      }).catch((e:Error) => {
        reject(e)
      }).finally(() => {
        loading.value = false
      })
    })
  }

  return {
    loading,
    sendRequest
  }
}

