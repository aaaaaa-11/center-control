<template>
  <div class="blue-border device-pos-wrap" v-show="visible">
    <p>
      请点击地图，生成点位坐标
      <span class="pos-abs pointer close-icon" @click="close">X</span>
    </p>
    <p>经度：{{ pos.lng }}</p>
    <p>纬度：{{ pos.lat }}</p>
    <p>海拔：{{ pos.alt }}</p>
    <p class="flex flex-between">
      <a-button @click="resetForm">取消</a-button>
      <a-button type="primary" @click="submit">确定</a-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'
import { message } from 'ant-design-vue'
import { useMapStore } from '@/stores/useMapStore'
const { mapAction, switchOpenPos } = useMapStore()

type nl = number | null
type Pos = {
  lng: nl
  lat: nl
  alt: nl
  id: number
}
type Position = {
  lng: number
  lat: number
  alt: number
  id: number
}
const emit = defineEmits<{
  (e: 'submit', params: Position): void
}>()

const visible = ref(false)

const pos = reactive<Pos>({
  lng: null,
  lat: null,
  alt: null,
  id: 0,
})

const setPos = (position: Pos) => {
  const { lng, lat, alt } = position
  pos.lng = lng
  pos.lat = lat
  pos.alt = alt
  mapAction('createMarkerByClickMap', {
    id: new Date().getTime(),
    ...{ lng, lat, alt },
  })
  console.log(pos)
}
const open = (item: Pos) => {
  switchOpenPos(true, setPos)
  visible.value = true
  pos.id = 0
  resetForm()
  Object.assign(pos, item)
  console.log(pos)
}
const submit = () => {
  if (pos.lng && pos.lat && pos.alt) {
    emit('submit', pos as Position)
  } else {
    message.error('请选择地址')
  }
}
const resetForm = () => {
  pos.lng = null
  pos.lat = null
  pos.alt = null
}
const close = () => {
  switchOpenPos(false, setPos)
  mapAction('removePreCreateMarker')
  visible.value = false
}

onBeforeUnmount(() => {
  close()
})
defineExpose({
  open,
  close,
})
</script>

<style lang="less">
.device-pos-wrap {
  background-color: @boxBgc;
  position: absolute;
  left: 520px;
  top: 0;
  width: 250px;
  height: 200px;
  z-index: 20;
  padding: 20px 10px;
  line-height: 2;
  .close-icon {
    right: 10px;
    top: 10px;
  }
}
</style>
