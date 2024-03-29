<template>
  <div class="blue-scrollbar device-tree-wrap">
    <a-tree
      class="blue-tree device-tree"
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
  </div>
</template>

<script setup lang="ts">
import { useRegionStore, type RegionItem } from '@/stores/useRegionStore';
import { useDeviceStore, type DeviceItem } from '@/stores/useDeviceStore';
import { useMapStore } from '@/stores/useMapStore';
import { ref, watch, computed, nextTick, onBeforeUnmount } from 'vue'
import { arrToTree, type ArrItem } from '@/utils/utils';

const { mapAction } = useMapStore()
const deviceStore = useDeviceStore()
const regionStore = useRegionStore()
const regionList = computed(() => regionStore.regionList)

const expandedKeys = ref<number[]>([])
const selectedKeys = ref<number[]>([])
const checkedKeys = ref<number[]>([])


type TreeItem = RegionItem | DeviceItem | ArrItem

const treeData = ref<TreeItem[]>([])
let deviceList:DeviceItem[] = []

// 切换markers显示、隐藏
const checkItems = (keys:number[]) => {
  console.log(keys)
  const showMarkers:TreeItem[] = []
  const hideMarkers:TreeItem[] = []
  deviceList.forEach((item) => {
    if (keys.includes(item.id)) {
      showMarkers.push({
        ...item,
        visible: true
      })
    } else {
      hideMarkers.push({
        ...item,
        visible: false
      })
    }
  })
  mapAction('changeMarkersVisible', [...showMarkers, ...hideMarkers])
  mapAction('setViewerFitEntities')
}


// 将设备挂到区域下
const addDevice = (tree:TreeItem[]) => {
  let actions:any = []
  tree.forEach(item => {
    if (item.children) {
      actions.push(...addDevice(item.children))
    } else {
      actions.push(deviceStore.getDeviceList({
        pageNum: 1,
        pageSize: 999,
        region_id: item.id
      }).then(res => {
        if (!item.children) {
          item.children = []
        }
        deviceList = [...deviceList, ...res.list]
        const list = res.list.map(i => ({
          ...i,
          key: i.id,
          title: i.name,
          isDevice: true,
          parent_id: i.region_id
        }))
        item.children.push(...list)
      }).catch(e => {
        console.log(e);
      }))
    }
  })
  return actions
}

// 获取区域树下所有设备
const loading = ref(false)
const getData = () => {
  const val:RegionItem[] = JSON.parse(JSON.stringify(regionList.value))
  loading.value = true
  // 这里将region的key取负数，和区域key区分开
  const data = val.map(i => {
    const item = {
      ...i,
      key: -1 * i.id,
      title: i.name
    }
    expandedKeys.value.push(item.key)
    return item
  })
  const regionTree = arrToTree(data)
  treeData.value = regionTree
  Promise.all(addDevice(regionTree)).then(res => {
    nextTick(() => {
      console.log(treeData.value);
      treeData.value = [...treeData.value]
    })
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}
// 区域更改后，重新获取设备
watch(regionList, (val) => {
  getData()
}, {
  immediate: true
})

onBeforeUnmount(() => {
  const hideMarkers = deviceList.map((item) => ({
    ...item,
    visible: false
  }))
  mapAction('changeMarkersVisible', hideMarkers)
})
</script>

<style lang="less">
.device-tree-wrap {
  height: calc(100% - 150px);
  overflow: auto;
  padding-bottom: 20px;
  .ant-tree {
    background-color: transparent;
    color: #fff;
  }
}
</style>