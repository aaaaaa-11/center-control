<template>
  <div class="bg-page flex flex-wrap flex-between bg-page-show data-center-page">
    <div
      v-for="c in charts"
      :key="c.id"
      :class="`chart blue-box ${c.class}`"
      :id="c.id"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onUnmounted } from 'vue';
import { chartOptions } from './charts'

type ChartItemType = {
  id: string,
  class: string,
  instance: echarts.ECharts | null,
  option: any
}
type ChartsType = Array<ChartItemType> | null
let charts:ChartsType = [
  {
    id: 'chart1',
    class: 'chart-s',
    instance: null,
    option: chartOptions
  },
  {
    id: 'chart2',
    class: 'chart-s',
    instance: null,
    option: chartOptions
  },
  {
    id: 'chart3',
    class: 'chart-s',
    instance: null,
    option: chartOptions
  },
  {
    id: 'chart4',
    class: 'chart-m',
    instance: null,
    option: chartOptions
  },
  {
    id: 'chart5',
    class: 'chart-m',
    instance: null,
    option: chartOptions
  },
  {
    id: 'chart6',
    class: 'chart-l',
    instance: null,
    option: chartOptions
  },
]

onMounted(() => {
  charts?.map(i => {
    i.instance = echarts.init(document.getElementById(i.id) as HTMLElement)
    i.instance.setOption(i.option)
  })
  window.onresize = () => charts?.map(c => c.instance?.resize())
})

onUnmounted(() => {
  charts?.map(c => c && c.instance?.dispose())
  charts = null
})
</script>

<style lang="less">
.data-center-page {
  width: 100%;
  padding: 20px;
  .chart {
    height: 33%;
    &-s {
      width: 32%;
    }
    &-m {
      width: 49%;
    }
    &-l {
      width: 100%;
    }
  }
}
</style>
