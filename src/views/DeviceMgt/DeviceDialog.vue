<template>
  <BlueDialog
    ref="dialog"
    :showFooter="false"
    @handle-ok="submitForm"
    @handle-cancle="resetForm"
  >
    <template #content>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="设备名称" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </template>
  </BlueDialog>
</template>

<script setup lang="ts">
import BlueDialog from '@/components/BlueDialog.vue'
import { ref, reactive } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
console.log('dialog', BlueDialog)

type FormState = {
  name: string
  regionId: number
  id?: number
}
const emit = defineEmits<{
  (e: 'submit', params: FormState): void
}>()
const formRules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      max: 20,
      message: '请输入设备名称，不要超过20个字',
      trigger: 'change',
    },
  ],
}

const dialog = ref()

const formState = reactive<FormState>({
  name: '',
  regionId: 0,
  id: 0,
})
const open = (item: FormState) => {
  dialog.value?.open()
  resetForm()
  Object.assign(formState, item)
  console.log(formState)
}
const formRef = ref()
const submitForm = () => {
  emit('submit', formState)
}
const resetForm = () => {
  formRef.value?.resetFields()
}
const close = () => {
  dialog.value.close()
  resetForm()
}
defineExpose({
  open,
  close,
})
</script>

<style></style>
