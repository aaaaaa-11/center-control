<template>
  <div class="blue-border device-detail-wrap" v-show="visible">
    <a-space class="tool-buttons">
      <a-button
        type="primary"
        v-has-show="'deviceMgt:add'"
        @click="addRegion()"
      >
        <template #icon><PlusOutlined /></template>
        添加
      </a-button>
      <!-- <a-button type="warn" @click="editRegion">
        <template #icon><EditOutlined /></template>
        修改</a-button> -->
      <a-button
        type="primary"
        danger
        v-has-show="'deviceMgt:delete'"
        @click="deleteRegion()"
      >
        <template #icon><DeleteOutlined /></template>
        批量删除
      </a-button>
    </a-space>
    <a-table :dataSource="deviceTable" :columns="columns" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button
              type="primary"
              v-has-show="'deviceMgt:edit'"
              @click="editRegion(record)"
            >
              编辑
            </a-button>
            <a-button type="primary" @click="editPos(record)">坐标</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <DeviceDialog ref="deviceDialog" @submit="confirmSubmit" showFooter />
    <PositionDialog ref="positionDialog" @submit="confirmSubmit" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'
import { useDeviceStore } from '@/stores/useDeviceStore'
import { message } from 'ant-design-vue'
import { tableColumns } from './assets'
import DeviceDialog from './DeviceDialog.vue'
import PositionDialog from './PositionDialog.vue'
import { ActionTypes } from '@/stores/useRegionStore'

const columns = tableColumns

const deviceStore = useDeviceStore()
const { getDeviceList, deviceAction } = deviceStore

const regionId = ref<number>(0)

const deviceDialog = ref()
enum DialogType {
  ADD = 'add',
  EDIT = 'edit',
}
type FormState = {
  name: string
  regionId: number
  id?: number
  lng?: number
  lat?: number
  alt?: number
}
const dialogType = ref(DialogType.ADD)

// 增
const addRegion = () => {
  dialogType.value = DialogType.ADD
  deviceDialog.value?.open({
    id: 0,
    regionId: regionId.value,
    name: '',
  })
}
// 改
const editRegion = (item: FormState) => {
  dialogType.value = DialogType.EDIT
  deviceDialog.value?.open(item)
}
// 改坐标
const positionDialog = ref()
const editPos = (item: FormState) => {
  dialogType.value = DialogType.EDIT
  positionDialog.value?.open(item)
}
// 确认增/改
const confirmSubmit = (
  val:
    | FormState
    | {
        lng: number
        lat: number
        alt: number
        id: number
      }
) => {
  const type =
    dialogType.value === DialogType.ADD ? ActionTypes.c : ActionTypes.u
  deviceAction(type, val)
    .then((res) => {
      deviceDialog.value?.close()
      positionDialog.value?.close()
      getData()
    })
    .catch((e) => {
      message.error(e.message)
    })
  console.log(val)
}
// 删
const deleteRegion = () => {
  message.success('敬请期待')
  console.log('delete')
}

// 获取表格数据
const visible = ref<boolean>(false)
const loading = ref<boolean>(false)
const deviceTable = ref<Device[]>([])
const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const getData = () => {
  loading.value = true
  getDeviceList({
    ...page,
    regionId: regionId.value,
  })
    .then((res) => {
      const { total, list } = res
      deviceTable.value = list
      page.total = total
      loading.value = false
    })
    .catch((e) => {
      message.error(e.message)
      loading.value = false
    })
}

// 显示当前面板
const open = (id: number = 0) => {
  regionId.value = id
  if (id) {
    visible.value = true
    getData()
  } else {
    visible.value = false
  }
}

defineExpose({
  open,
})
</script>

<style lang="less">
.device-detail-wrap {
  background-color: @boxBgc;
  position: absolute;
  left: 340px;
  top: 0;
  width: 500px;
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
