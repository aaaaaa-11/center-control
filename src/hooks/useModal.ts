import { ref } from 'vue'
import { Modal } from 'ant-design-vue'

type DialogType = 'add' | 'edit' | ''

export default function useRole() {
  const modalType = ref<DialogType>('')
  const modalRef = ref()

  const editItem = () => {
    modalType.value = 'edit'
  }

  const deleteItem = (callback: () => void, title?: string) => {
    Modal.confirm({
      title: () => title || '确认删除?',
      okText: () => '确认',
      okType: 'danger',
      cancelText: () => '取消',
      onOk() {
        callback()
      },
      onCancel() {},
    })
  }

  const addItem = () => {
    modalType.value = 'add'
    openModal()
  }

  const closeModal = () => {
    modalRef.value?.closeModal()
  }

  const openModal = (item?: any) => {
    modalRef.value?.openModal(item)
  }

  return {
    modalRef,
    modalType,
    editItem,
    deleteItem,
    addItem,
    closeModal,
    openModal,
  }
}
