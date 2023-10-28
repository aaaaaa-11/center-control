<template>
  <a-modal
    v-model:open="visible"
    :width="width"
    :mask="mask"
    wrapClassName="blue-dialog"
  >
    <template #closeIcon>
      <span class="close-icon">x</span>
    </template>
    <div class="title-line">
      {{ title }}
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <slot name="footer">
        <div class="flex flex-between bottom-btns" v-if="showFooter">
          <a-button @click="handleCancle">重置</a-button>
          <a-button :loading="confirmLoading" type="primary" @click="handleOk">
            确认
          </a-button>
        </div>
      </slot>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    width: string
    title: string
    showFooter: boolean
    mask: boolean
    loading: boolean
    confirmLoading: boolean
  }>(),
  {
    width: '600px',
    title: '',
    showFooter: true,
    mask: true,
    loading: false,
    confirmLoading: false,
  }
)

const emit = defineEmits<{
  (e: 'handleCancle'): void
  (e: 'handleOk'): void
}>()

const handleOk = () => {
  emit('handleOk')
}
const handleCancle = () => {
  emit('handleCancle')
}

const visible = ref<boolean>(false)
const open = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close,
})
</script>

<style lang="less">
.blue-dialog {
  .ant-modal-content {
    padding: 20px 0;
    background-color: @blue;
    color: #fff;
    .ant-modal-close {
      width: 30px;
      height: 30px;
      line-height: 30px;
      &-x {
        .close-icon {
          color: #fff;
          font-size: 28px;
        }
      }
    }
    .ant-modal-footer {
      border-top: none;
      padding: 0 1rem;
    }
  }
}
</style>
