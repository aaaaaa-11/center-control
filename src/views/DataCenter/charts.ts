import * as echarts from 'echarts'
import dayjs from 'dayjs'
const data = new Array(7).fill(null).map((i, idx) => {
  return {
    name: dayjs().subtract(idx, 'days').format('MM-DD'),
    value: Math.round(Math.random() * 30 + 100)
  }
}).reverse()
export const chartOptions:any = {
  backgroundColor: 'rgba(7, 12, 19, 0.53)',
  title: {
    text: '近7天售票统计',
    left: 'center',
    top: 0,
    textStyle: {
      color: '#fff',
      fontWeight: 200
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 20,
    textStyle: {
      color: '#fff'
    },
    data: ['张数', '金额']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    },
    data: data.map(i => i.name)
  },
  yAxis: [
    {
      name: '张数',
      type: 'value',
      nameTextStyle: {
        color: '#fff'
      },
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    }, {
      name: '金额',
      type: 'value',
      nameTextStyle: {
        color: '#fff'
      },
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    }
  ],
  series: [
    {
      type: 'bar',
      name: '张数',
      barWidth: 30,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      data: data.map(i => i.value)
    },
    {
      yAxisIndex: 1,
      type: 'line',
      name: '金额',
      data: data.map(i => i.value * 10),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      }
    }
  ]
}