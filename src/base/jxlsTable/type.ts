interface I_TableConfig {
  tableItems: I_tableItem[]
  itemStyle?: I_itemStyle
  other?: I_tableOther
  pagination?: I_Pagination
}

interface I_Pagination {
  isSmall?: boolean
  isDisabled?: boolean
  isBackground?: boolean
  pageSize?: number
  currentPage?: number
}
interface I_tableOther {
  searchField?: string
}
interface I_itemStyle {
  tableTreeProps?: I_tableTreeProps
  isIndex?: boolean
  isShowCtrl?: boolean
  isHeader?: boolean
  isShowFooter?: boolean
  // 控制 是否显示table 头部左边是否显示  默认 true
  isShowHeaderLeft?: boolean
  headerStyle?: any
  rowKey?: string | number
  // 控制是否显示 checkBox
  isShowCheckBox?: boolean

  // 用来控制是否单独一行显示 展开或折叠
  isShowExpandColumn?: boolean
  // 设置偶 / 奇 行的样式
  oddRowStyle?: I_RowStyle
  evenRowStyle?: I_RowStyle
}

interface I_RowStyle {
  // backgroundColor:`rgba(37,55,55,0.8)`
  backgroundColor?: string
  [x: string]: any
}

interface I_tableTreeProps {
  //  { children: 'children', hasChildren: 'hasChildren' }
  subChildren?: string
  // 如果可展开 通过 它来指定 展开子节点的数据 字段
  children?: string
  // row 中此值是否为真 真即可展开
  hasChildren?: string
}
interface I_tableItem {
  prop: string
  label: string
  field?: string
  minWidth?: string
  slotName?: string
  hasChildren?: boolean
  columnAlign?: string
  width?: string
  children?: I_tableItem[]
  isShow?: boolean
  showOverflowTooltip?: boolean
  [x: string]: any
}

export type { I_TableConfig }
