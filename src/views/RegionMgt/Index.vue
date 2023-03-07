<template>
  <div class="bg-page bg-page-show region-page">
    <a-space class="tool-buttons">
      <a-button type="primary" @click="addRegion()">
        <template #icon><PlusOutlined /></template>
        添加</a-button>
      <a-button type="danger" @click="deleteRegion()">
        <template #icon><DeleteOutlined /></template>
        批量删除</a-button>
    </a-space>
    <a-tree
      class="blue-border region-tree"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
      draggable
      :tree-data="regionTree"
      @dragenter="onDragEnter"
      @drop="onDrop"
    >
    <template #title="{ title, key }">
      <p class="title-line flex">
        {{ title }}
        <i  @click="addRegion()" title="添加下级区域"><PlusOutlined /></i>
        <i  @click="editRegion()" title="修改当前区域"><EditOutlined /></i>
        <i  @click="deleteRegion()" title="删除当前区域及其下级区域"><DeleteOutlined /></i>
      </p>
    </template>
  </a-tree>
  </div>
</template>

<script setup lang="ts">
import {PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import type {
  AntTreeNodeDragEnterEvent,
  AntTreeNodeDropEvent,
  TreeProps,
} from 'ant-design-vue/es/tree';
import { useRegionStore, type RegionItem } from '@/stores/useRegionStore';
import { ref } from 'vue';
import { arrToTree } from '@/utils/utils';
const regionStore = useRegionStore()

const expandedKeys = <string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])


const regionTree = ref<RegionItem[]>([])


regionStore.getAllRegions().then(res => {
  regionTree.value = arrToTree(regionStore.regionList)
  console.log(regionTree.value);
})

// type TreeDataItem = TreeProps['treeData'][number];
const onDragEnter = (info: AntTreeNodeDragEnterEvent) => {
  console.log(info);
  // expandedKeys 需要展开时
  // expandedKeys.value = info.expandedKeys;
};

const onDrop = (info: AntTreeNodeDropEvent) => {
  console.log(info);
  // const dropKey = info.node.key;
  // const dragKey = info.dragNode.key;
  // const dropPos = info.node.pos.split('-');
  // const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
  // const loop = (data: TreeProps['treeData'], key: string | number, callback: any) => {
  //   data.forEach((item, index) => {
  //     if (item.key === key) {
  //       return callback(item, index, data);
  //     }
  //     if (item.children) {
  //       return loop(item.children, key, callback);
  //     }
  //   });
  // };
  // const data = [...gData.value];

  // // Find dragObject
  // let dragObj: TreeDataItem;
  // loop(data, dragKey, (item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
  //   arr.splice(index, 1);
  //   dragObj = item;
  // });
  // if (!info.dropToGap) {
  //   // Drop on the content
  //   loop(data, dropKey, (item: TreeDataItem) => {
  //     item.children = item.children || [];
  //     /// where to insert 示例添加到头部，可以是随意位置
  //     item.children.unshift(dragObj);
  //   });
  // } else if (
  //   (info.node.children || []).length > 0 && // Has children
  //   info.node.expanded && // Is expanded
  //   dropPosition === 1 // On the bottom gap
  // ) {
  //   loop(data, dropKey, (item: TreeDataItem) => {
  //     item.children = item.children || [];
  //     // where to insert 示例添加到头部，可以是随意位置
  //     item.children.unshift(dragObj);
  //   });
  // } else {
  //   let ar: TreeProps['treeData'] = [];
  //   let i = 0;
  //   loop(data, dropKey, (_item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
  //     ar = arr;
  //     i = index;
  //   });
  //   if (dropPosition === -1) {
  //     ar.splice(i, 0, dragObj);
  //   } else {
  //     ar.splice(i + 1, 0, dragObj);
  //   }
  // }
  // gData.value = data;
};
const addRegion = () => {
  console.log('add');
}
const editRegion = () => {
  console.log('edit');
}
const deleteRegion = () => {
  console.log('delete');
}
</script>

<style lang="less">
.region-page {
  width: 100%;
  padding: 20px;
  .region-tree {
    background-color: @boxBgc;
    width: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    padding: 20px 0px;
    .ant-tree-node-content-wrapper {
      &:hover {
        background-color: #28b5c9;
      }
      &.ant-tree-node-selected {
        background-color: #1dc3d9;
      }
    }
    .title-line {
      color: #fff;
      i {
        margin-left: 10px;
      }
    }
  }
  .region-detail {
    background-color: @boxBgc;
    flex: 1;
    border-left: none;
  }
}
</style>