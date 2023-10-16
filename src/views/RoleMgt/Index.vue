<template>
  <div class="bg-page bg-page-show full table-page">
    <a-form class="form" ref="formRef" layout="inline" :model="formState">
      <a-form-item name="name">
        <a-input
          class="filter-input default-input"
          placeholder="请输入角色名称"
          v-model:value="formState.name"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          v-has-show="'roleMgt:query'"
          type="warn"
          @click="getData(formState)"
        >
          查询
        </a-button>
      </a-form-item>
      <a-form-item class="form-item-btn">
        <a-button v-has-show="'roleMgt:add'" type="primary" @click="addRole">
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
              v-has-show:admin="'roleMgt:edit'"
              @click="editRole(record)"
            >
              编辑
            </a-button>
            <a-button
              type="primary"
              danger
              v-has-show:admin="'roleMgt:delete'"
              @click="deleteRole(record)"
            >
              删除
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <RoleModel
      ref="modelRef"
      :currentItem="currentItem"
      :modelType="modelType"
      @close="closeModel"
      @submit="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useTable, { DATATYPES } from '@/hooks/useTable'
import columns from './columns'
import RoleModel from './RoleModel.vue'
import useModel from '@/hooks/useModel'

interface FormState {
  roleId?: number
  roleName?: string
  permission: Permission[]
  admin?: boolean
}

const formState = reactive({
  name: '',
})
const { tableData, getData, loading, addData, editData, deleteData } = useTable(
  DATATYPES.ROLE
)
getData(formState)

const { modelRef, modelType, addItem, editItem, closeModel, openModel } =
  useModel()

const currentItem = {
  permission: [],
}

const editRole = (item: Role) => {
  Object.assign(currentItem, item)
  editItem()
  openModel(currentItem)
}

const deleteRole = (item: Role) => {
  deleteData(item.roleId, getData)
}

const addRole = () => {
  addItem()
}

const submitForm = (formState: FormState) => {
  modelType.value === 'add' && addData(formState, getData)
  modelType.value === 'edit' && editData(formState, getData)
  closeModel()
}
</script>

<style></style>
