<template>
  <div class="main-page">
    <section class="bg-blue-right main-page-side main-page-left">
      <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        :tree-data="deviceList"
      >
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </a-tree>
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
const mainStore = useMainStore()

const expandedKeys = <string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

const regionList = computed(() => mainStore.regionList)

const deviceList = ref([])

// 这里回头重新写
// 在home里获取所有区域，（以后如果账号绑了区域，再过滤当前账号下的区域）
// 在这里区域数组转树型结构，区域作为树的外层，
// 然后区域数组遍历，获取每个区域下的设备，挂到树上

// const getDeviceList = () => {
//   console.log(regionList.value);
// }
// watch(regionList, val => {
//   const params = {
//     pageNum: 1,
//     pageSize: 999
//   }
//   const treeData = []
//   const regions:Array<RegionItem> = treeToArr(val)
//   regions.forEach(region => {
//     const item = {
//       level: 0,
//       title: region.name,
//       key: region.id,
//       children: []
//     }
//     mainStore.getDevices(params).then(res => {
  
//     })
//   })
// }, {
//   immediate: true
// })

</script>

<style lang="less">
.main-page {
  width: 100%;
  &-side {
    top: 10px;
    bottom: 10px;
    width: 340px;
    position: absolute;
    z-index: 10;
  }
  &-left {
    left: 10px;
  }
  &-right {
    right: 10px;
  }
}
</style>