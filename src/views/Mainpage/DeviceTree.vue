<template>
  <div class="device-tree-wrap">
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
  </div>
</template>

<script setup lang="ts">
import { useRegionStore } from '@/stores/useRegionStore';
import { useDeviceStore } from '@/stores/useDeviceStore';
import { ref, watch, computed } from 'vue'
import { arrToTree } from '@/utils/utils';

const deviceStore = useDeviceStore()
const regionStore = useRegionStore()
const regionList = computed(() => regionStore.regionList)

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

const treeData = ref<any[]>([])
const checkItems = () => {}
const loading = ref(false)
watch(regionList, (val) => {
  loading.value = true
  const regionTree = arrToTree(val.map(i => ({
    ...i,
    key: i.id,
    title: i.name
  })))
  treeData.value = regionTree
  const actions:any = []
  val.forEach(item => {
    actions.push(deviceStore.getDeviceList({
      pageNum: 1,
      pageSize: 999,
      region_id: item.id
    }).then(res => {
      if (!item.children) {
        item.children = []
      }
      const list = res.list.map(i => {
        i.key = i.id
        i.title = i.name
        i.isDevice = true
        return i
      })
      item.children.push(...list)
      console.log(item);
    }).catch(e => {
      console.log(e);
    }))
  })
  Promise.all(actions).then(res => {
    treeData.value = [...treeData.value]
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}, {
  immediate: true
})

const getData = () => {
  
}
</script>

<style lang="less">
.device-tree-wrap {
  height: calc(100% - 150px);
  overflow: hidden;
  .ant-tree {
    background-color: transparent;
    color: #fff;
  }
}
</style>