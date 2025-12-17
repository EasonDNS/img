<!--<template>-->
<!--  <div class="jxls-echarts-bar" :style="defaultStyle">-->
<!--    <div class="jxls-bar" ref="barRef"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--//-->
<!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; import &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--import { computed, onMounted, onUnmounted, type PropType, reactive, ref, watch } from 'vue'-->
<!--import * as echarts from 'echarts'-->
<!--import _ from 'lodash'-->

<!--import type {-->
<!--  BarSeriesOption,-->
<!--  DatasetComponentOption,-->
<!--  DataZoomComponentOption,-->
<!--  I_EchartsBarConfig,-->
<!--  LegendComponentOption,-->
<!--  LineSeriesOption,-->
<!--  TooltipComponentOption-->
<!--} from '../type'-->

<!--//&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; let const  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--// eslint-disable-next-line no-undef-->
<!--const props = defineProps({-->
<!--  data: {-->
<!--    type: Array as PropType<any>,-->
<!--    required: true-->
<!--  },-->
<!--  config: {-->
<!--    type: Object as PropType<I_EchartsBarConfig>,-->
<!--    required: true-->
<!--  }-->
<!--})-->
<!--// Dom 元素-->
<!--const barRef = ref<HTMLDivElement>()-->
<!--// Echarts 实例-->
<!--let barEcharts: any-->
<!--let itemId = ref<number>(1)-->
<!--let itemName = ref<string>(`jxls_${itemId.value}`)-->
<!--const defaultStyle = reactive({-->
<!--  width: '100%',-->
<!--  height: props.config?.height + 'px'-->
<!--})-->
<!--const data = computed<any[]>(() => [...props.data])-->

<!--const barSeriesOption = ref<BarSeriesOption>({-->
<!--  // 系列中需要设置名字,或者 在legend 中设置-->
<!--  type: 'bar',-->
<!--  name: 'bar' + props.config.name ?? itemName.value,-->
<!--  // seriesLayoutBy: 'row',-->
<!--  markPoint: {-->
<!--    data: [-->
<!--      {-->
<!--        name: '最大值',-->
<!--        type: 'max'-->
<!--      },-->
<!--      {-->
<!--        type: 'min',-->
<!--        name: '最小值'-->
<!--      }-->
<!--    ]-->
<!--  },-->
<!--  emphasis: {-->
<!--    focus: 'series'-->
<!--  },-->
<!--  encode: {-->
<!--    x: props.config.x,-->
<!--    y: props.config.y,-->
<!--    itemId: props.config.id ?? itemId.value-->
<!--  }-->
<!--  //两个维度是否在一个刻度显示-->
<!--  // barGap: '-100%'-->
<!--})-->
<!--const lineSeriesOption = ref<LineSeriesOption>({-->
<!--  type: 'line',-->
<!--  smooth: true,-->
<!--  name: 'line' + props.config?.name ?? itemName.value,-->
<!--  emphasis: {-->
<!--    focus: 'series'-->
<!--  },-->
<!--  encode: {-->
<!--    x: props.config.x,-->
<!--    y: props.config.y,-->
<!--    itemId: props.config.id ?? itemId.value-->
<!--  }-->
<!--})-->
<!--const dataSetOption = ref<DatasetComponentOption>({-->
<!--  source: data.value,-->
<!--  dimensions: props.config?.dimensions-->
<!--})-->
<!--const xAxisOption = ref<any>({-->
<!--  type: 'category',-->
<!--  nameGap: 5,-->
<!--  nameRotate: 0,-->
<!--  // show: false,-->
<!--  name: props.config?.isShowAxisName ? props.config.x : null,-->
<!--  nameTextStyle: {-->
<!--    align: 'left',-->
<!--    width: 40,-->
<!--    overflow: 'truncate',-->
<!--    ellipsis: '...'-->
<!--  },-->
<!--  axisLine: {-->
<!--    show: true,-->
<!--    symbol: 'none',-->
<!--    symbolSize: [2, 5]-->
<!--  },-->
<!--  axisTick: {-->
<!--    // true: 刻度显示在图里, false 默认值  显示在图外-->
<!--    inside: true,-->
<!--    // 这个是设置刻度 显示 0 表示显示每个标签,1: 间隔1个标签显示-->
<!--    interval: 0-->
<!--  },-->
<!--  axisLabel: {-->
<!--    show: true,-->
<!--    interval: 0,-->
<!--    inside: false,-->
<!--    overflow: 'truncate',-->
<!--    // rotate: '90',-->
<!--    ellipsis: '.',-->
<!--    width: 40,-->
<!--    showMinLabel: false,-->
<!--    hideOverLap: false-->
<!--  },-->
<!--  axisPointer: {-->
<!--    show: true,-->
<!--    type: 'line', // line/none/ shadow-->
<!--    snap: true-->
<!--  }-->
<!--})-->
<!--const yAxisOption = ref<any>({-->
<!--  name: props.config?.isShowAxisName ? props.config.y : null,-->
<!--  offset: 0,-->
<!--  position: 'left',-->
<!--  scale: true,-->
<!--  axisLine: {-->
<!--    show: true-->
<!--  },-->
<!--  axisTick: {-->
<!--    show: true,-->
<!--    inside: true,-->
<!--    length: 5,-->
<!--    lineStyle: {-->
<!--      // color: 'red'-->
<!--    }-->
<!--  },-->
<!--  minorTick: {-->
<!--    // 小刻度-->
<!--    show: false,-->
<!--    splitNumber: 5-->
<!--  },-->
<!--  axisPointer: {-->
<!--    show: true,-->
<!--    type: 'line',-->
<!--    // 自动吸到其值上-->
<!--    snap: false,-->
<!--    triggerTooltip: false-->
<!--  },-->
<!--  splitLine: {-->
<!--    show: false-->
<!--  }-->
<!--})-->
<!--const legendOption = ref<LegendComponentOption>({-->
<!--  // 图例 排列方式 水平/竖排 vertical / horizontal(默认值)-->
<!--  orient: 'horizontal',-->
<!--  type: 'scroll',-->
<!--  // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'-->
<!--  icon: 'roundRect'-->
<!--})-->
<!--const tooltipOption = ref<TooltipComponentOption>({-->
<!--  trigger: 'axis',-->
<!--  axisPointer: {-->
<!--    type: 'line'-->
<!--  }-->
<!--  // formatter: `{a}-> '系列名称' <br /> {b}&ndash;&gt; '类目值' <br /> {c}&ndash;&gt; '数值' <br /> `-->
<!--})-->
<!--const dataZoomOption = ref<DataZoomComponentOption>({-->
<!--  filterMode: 'filter',-->
<!--  type: 'inside',-->
<!--  start: 0,-->
<!--  end: 100,-->
<!--  orient: 'horizontal'-->
<!--})-->

<!--const defaultOption = ref<any>({-->
<!--  dataset: dataSetOption.value,-->
<!--  series: [barSeriesOption.value, lineSeriesOption.value],-->
<!--  xAxis: xAxisOption.value,-->
<!--  yAxis: yAxisOption.value,-->
<!--  legend: legendOption.value,-->
<!--  tooltip: tooltipOption.value,-->
<!--  dataZoom: [dataZoomOption.value]-->
<!--})-->
<!--//&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; emits fn  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--// eslint-disable-next-line no-undef-->
<!--const emit = defineEmits<{-->
<!--  (-->
<!--    e: 'changeData',-->
<!--    x?: string | number,-->
<!--    y?: string | number,-->
<!--    name?: string-->
<!--  ): void-->
<!--}>()-->

<!--//&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; handle fn  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--const _resizeFn = _.throttle(() => {-->
<!--  barEcharts.resize()-->
<!--}, 2000)-->
<!--window.addEventListener('resize', _resizeFn)-->
<!--//&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; expose fn  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->

<!--const changeYaxis = (axis: any) => {-->
<!--  if (axis) {-->
<!--    barEcharts.setOption(axis, {-->
<!--      replaceMerge: ['yAxis']-->
<!--    })-->
<!--  }-->
<!--}-->
<!--const changeSeries = (series: BarSeriesOption | LineSeriesOption) => {-->
<!--  barEcharts.setOption(-->
<!--    { series: [series] },-->
<!--    {-->
<!--      replaceMerge: ['series']-->
<!--    }-->
<!--  )-->
<!--}-->
<!--const init = () => {-->
<!--  barEcharts.setOption(defaultOption.value)-->
<!--}-->
<!--const changeData = (-->
<!--  data: any[],-->
<!--  dimensions?: string[],-->
<!--  x = props.config?.x,-->
<!--  y = props.config.y,-->
<!--  name = props.config?.name-->
<!--) => {-->
<!--  const option = {-->
<!--    dataset: [{ source: data, dimensions: dimensions }],-->
<!--    series: {-->
<!--      name,-->
<!--      encode: {-->
<!--        x,-->
<!--        y,-->
<!--        itemId: props.config.id ?? itemId.value-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  barEcharts.setOption(option, {-->
<!--    replaceMerge: ['dataset']-->
<!--  })-->
<!--  // 编辑数据时把这些参数传递过去-->
<!--  emit('changeData', x, y, name)-->
<!--}-->
<!--const changeEcharts = () => {-->
<!--  console.log('change Echarts')-->
<!--}-->
<!--//&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; live fn  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--watch(data, (newValue) => {-->
<!--  dataSetOption.value.source = newValue-->
<!--  barEcharts.setOption(defaultOption.value)-->
<!--})-->
<!--//在 mounted 的时候去初始化 一个实例-->
<!--onMounted(() => {-->
<!--  barEcharts = echarts.init(barRef.value!, props.config?.theme ?? 'light')-->
<!--})-->

<!--onUnmounted(() => {-->
<!--  barEcharts.dispose()-->
<!--})-->
<!--// eslint-disable-next-line no-undef-->
<!--defineExpose({-->
<!--  changeYaxis,-->
<!--  changeSeries,-->
<!--  init,-->
<!--  changeData,-->
<!--  changeEcharts-->
<!--})-->
<!--//&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; watch fn  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--.jxls-echarts-bar {-->
<!--  //background-color: orange;-->
<!--  //height: 260px;-->
<!--  border-radius: 6px;-->
<!--  width: 100%;-->
<!--  .jxls-bar {-->
<!--    min-height: 160px;-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    padding: 0 10px;-->
<!--    box-sizing: border-box;-->
<!--  }-->
<!--}-->
<!--</style>-->

<template>
  <div></div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
