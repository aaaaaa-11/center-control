<template>
  <div class="bg-page bg-page-show full table-page">
    <a-form
      class="form"
      ref="formRef"
      layout="inline"
      :model="formState">
      <a-form-item name="name">
        <a-input
          class="filter-input default-input"
          placeholder="请输入角色名称"
          v-model:value="formState.name"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="warn" @click="getData(formState)">查询</a-button>
      </a-form-item>
      <a-form-item class="form-item-btn">
        <a-button type="primary" @click="addRole">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table class="table" :dataSource="tableData" :columns="columns" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="primary" @click="editRole(record)">编辑</a-button>
            <a-button type="danger" @click="editRole(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useTable, { DATATYPES } from '@/hooks/useTable'
import columns from './columns'
import { message } from 'ant-design-vue';

type RoleItem = {
  id: number,
  name?: string,
}

const formState = reactive({
  name: ''
})
const { tableData, getData, loading } = useTable(DATATYPES.ROLE)
getData(formState)

const editRole = (item:RoleItem) => {
  message.error('暂无权限')
}
const addRole = () => {
  message.error('暂无权限')
}

</script>

<style>

</style>