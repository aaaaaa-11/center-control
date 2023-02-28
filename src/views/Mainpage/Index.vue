<template>
  <div class="main-page">
    <section class="bg-blue-right main-page-side main-page-left">
      <a-tree
        class="device-tree"
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        @check="checkItems"
        :tree-data="treeData"
      >
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </a-tree>
      <MapTools
        @changeViewer="changeViewer"
        @flyTo="flyTo"
      @createArrowWall="createArrowWall"/>
    </section>
    <section class="bg-blue-left main-page-side main-page-right">
      hhh
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMainStore, type RegionItem } from '@/stores/useMainStore';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue'
import MapTools from './MapTools.vue'
import type { CesiumPos } from '@/hooks/cesium/useCesiumMap'

const mainStore = useMainStore()

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])


const regionList = computed(() => mainStore.regionList)

const emit = defineEmits(['changeViewer', 'flyTo', 'createArrowWall', 'changeMarkerVisible'])
const checkItems = () => {
  deviceList.forEach((d:any) => {
    d.visible = checkedKeys.value.includes(d.id) ? true : false
  })
  emit('changeMarkerVisible', deviceList)
}


const treeData:any = ref([])
let deviceList:any = []

const changeViewer = (view: CesiumPos) => emit('changeViewer', view)
const flyTo = (view: CesiumPos) => emit('flyTo', view)
type WallOption = {
  points: Array<CesiumPos>,
  visible: boolean
}
const createArrowWall = (options:WallOption) => emit('createArrowWall', options)

watch(regionList, list => {
  const listVal = JSON.parse(JSON.stringify(list))
  type DeviceData = { total:number, list: Array<any>}
  expandedKeys.value = []

  let tree:any = []
  let map:any = {}
  listVal.forEach((region:RegionItem) => {
    map[region.id] = region
    region.children = []
  })
  listVal.forEach((region:RegionItem) => {
    mainStore.getDevices({
      pageNum: 1,
      pageSize: 999,
      regionId: region.id,
    }).then(data => {
      const list = (data as DeviceData).list
      deviceList.push(...list)
      list.map(l => {
        l.key = l.id,
        l.title = l.name,
        l.isDevice = true
      })
      region.children = list
      const parent = map[region.parentId]
      if (parent) {
        parent.children.push(region)
      } else {
        tree.push({
          ...region,
          key: 'region-' + region.id,
          title: region.name
        })
        expandedKeys.value.push(String(region.id))
      }
      treeData.value = [...tree]
    })
  })
}, {
  immediate: true
})

</script>

<style lang="less">
.main-page {
  width: 100%;
  &-side {
    top: 0px;
    bottom: 10px;
    width: 340px;
    position: absolute;
    z-index: 10;
  }
  &-left {
    padding: 20px;
    left: 10px;
    .ant-tree {
      height: calc(100% - 150px);
      background-color: transparent;
      color: #fff;
    }
  }
  &-right {
    right: 10px;
  }
}
</style>