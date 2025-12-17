<template>
  <div class="jxls-echarts-pie" :style="defaultStyle">
    <div class="jxls-pie" ref="pieRef"></div>
  </div>
</template>

<script lang="ts" setup>
//<!---------------------------- import -------------------------------->
import { computed, onMounted, onUnmounted, PropType, reactive, ref, watch } from 'vue'
import * as echarts from 'echarts'
import _ from 'lodash'

import {
  I_EchartsPieConfig,
  DatasetComponentOption,
  PieSeriesOption,
  LegendComponentOption,
  TooltipComponentOption,
  DataZoomComponentOption,
  I_RoseType,
  I_PieChangeData
} from '../type'
//<!---------------------------- let const  -------------------------------->
// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Array as PropType<any>,
    required: true
  },
  config: {
    type: Object as PropType<I_EchartsPieConfig>,
    required: true
  }
})
// Dom 元素
const pieRef = ref<HTMLDivElement>()
// Echarts 实例
let pieEcharts: any
let itemId = ref<number>(1)
let seriesName = ref<string>(`jxls_pie_${itemId.value}`)

const defaultStyle = reactive({
  height: props.config?.height + 'px',
  background:
    props.config?.background ?? `linear-gradient(47deg, #0c9f23, #75ab35, #b4b547, #eebd59)`
})
// linear-gradient(60deg,#26c6da,#00acc1);
// background-image: linear-gradient(47deg, #0c9f23, #75ab35, #b4b547, #eebd59)
const data = computed<any[]>(() => [...props.data])

const seriesOption = ref<PieSeriesOption>({
  type: 'pie',
  name: props.config?.seriesName ?? seriesName.value,
  legendHoverLink: true,
  // single:单选  multiple:多选  series:系列
  selectedMode: 'multiple',
  // 选中扇区偏移的距离
  selectedOffset: 15,
  //roseType: 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
  //roseType:  'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
  roseType: props.config?.roseType ?? undefined,
  // false 标签放在中心 默认值 是true 不放中间
  avoidLabelOverlap: true,
  // 是否在无数据的时候显示 一个点位圆
  showEmptyCircle: false,

  label: {
    show: props.config.isShowLabel ?? true,
    fontWeight: 'bold',
    overflow: 'truncate',
    position: props.config.labelPosition ?? 'outside',
    alignTo: 'none',
    edgeDistance: '25%'
  },
  labelLine: {
    show: true,
    smooth: true,
    lineStyle: {
      opacity: 0.8
    }
  },
  labelLayout: {
    hideOverlap: true,
    // align: 'right',
    draggable: true
  },
  itemStyle: {
    borderCap: 'butt'
  },
  emphasis: {
    scale: true,
    scaleSize: 10,
    focus: 'series'
  },
  blur: {
    label: {
      show: true
    }
  },
  select: {
    label: {
      show: true
    }
  },

  center: ['50%', '50%'],
  radius: props.config?.radius ?? ['20%', '75%'],
  encode: {
    // 这个值 指定 数据
    value: props.config.value ?? 0,
    // 这个值 指定 名字
    itemName: props.config?.itemName ?? 1
    // tooltip: []
  }
})
const dataSetOption = ref<DatasetComponentOption>({
  source: data.value,
  dimensions: props.config?.dimensions
})
const legendOption = ref<LegendComponentOption>({
  type: 'scroll',
  // 图例 排列方式 水平/竖排 vertical / horizontal(默认值)
  orient: 'horizontal',
  height: '20px',
  // type: 'scroll',
  // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  icon: 'roundRect'
})
const tooltipOption = ref<TooltipComponentOption>({
  trigger: 'item'
})

const defaultOption = ref({
  // dataZoom: [dataZoomOption.value],
  dataset: dataSetOption.value,
  series: seriesOption.value,
  legend: legendOption.value,
  tooltip: tooltipOption.value
})
//<!---------------------------- emits fn  -------------------------------->
// eslint-disable-next-line no-undef

//<!---------------------------- handle fn  -------------------------------->
const _resizeFn = _.throttle(() => {
  pieEcharts.resize()
}, 2000)
window.addEventListener('resize', _resizeFn)
//<!---------------------------- expose fn  -------------------------------->
const changeData = (data: any[], config: I_PieChangeData) => {
  const newOption = seriesOption.value
  dataSetOption.value.source = data
  newOption.encode!.itemName = config.itemName
  newOption.encode!.value = config.value
  newOption.encode!.seriesName = config.seriesName
  newOption.dimensions = config.dimensions

  defaultOption.value.series = newOption
  pieEcharts.setOption(defaultOption.value, {
    replaceMerge: ['series']
  })
}

const init = () => {
  pieEcharts.setOption(defaultOption.value)
}
const changeStyle = (roseType: I_RoseType) => {
  seriesOption.value.roseType = roseType
  pieEcharts.setOption(defaultOption.value)
}

const changeEcharts = () => {
  console.log('change Echarts')
}
//<!---------------------------- live fn  -------------------------------->
watch(data, (newValue) => {
  dataSetOption.value.source = newValue
  pieEcharts.setOption(defaultOption.value)
})
//在 mounted 的时候去初始化 一个实例
onMounted(() => {
  pieEcharts = echarts.init(pieRef.value!, props.config?.theme ?? 'light')
})

onUnmounted(() => {
  pieEcharts.dispose()
})
// eslint-disable-next-line no-undef
defineExpose({
  init,
  changeEcharts,
  changeStyle,
  changeData
})
//<!---------------------------- watch fn  -------------------------------->
</script>

<style lang="less" scoped>
.jxls-echarts-pie {
  //background-color: rgba(255, 165, 0, 0.51);
  //background: linear-gradient(47deg, #0c9f23, #75ab35, #b4b547, #eebd59);
  //height: 260px;
  border-radius: 6px;
  width: 100%;
  .jxls-pie {
    min-height: 160px;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
