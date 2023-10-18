<template>
  <a-modal v-model:open="open" title="用户" @ok="handleOk" @cancel="closeModal">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="用户名称"
        name="userName"
        :rules="[{ required: true, message: '请输入用户名称' }]"
      >
        <a-input v-model:value="formState.userName" />
      </a-form-item>
      <a-form-item
        label="手机号"
        name="phone"
        :rules="[
          { required: true, pattern: phoneReg, message: '请输入手机号' },
        ]"
      >
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ pattern: pwReg, message: '密码由6-20位数字、字母组合' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{ validator: validateConfirmPwd }]"
      >
        <a-input-password v-model:value="formState.confirmPassword" />
      </a-form-item>
      <a-form-item
        label="角色"
        name="roleId"
        :rules="[{ required: true, message: '请选择角色' }]"
      >
        <a-select ref="select" v-model:value="formState.roleId">
          <a-select-option
            v-for="role in roleList"
            :key="role.value"
            :value="role.value"
          >
            {{ role.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { queryRoleList } from '@/api/role'
import { phoneReg, pwReg } from '@/utils/Regexp'

type RoleList = {
  value: string
  label: string
}

interface FormState {
  userId?: number
  userName?: string
  password?: string
  confirmPassword?: string
  phone?: string
  roleId?: number
  roleName?: string
}

defineProps<{
  modalType: string
}>()

const emits = defineEmits<{
  (e: string): void
  (e: string, formState: FormState): void
}>()

const formRef = ref<FormInstance>()

// 表单字段
const formState = reactive<FormState>({})

// 所有角色列表
const roleList = ref<RoleList[]>([])

// 请求角色列表
const getRoleList = () => {
  queryRoleList({
    pageNum: 1,
    pageSize: 999,
  }).then((res) => {
    const { code, data, msg } = res.data

    if (code === 0) {
      roleList.value = data.list.map((r: Role) => ({
        value: r.roleId,
        label: r.roleName,
      }))
    } else {
      message.error(msg)
    }
  })
}

getRoleList()

const validateConfirmPwd = async (_rule: Rule, value: string) => {
  if (value !== formState.password) {
    return Promise.reject('两次密码不一致')
  } else {
    return Promise.resolve()
  }
}

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
  if (currentItem.userId) {
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
