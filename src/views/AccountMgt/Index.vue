<template>
  <div class="bg-page bg-page-show full table-page">
    <a-form class="form" ref="formRef" layout="inline" :model="formState">
      <a-form-item name="name">
        <a-input
          class="filter-input default-input"
          placeholder="请输入用户名称"
          v-model:value="formState.name"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          v-has-show="'accountMgt:query'"
          type="warn"
          @click="getData(formState)"
        >
          查询
        </a-button>
      </a-form-item>
      <a-form-item class="form-item-btn">
        <a-button v-has-show="'accountMgt:add'" type="primary" @click="addUser">
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      class="table"
      :dataSource="tableData"
      :columns="columns"
      :loading="loading"
      :pagination="{
        hideOnSinglePage: true,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button
              type="primary"
              v-has-show:admin="'accountMgt:edit'"
              @click="editUser(record)"
            >
              编辑
            </a-button>
            <a-button
              type="primary"
              danger
              v-has-show:admin="'accountMgt:delete'"
              @click="deleteUser(record)"
            >
              删除
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <UserModal
      ref="modalRef"
      :currentItem="currentItem"
      :modalType="modalType"
      @close="closeModal"
      @submit="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useTable, { DATATYPES } from '@/hooks/useTable'
import columns from './columns'
import UserModal from './UserModal.vue'
import useModal from '@/hooks/useModal'

interface FormState {
  userId?: number
  userName: string
  roleId?: number
  roleName?: string
}

const formState = reactive({
  name: '',
})
const { tableData, getData, loading, addData, editData, deleteData } = useTable(
  DATATYPES.USER
)
getData(formState)

const {
  modalRef,
  modalType,
  addItem,
  editItem,
  deleteItem,
  closeModal,
  openModal,
} = useModal()

const currentItem = {
  permission: [],
}

const editUser = (item: User) => {
  Object.assign(currentItem, item)
  editItem()
  openModal(currentItem)
}

const deleteUser = (item: User) => {
  deleteItem(() => {
    deleteData(item.userId, getData)
  })
}

const addUser = () => {
  addItem()
}

const submitForm = (formState: FormState) => {
  modalType.value === 'add' && addData(formState, getData)
  modalType.value === 'edit' && editData(formState, getData)
  closeModal()
}
</script>

<style></style>
