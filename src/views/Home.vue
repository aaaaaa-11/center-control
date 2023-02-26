<template>
  <div class="full over-hidden pos-rel home-page">
    <PageMap />
    <PageHeader />
    <RouterView class="pos-abs router-page" />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import PageMap from '@/components/PageMap/Index.vue'
import PageHeader from '@/components/PageHeader/Index.vue'
import { useMainStore } from '@/stores/useMainStore';
const { getAllRegions } = useMainStore()
getAllRegions()
</script>

<style lang="less">
.home-page {
  .router-page {
    top: @headerH;
    height: calc(100% - @headerH);
  }
}
</style>