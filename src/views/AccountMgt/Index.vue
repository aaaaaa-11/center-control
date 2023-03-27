<template>
  <div class="bg-page bg-page-show full table-page">
    <a-form
      class="form"
      ref="formRef"
      layout="inline"
      :model="formState">
      <a-form-item name="name">
        <a-input
          class="default-input"
          placeholder="请输入用户名称"
          v-model:value="formState.name"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="warn" @click="getData(formState)">查询</a-button>
      </a-form-item>
      <a-form-item class="form-item-btn">
        <a-button type="primary" @click="addUser">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table class="table" :dataSource="tableData" :columns="columns" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="primary" @click="editUser(record)">编辑</a-button>
            <a-button type="danger" @click="editUser(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useTable, { ACTIONTYPES } from '@/hooks/useTable'
import columns from './columns'
import { message } from 'ant-design-vue';

type UserItem = {
  id: number,
  name?: string,
  phone?: string,
}

const formState = reactive({
  name: ''
})
const { tableData, getData, loading } = useTable(ACTIONTYPES.USER)
getData(formState)

const editUser = (item:UserItem) => {
  message.error('暂无权限')
}
const addUser = () => {
  message.error('暂无权限')
}

</script>

<style>

</style>