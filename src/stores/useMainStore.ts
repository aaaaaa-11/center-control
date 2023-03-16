import { ref } from 'vue'

const loadingPage = ref<boolean>(false)
export default function useMainStore () {

  const switchLoadingPage = (loading: boolean) => {
    loadingPage.value = loading
    console.log('switch', loadingPage.value);
  }
  return {
    loadingPage,
    switchLoadingPage
  }
}
