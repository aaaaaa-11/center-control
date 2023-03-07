<template>
  <div class="full over-hidden pos-rel home-page">
    <PageMap />
    <PageHeader />
    <RouterView class="pos-abs router-page"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageMap from '@/components/PageMap/Index.vue'
import PageHeader from '@/components/PageHeader/Index.vue'
import { useRegionStore } from '@/stores/useRegionStore';
const { getAllRegions } = useRegionStore()
getAllRegions()
</script>

<style lang="less">
.home-page {
  @height: @headerH + 10px;
  .router-page {
    top: @height;
    height: calc(100% - @height);
  }
}
</style>