<template>
  <a-modal v-model:open="open" title="角色" @ok="handleOk" @cancel="closeModal">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="角色名称"
        name="roleName"
        :rules="[{ required: true, message: '请输入角色名称' }]"
      >
        <a-input v-model:value="formState.roleName" />
      </a-form-item>
      <a-form-item
        label="权限"
        name="permission"
        :rules="[{ required: true, message: '请选择权限' }]"
      >
        <a-checkbox-group v-model:value="formState.permission">
          <a-checkbox v-for="p in permissions" :key="p.value" :value="p.value">
            {{ p.label }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, computed, ref, toRaw, watch } from 'vue'
import { queryPermissionList } from '@/api/role'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

type Pers = {
  value: string
  label: string
}

interface FormState {
  roleId?: number
  roleName: string
  permission: Permission[]
  admin?: boolean
}

const props = defineProps<{
  modalType: string
}>()

const emits = defineEmits<{
  (e: string): void
  (e: string, formState: FormState): void
}>()

const formRef = ref<FormInstance>()

// 表单字段
const formState = reactive<FormState>({
  roleName: '',
  permission: [],
})

// 所有权限列表
const permissions = ref<Pers[]>([])

// 请求权限列表
const getPermissions = () => {
  queryPermissionList().then((res) => {
    const { code, data, msg } = res.data

    if (code === 0) {
      permissions.value = data
    } else {
      message.error(msg)
    }
  })
}

getPermissions()

const handleOk = () => {
  formRef.value
    ?.validate()
    .then(() => {
      emits('submit', toRaw(formState))
    })
    .catch((error) => {
      console.log('error', error)
    })
}

// 弹框开关
const open = ref<boolean>(false)

const openModal = (currentItem: FormState) => {
  open.value = true
  if (currentItem.roleId) {
    Object.assign(formState, currentItem)
  }
}

const closeModal = () => {
  formRef.value?.resetFields()
  open.value = false
}

defineExpose({
  openModal,
  closeModal,
})
</script>
