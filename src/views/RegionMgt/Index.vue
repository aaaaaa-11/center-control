<template>
  <div class="bg-page bg-page-show region-page">
    <a-space class="tool-buttons">
      <a-button type="primary" @click="addRegion()">
        <template #icon><PlusOutlined /></template>
        添加</a-button>
      <a-button type="danger" @click="deleteRegions()">
        <template #icon><DeleteOutlined /></template>
        批量删除</a-button>
    </a-space>
    <a-tree
      class="blue-border blue-tree region-tree"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
      draggable
      checkable
      :tree-data="regionTree"
      @dragenter="onDragEnter"
      @drop="onDrop"
    >
    <template #title="{ title, key, editable, data }">
      <p class="title-line flex">
        <span v-show="!editable">{{ title }}</span>
        <a-input v-if="editable" v-model:value="data.title" @change="changeVal">{{ title }}</a-input>
        <i v-show="editable" @click="cancleEdit(data)" title="取消修改"><CloseOutlined /></i>
        <i v-show="editable" @click="confirmEdit(data)" title="确认修改"><CheckOutlined /></i>
        <i v-show="!editable" @click="addRegion(data)" title="添加下级区域"><PlusOutlined /></i>
        <i v-show="!editable" @click="updateRegion(data)" title="修改当前区域"><EditOutlined /></i>
        <i v-show="!editable" @click="deleteRegion(key)" title="删除当前区域及其下级区域"><DeleteOutlined /></i>
      </p>
    </template>
  </a-tree>
  <!-- <RegionDialog ref="regionDialog" /> -->
  </div>
</template>

<script setup lang="ts">
import {PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue'
// import RegionDialog from './RegionDialog.vue'
import type {
  AntTreeNodeDragEnterEvent,
  AntTreeNodeDropEvent,
  TreeProps,
  TreeDataItem
} from 'ant-design-vue/es/tree';
import { useRegionStore, type RegionItem, ActionTypes } from '@/stores/useRegionStore';
import { ref } from 'vue';
import { arrToTree } from '@/utils/utils';
import { message } from 'ant-design-vue';
const regionStore = useRegionStore()

const expandedKeys = ref<number[]>([])
const selectedKeys = ref<number[]>([])
const checkedKeys = ref<number[]>([])

interface RegionTreeItem extends RegionItem {
  title: string;
  key: number;
  name: string;
  editable?: boolean,
  children?: RegionTreeItem[]
}

const regionTree = ref<RegionTreeItem[]>([])
const getData = () => {
  regionStore.getAllRegions().then(() => {
    regionTree.value = arrToTree(regionStore.regionList.map(i => ({
      ...i,
      title: i.name,
      key: i.id
    }))) as RegionTreeItem[]
    console.log(regionTree.value);
  })
}
getData()

const changeVal = () => {
  regionTree.value = [...regionTree.value]
}
// type TreeDataItem = TreeProps['treeData'][number];
const onDragEnter = (info: AntTreeNodeDragEnterEvent) => {
  console.log(info);
  // expandedKeys 需要展开时
  expandedKeys.value = info.expandedKeys as number[];
};

const onDrop = (info: AntTreeNodeDropEvent) => {
  if (info.dragNode.key > 0) {
    const dropKey = info.node.key as number; // 要放的位置
    const dragKey = info.dragNode.key as number; // 拖动的项
    const dropToGap:boolean = info.dropToGap || false; // true当兄弟，false当儿子
    let parent_id = 0
    if (dropToGap) {
      parent_id = info.node.dataRef?.parent_id
    } else {
      parent_id = dropKey
    }
    console.log(info.dragNode)
    regionStore.regionAction(ActionTypes.u, {
      title: info.dragNode.name,
      parent_id,
      id: dragKey
    }).then(() => {
      getData()
    }).catch(e => {
      console.log('err');
      message.error(e.message)
    })
  }
};
// const regionDialog = ref()
type Parent = {
  [key in keyof RegionTreeItem]?: RegionTreeItem[key]
}
let parentItem:Parent = {} // 上一次增加项的父级，可用来取消修改
let updateItem:object = {} // 上一次更新的项，可用来取消修改
const cancleEdit = (data?: RegionTreeItem) => {
  if (!data) {
    // 还原上一次修改未保存的项
    (updateItem as RegionTreeItem).editable = false
    if (parentItem.children) {
      // 去掉增加未保存的项
      parentItem.children = parentItem.children.filter(i => i.key > 0)
    }
  } else { // 还原本次修改未保存的项
    data.editable = false
    data.title = data.name
  }
  updateItem = {}
  regionTree.value = [...regionTree.value.filter(i => i.key > 0)]
}
const confirmEdit = (data: RegionTreeItem) => {
  const action = data.key > 0 ? ActionTypes.u : ActionTypes.c
  regionStore.regionAction(action, data).then(() => {
    getData()
  }).catch(e => {
    console.log('err');
    message.error(e.message || e)
  })
}
const addRegion = (data?: RegionTreeItem) => {
  cancleEdit()
  // 创建新的项，id为负数，以示区分
  const id = -1 * new Date().getTime()
  const item = {
    id,
    key: id,
    title: '',
    name: '',
    checkable: false,
    parent_id: data ? data.key : 0,
    editable: true
  }
  // 插入当前项下一级或是根下面
  if (data) {
    parentItem = data
    if (!data.children) {
      data.children = []
    }
    data.children.push(item)
    expandedKeys.value.push(data.key)
    regionTree.value = [...regionTree.value]
  } else {
    parentItem = {
      children: regionTree.value
    }
    regionTree.value.push(item)
  }
}
const updateRegion = (data: RegionTreeItem) => {
  cancleEdit()
  data.editable = true
  // regionDialog.value?.open(data, 'edit')
}
const deleteRegion = (id: number) => {
  return message.success('敬请期待~')
  regionStore.regionAction(ActionTypes.d, {
    id
  })
}
const deleteRegions = () => {
  if (checkedKeys.value.length) {
    return message.success('敬请期待~')
  } else {
    return message.error('请先勾选删除项')
  }
}
</script>

<style lang="less">
.region-page {
  width: 100%;
  padding: 20px;
  .region-tree {
    width: 100%;
    height: calc(100% - 40px);
  }
  .region-detail {
    background-color: @boxBgc;
    flex: 1;
    border-left: none;
  }
}
</style>