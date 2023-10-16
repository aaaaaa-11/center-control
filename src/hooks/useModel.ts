import { ref } from 'vue'

type DialogType = 'add' | 'edit' | ''

export default function useRole() {
  const modelType = ref<DialogType>('')
  const modelRef = ref()

  const editItem = () => {
    modelType.value = 'edit'
  }

  const deleteItem = () => {}

  const addItem = () => {
    modelType.value = 'add'
    openModel()
  }

  const closeModel = () => {
    modelRef.value?.closeModel()
  }

  const openModel = (item?: any) => {
    modelRef.value?.openModel(item)
  }

  return {
    modelRef,
    modelType,
    editItem,
    deleteItem,
    addItem,
    closeModel,
    openModel,
  }
}
