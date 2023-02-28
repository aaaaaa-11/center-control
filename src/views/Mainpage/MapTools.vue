<template>
  <div class="flex flex-between flex-wrap main-map-tools">
    <span
      :class="`text-center blue-btn btn-tool ${t.active ? 'blue-btn--active' : ''}`"
      v-for="t in tools"
      :key="t.label"
      @click="handleAction(t)">{{ t.label }}</span>
  </div>
</template>

<script setup lang="ts">
import config from '@/config';
import { reactive } from 'vue'
import roamData from '@/views/Mainpage/roamData.json'
import busData from '@/views/Mainpage/busData.json'
import type { CesiumPos } from '@/hooks/cesium/useCesiumMap';

const emit = defineEmits(['changeViewer', 'flyTo', 'createArrowWall'])
// 工具/操作种类
const enum TOOLHOOKS {
  OVERLOOK = 'o',
  ROAMING = 'r',
  BUSROUTES = 'b'
}
type ToolItem = {
  label: string,
  value: TOOLHOOKS,
  active: boolean,
}
const tools = reactive<Array<ToolItem>>([
  {
    label: '俯瞰图',
    value: TOOLHOOKS.OVERLOOK,
    active: false
  },
  {
    label: '漫游',
    value: TOOLHOOKS.ROAMING,
    active: false
  },
  {
    label: '公交路线',
    value: TOOLHOOKS.BUSROUTES,
    active: false
  },
])

// 俯瞰视角切换
const overlookAction = (active:boolean) => {
  const views = active ? config.overlookPos : config.cameraTo
  emit('changeViewer', views)
}

// 定时切换视角（漫游ing）
let roamTimer:any = 0
let duration = 4000
const roaming = (data:Array<CesiumPos>) => {
  roamTimer = setTimeout(() => {
    if (data.length) {
      emit('flyTo', data.pop())
      roaming(data)
    } else {
      tools[1].active = false
      clearTimeout(roamTimer)
    }
  }, duration)
}
// 切换漫游状态
const roamingAction = (active:boolean) => {
  clearTimeout(roamTimer)
  if (!active) {
    return
  }
  const data = JSON.parse(JSON.stringify(roamData))
  emit('flyTo', data.pop())
  roaming(data)
}
// 切换公交路线展示
const showBusRoutes = (visible: boolean) => {
  emit('createArrowWall', { points: busData, visible })
}

const toolsAction = {
  [TOOLHOOKS.OVERLOOK]: overlookAction,
  [TOOLHOOKS.ROAMING]: roamingAction,
  [TOOLHOOKS.BUSROUTES]: showBusRoutes,
}

const handleAction = (t:ToolItem) => {
  t.active = !t.active
  toolsAction[t.value](t.active)
}
</script>

<style lang="less">
.main-map-tools {
  height: 150px;
  .btn-tool {
    width: 40%;
    height: 40px;
    line-height: 40px;
  }
}
</style>