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
      >
      </a-tree>
    </section>
    <DeviceDetail
      ref="deviceDetail" />
  </div>
</template>

<script setup lang="ts">
import { useRegionStore, type RegionItem } from '@/stores/useRegionStore';
import DeviceDetail from './DeviceDetail.vue'
import { ref, watch } from 'vue'
import { arrToTree, type ArrItem } from '@/utils/utils'
import type { TreeProps } from 'ant-design-vue';
const regionStore = useRegionStore()

const searchValue = ref<string>('')
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

// watch(searchValue, value => {
  
// })

interface RegionTreeItem extends RegionItem {
  title: string;
  key: number;
  name: string;
  editable?: boolean,
  children?: RegionTreeItem[]
}
const regionTree = arrToTree(regionStore.regionList.map(i => ({
  ...i,
  title: i.name,
  key: i.id
}))) as RegionTreeItem[]

const deviceDetail = ref()
const selectTreeItem: TreeProps['onSelect'] = (selectedKeys, info) => {
  deviceDetail.value?.open(selectedKeys[0])
};
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