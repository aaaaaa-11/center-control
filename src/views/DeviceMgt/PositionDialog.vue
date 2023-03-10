<template>
  <div class="blue-border device-pos-wrap" v-show="visible">
    <p>
      请点击地图，生成点位坐标
      <span class="pos-abs pointer close-icon">X</span>
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
import { message } from 'ant-design-vue';
import { useMapStore } from '@/store/useMapStore';

type nl = number | null
type Pos = {
  lng: nl,
  lat: nl,
  alt: nl,
  id: number
}
const emit = defineEmits<{
  (e:'submit', params:Pos):void
}>()

const visible = ref(false)

const pos = reactive<Pos>({
  lng: null,
  lat: null,
  alt: null,
  id: 0
})
const open = (item:Pos) => {
  useMapStore.switchOpenPos(true)
  visible.value = true
  pos.id = 0
  resetForm()
  Object.assign(pos, item)
  console.log(pos);
}
const submit = () => {
  if (pos.lng && pos.lat && pos.alt) {
    emit('submit', pos)
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
  useMapStore.switchOpenPos(false)
  visible.value = false
}

onBeforeUnmount(() => {
  useMapStore.switchOpenPos(false)
})
defineExpose({
  open,
  close
})
</script>

<style lang="less">
.device-pos-wrap {
  background-color: @boxBgc;
  position: absolute;
  left: 520px;
  top: 0;
  width: 220px;
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