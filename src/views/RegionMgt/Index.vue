<template>
  <div class="bg-page flex bg-page-show region-page">
    <section class="blue-border region-tree">
      <a-space class="tool-buttons">
        <a-button type="primary" @click="addRegion()">
          <template #icon><PlusOutlined /></template>
          添加</a-button>
        <a-button type="warn" @click="editRegion">
          <template #icon><EditOutlined /></template>
          修改</a-button>
        <a-button type="danger" @click="deleteRegion()">
          <template #icon><DeleteOutlined /></template>
          删除</a-button>
      </a-space>
      <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        :tree-data="regionTree"
      >
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </a-tree>
    </section>
    <section class="blue-border region-detail">
    </section>
  </div>
</template>

<script setup lang="ts">
import {PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useMainStore, type RegionItem, type RegionListType } from '@/stores/useMainStore';
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue'
import { arrToTree, type ArrayType, type ArrItemType } from '@/utils/utils'
import { message } from 'ant-design-vue';
const mainStore = useMainStore()

const expandedKeys = <string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

const regionList = computed(() => mainStore.regionList)
console.log(regionList.value);
const regionTree = ref<RegionListType>([])

const addRegion = () => {
  message.success('敬请期待')
  console.log('add');
}
const editRegion = () => {
  console.log('edit');
}
const deleteRegion = () => {
  console.log('delete');
}
// regionTree.value = formatRegion(regionList.value)

// function formatTree (tree: ArrayType):ArrayType {
//   tree.forEach((t: ArrItemType) => {
//     if (t.children?.length) {
//       t.children = formatTree(t.children)
//     }
//     t.title = t.name
//     t.key = t.id
//   })
//   return tree
// }

// function formatRegion (val: RegionListType) {
//   const tree:ArrayType = arrToTree(val)
//   regionTree.value = formatTree(tree) as RegionListType
// }
// watch(regionList, val => {
//   formatRegion(val)
// })
</script>

<style lang="less">
.region-page {
  width: 100%;
  padding: 20px;
  .region-tree {
    background-color: @boxBgc;
    width: 400px;
    overflow: auto;
    .tool-buttons {
      width: 100%;
      border-bottom: @blueBorder;
      height: 60px;
      padding: 0 20px;
    }
  }
  .region-detail {
    background-color: @boxBgc;
    flex: 1;
    border-left: none;
  }
}
</style>