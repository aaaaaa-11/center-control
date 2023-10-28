<template>
  <div class="device-page">
    <section class="blue-border region-tree-wrap">
      <!-- <a-input-search
        v-model:value="searchValue"
        placeholder="搜索区域名称" /> -->
      <a-tree
        class="blue-tree region-tree"
        :tree-data="regionTree"
        @select="selectTreeItem"
      ></a-tree>
    </section>
    <DeviceDetail ref="deviceDetail" />
  </div>
</template>

<script setup lang="ts">
import DeviceDetail from './DeviceDetail.vue'
import { ref } from 'vue'
import { arrToTree } from '@/utils/utils'
import type { TreeProps } from 'ant-design-vue'
import { useRegionStore } from '@/stores/useRegionStore'
const regionStore = useRegionStore()

const searchValue = ref<string>('')
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

// 获取区域
interface RegionTreeItem extends Region {
  title: string
  key: number
  name: string
  parentId: number
  editable?: boolean
  children?: RegionTreeItem[]
}
const { getAllRegions } = regionStore

const regionTree = ref<RegionTreeItem[]>([])
const getData = () => {
  getAllRegions().then(() => {
    regionTree.value = arrToTree(
      regionStore.regionList.map((i) => ({
        ...i,
        title: i.name,
        key: i.id,
      }))
    ) as RegionTreeItem[]
    // 自动展开一层
    // regionTree.value.map((region) => {
    //   expandedKeys.value.push(region.id)
    // })
  })
}
getData()

const deviceDetail = ref()
const selectTreeItem: TreeProps['onSelect'] = (selectedKeys) => {
  deviceDetail.value?.open(selectedKeys[0] as number)
}
</script>

<style lang="less">
.device-page {
  width: 100%;
  padding: 20px;
  .region-tree-wrap {
    width: 300px;
    position: absolute;
    z-index: 20;
    bottom: 10px;
    top: 0;
    left: 20px;
    .region-tree {
      height: 100%;
    }
  }
}
</style>
