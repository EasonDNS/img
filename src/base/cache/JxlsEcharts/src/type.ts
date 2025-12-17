import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'

import type {
  DatasetComponentOption,
  DataZoomComponentOption,
  LegendComponentOption,
  SingleAxisComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption
} from 'echarts/components'

interface I_EchartsBarConfig {
  x?: number | string
  y?: number | string
  name?: string
  id?: number | string
  //指定数据维度
  dimensions: Array<I_Dimensions> | Array<string>
  // 是否要显示 坐标轴名字
  isShowAxisName?: boolean
  // 图表高度
  height?: number
  width?: number | string
  minWidth?: number | string
  minHeight?: number | string
  theme?: string
  [x: string]: any
}
interface I_Dimensions {
  type: I_Dimensions_Type
  name: string
}
type I_Dimensions_Type = 'number' | 'ordinal' | 'float' | 'int' | 'time'

interface I_EchartsPieConfig {
  radius?: string[]
  height?: number
  title?: string
  dimensions: Array<I_Dimensions> | Array<string>
  theme?: string
  seriesName?: string
  itemName?: string
  value?: string | number
  roseType?: I_RoseType
  isShowLabel?: boolean
  labelPosition?: I_LabelPosition
  background?: any
  [x: string]: any
}
interface I_PieChangeData {
  value: string
  itemName: string
  dimensions: Array<I_Dimensions> | Array<string>
  seriesName?: string
}
type I_RoseType = 'radius' | 'area' | undefined
type I_LabelPosition = 'outside' | 'inside' | 'inner' | 'center'

export type {
  SingleAxisComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  DatasetComponentOption,
  TooltipComponentOption,
  ToolboxComponentOption,
  DataZoomComponentOption,
  I_EchartsBarConfig,
  I_EchartsPieConfig,
  I_RoseType,
  I_PieChangeData
}
