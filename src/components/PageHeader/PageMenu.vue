<template>
  <div class="flex block page-menu">
    <div :class="`text-center pointer fs16 page-menu-item ${activePage ? 'menut-item--active' : ''}`"
      :key="m.auth"
      v-for="m in menuList"
      @click="goPage(m)">
      <span
        @mouseenter="showChildren(m)"
        @mouseleave="hideChildren(m)">{{ m.name }}</span>
      <div v-if="m.children && m.showChildren">
        <p v-for="c in m.children" @click="goPage(c)">{{ c.name }}</p>
      </div>
    </div>
    <!-- <a-menu v-model:selectedKeys="activePage" mode="horizontal">
      <a-menu-item
        :key="m.auth"
        v-for="m in menuList"
        @click="goPage(m)">
        <span
          @mouseenter="showChildren(m)"
          @mouseleave="hideChildren(m)">{{ m.name }}</span>
        <div v-if="m.children && m.showChildren">
          <p v-for="c in m.children" @click="goPage(c)">{{ c.name }}</p>
        </div>
      </a-menu-item>
    </a-menu> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useMainStore, type NavItem } from '@/stores/useMainStore'
const mainStore = useMainStore()
const $route = useRoute()
const $router = useRouter()

const activePage = computed(() => $route.name)
const menuList = computed(() => mainStore.manuList)

const showChildren = (item:NavItem) => item.showChildren = true
const hideChildren = (item:NavItem) => item.showChildren = false

const goPage = (item:NavItem) => {
  if (item.routeName) {
    $router.push({ name: item.routeName })
  } else if (item.link) {
    window.open(item.link, '_blank')
  }
}
</script>

<style lang="less">
.page-menu {
  height: 50%;
  padding: 0 20px;
  &-item {
    padding: 0 35px;
    letter-spacing: 6px;
    border: 1px solid @blue;
    border-radius: 8px;
    line-height: 38px;
    &:hover {
      background-color: #5d655f6e;
      transition: all 0.5s ease;
    }
  }
}
</style>