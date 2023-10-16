<template>
  <div class="flex block page-menu">
    <div
      :class="`
        text-center pos-rel fs16
        page-menu-item
        blue-btn
        ${
          activePage === m.routeName ||
          m.children?.find((c) => c.routeName === activePage)
            ? 'blue-btn--active'
            : ''
        }`"
      :key="m.auth"
      v-for="m in menuList"
      @mouseenter="showChildren(m)"
      @mouseleave="hideChildren(m)"
      @click="goPage(m)"
    >
      <span>{{ m.name }}</span>
      <div v-show="m.children && m.showChildren" class="pos-abs sub-menu">
        <p
          v-for="c in m.children"
          :key="c.name"
          :class="`sub-menu-item ${
            activePage === c.routeName ? 'sub-menu-item--active' : ''
          }`"
          @click="goPage(c)"
        >
          {{ c.name }}
        </p>
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
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavStore, type NavItem } from '@/stores/useNavStore'
const navStore = useNavStore()
const $route = useRoute()
const $router = useRouter()

const activePage = computed(() => $route.name)
const navData = computed(() => navStore.manuList)
const menuList = ref<NavItem[]>(navData.value)

watch(navData, (val) => {
  menuList.value = val
})

// const showChildren = (item:NavItem) => {
//   const menuList_ = [...menuList.value]
//   const menu = menuList_.find(i => i.name === item.name)
//   if (menu) {
//     menu.showChildren = true
//     menuList.value = menuList_
//   }
// }
const showChildren = (item: NavItem) => (item.showChildren = true)
const hideChildren = (item: NavItem) => (item.showChildren = false)

const goPage = (item: NavItem) => {
  if (item.link) {
    window.open(item.link, '_blank')
  } else if (item.routeName) {
    $router.push({ name: item.routeName })
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
    line-height: 38px;
    &:not(:last-of-type) {
      margin-right: 20px;
    }
    .sub-menu {
      width: 100%;
      left: 0;
      top: 100%;
      background-color: #10aec280;
      z-index: 100;
      &-item {
        &:not(:last-of-type) {
          border-bottom: 1px solid #10aec2;
        }
        &:hover {
          background-color: #10aec2a0;
        }
        &--active {
          background-color: #10aec2e0;
        }
      }
    }
  }
}
</style>
