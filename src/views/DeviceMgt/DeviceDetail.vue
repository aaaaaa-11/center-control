<template>
  <div class="blue-border device-detail-wrap" v-show="visible">
    <a-space class="tool-buttons">
      <a-button type="primary" @click="addRegion()">
        <template #icon><PlusOutlined /></template>
        添加</a-button>
      <!-- <a-button type="warn" @click="editRegion">
        <template #icon><EditOutlined /></template>
        修改</a-button> -->
      <a-button type="danger" @click="deleteRegion()">
        <template #icon><DeleteOutlined /></template>
        批量删除</a-button>
    </a-space>
    <a-table :dataSource="deviceTable" :columns="columns" :loading="loading" />
    <DeviceDialog ref="deviceDialog" @submit="confirmSubmit" />
  </div>
</template>

<script setup lang='ts'>
import DeviceDialog from './DeviceDialog.vue'
import { reactive, ref } from 'vue'
import {PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useDeviceStore, type DeviceItem, DeviceAction } from '@/stores/useDeviceStore';
import { message } from 'ant-design-vue';
import { tableColumns } from './assets'

const columns = tableColumns

const deviceStore = useDeviceStore()

const region_id = ref<number>(0)

const deviceDialog = ref()
enum DialogType {
  ADD = 'add',
  EDIT = 'edit'
}
const dialogType = ref(DialogType.ADD)
const addRegion = () => {
  dialogType.value = DialogType.ADD
  deviceDialog.value?.open({
    id: 0,
    region_id: region_id.value,
    name: ''
  })
}
const editRegion = () => {
  dialogType.value = DialogType.EDIT
  console.log('edit');
}
type FormState = {
  name: string,
  region_id: number
  id?: number
}
const confirmSubmit = (val:FormState) => {
  const type = dialogType.value === DialogType.ADD ? DeviceAction.c : DeviceAction.u
  deviceStore.deviceAction(type, val).then(res => {
    deviceDialog.value?.close()
    getData()
  }).catch(e => {
    message.error(e.message)
  })
  console.log(val);
}
const deleteRegion = () => {
  message.success('敬请期待')
  console.log('delete');
}

const visible = ref<boolean>(false)

const loading = ref<boolean>(false)
const deviceTable = ref<DeviceItem[]>([])
const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const getData = () => {
  loading.value = true
  deviceStore.getDeviceList({
    ...page,
    region_id: region_id.value
  }).then(res => {
    const { total, list } = res
    deviceTable.value = list
    page.total = total
    loading.value = false
  }).catch(e => {
    message.error(e.message)
    loading.value = false
  })
}
const open = (id:number = 0) => {
  region_id.value = id
  if (id) {
    visible.value = true
    getData()
  } else {
    visible.value = false
  }
}

defineExpose({
  open
})
</script>

<style lang="less">
.device-detail-wrap {
  background-color: @boxBgc;
  position: absolute;
  left: 340px;
  top: 0;
  width: 30%;
  bottom: 10px;
  z-index: 20;
  .tool-buttons {
    width: 100%;
    border-bottom: @blueBorder;
    height: 60px;
    padding: 0 20px;
  }
}
</style>