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
import { useDeviceStore } from '@/stores/useDeviceStore';
import { ref, watch } from 'vue'

const deviceStore = useDeviceStore()

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

const treeData = ref([])
const checkItems = () => {}
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