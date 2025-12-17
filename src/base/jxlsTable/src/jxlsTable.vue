<template>
  <el-scrollbar view-class="scrollbar-view">
    <!-- -------------------------table header---------------------------- -->
    <div class="jxls-table">
      <div class="table-header" v-if="config.itemStyle?.isHeader ?? true">
        <!-- -------------------------table-header-left---------------------------- -->
        <div class="left" v-if="isShowHeaderLeft">
          <el-button :icon="Refresh" class="left-one" @click="handleRefreshClick"></el-button>
          <el-button type="primary" @click="handleAddClick"> 添加 </el-button>
          <el-button type="primary" @click="handleEditClick"> 编辑 </el-button>
          <el-button type="danger" @click="handleDeleteClick"> 删除 </el-button>
          <!--          <el-button-->
          <!--            type="warning"-->
          <!--            :icon="View"-->
          <!--            @click="handleShowExpandColumn"-->
          <!--          ></el-button>-->
          <!--          <el-button type="danger" @click="handleExpandAll">-->
          <!--            展开所有-->
          <!--          </el-button>-->
        </div>
        <!-- -------------------------table-header-right---------------------------- -->
        <div class="right">
          <el-input
            :placeholder="rightPlaceholder"
            v-model="rightSearchData"
            :suffix-icon="Search"
            @blur="handleBlur"
          >
          </el-input>
          <!-- -------------------------table-dropdown---------------------------- -->
          <el-dropdown
            size="small"
            type="info"
            :hide-on-click="false"
            trigger="click"
            popper-class="right-grid"
          >
            <el-button type="info" :icon="Grid"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <template v-for="gd of gridData" :key="gd">
                  <el-dropdown-item>
                    <el-checkbox v-model="gd.value" @change="handleGridCheckChange(gd)">
                      {{ gd.label }}
                    </el-checkbox>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="info" :icon="Search" @click="handleSearch"></el-button>
        </div>
      </div>
      <!-- -------------------------table-bg---------------------------- -->
      <div class="jxls-table-bg" ref="tableBgRef" v-show="isShowBg"></div>
      <!-- -------------------------table ---------------------------- -->

      <el-table
        ref="tableRef"
        :data="data"
        :stripe="false"
        fit
        :border="true"
        show-header
        highlight-current-row
        :default-expand-all="false"
        tooltip-effect="light"
        :lazy="isLazy"
        :load="lazyLoad"
        :tree-props="treeProps"
        :flexible="true"
        :scrollbar-always-on="false"
        :row-key="rowKey"
        :show-summary="false"
        :expand-row-keys="expandRowKeys"
        :header-row-style="headerRowStyle"
        :table-layout="tableLayout"
        :row-style="tableRowStyle"
        :default-sort="{ order: 'ascending', prop: defaultSortProp }"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDbClick"
        @cell-click="handleCellClick"
        @expand-change="handleExpandChange"
      >
        <!-- -------------------------empty---------------------------- -->
        <template #empty>
          <span> 这行没有数据 </span>
        </template>
        <!-- -------------------------selection No---------------------------- -->
        <el-table-column type="index" label="No" v-if="config?.itemStyle?.isIndex ?? true" />
        <el-table-column type="selection" :selectable="selectable" v-if="isShowCheckBox" />
        //<!-- -------------------------expand ---------------------------- -->
        <Transition name="el-zoom-in-center">
          <el-table-column
            type="expand"
            align="center"
            min-width="10px"
            :resizable="true"
            label="more"
            v-if="isExpand"
          >
            <template #default="scopes">
              <div class="sub-table">
                <el-table
                  ref="subTableRef"
                  fit
                  border
                  size="small"
                  show-header
                  tooltip-effect="light"
                  highlight-current-row
                  :scrollbar-always-on="true"
                  :stripe="true"
                  :default-expand-all="false"
                  :flexible="true"
                  :row-key="rowKey"
                  :header-row-style="headerRowStyle"
                  :table-layout="tableLayout"
                  :default-sort="{ order: 'ascending', prop: defaultSortProp }"
                  :data="scopes.row[treeProps.subChildren ?? treeProps.children!]"
                  @row-click="handleSubTableRowClick"
                >
                  <template v-for="item of subConfig.tableItems" :key="item.label">
                    <el-table-column
                      :formatter="cellFormatter"
                      :label="item.label"
                      :prop="item.prop"
                    ></el-table-column>
                  </template>
                </el-table>
              </div>
            </template>
          </el-table-column>
        </Transition>

        <!-- -------------------------default slotName---------------------------- -->

        <template v-for="item of config?.tableItems" :key="item.prop">
          <template v-if="item.slotName">
            <el-table-column
              header-align="center"
              :label="item.label"
              :resizable="true"
              :column-key="item.field"
              :show-overflow-tooltip="item?.showOverflowTooltip ?? true"
              :sortable="true"
              :prop="item.prop"
              :min-width="item.minWidth ?? defaultColumnMinWidth"
              :align="item.columnAlign ?? 'center'"
              :width="item.width"
              v-if="item.isShow ?? true"
            >
              <template #default="scope">
                <slot :name="item.slotName" :row="scope.row">
                  {{ scope.row[item.prop] }}
                </slot>
              </template>
            </el-table-column>
          </template>
          <!-- -------------------------default---------------------------- -->
          <template v-else>
            <Transition name="el-zoom-in-center">
              <el-table-column
                header-align="center"
                :label="item.label"
                :resizable="true"
                :column-key="item.field"
                :show-overflow-tooltip="true"
                :sortable="true"
                :prop="item.prop"
                :min-width="item.minWidth ?? defaultColumnMinWidth"
                :align="item.columnAlign ?? 'center'"
                :width="item.width"
                :formatter="cellFormatter"
                v-if="item.isShow ?? true"
              >
              </el-table-column>
            </Transition>
          </template>
        </template>
        <!-- -------------------------ctrl---------------------------- -->

        <el-table-column
          label="操作"
          align="center"
          resizable
          v-if="config?.itemStyle?.isShowCtrl ?? true"
        >
          <template #default="scop">
            <slot name="ctrl">
              <div class="ctrl">
                <el-tooltip content="编辑" placement="top" trigger="hover" effect="dark">
                  <el-button type="primary" size="small" @click="handleCtrlEdit(scop.row)">
                    <el-icon color="#4C4D4F" :size="14"><EditPen /></el-icon>
                  </el-button>
                </el-tooltip>

                <el-tooltip content="删除" placement="top" trigger="hover" effect="dark">
                  <el-button type="danger" size="small" @click="handleCtrlDelete(scop.row)">
                    <el-icon color="#1d1e1f" :size="14"><DeleteFilled /></el-icon>
                  </el-button>
                </el-tooltip>
              </div>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer" v-if="config.itemStyle?.isShowFooter ?? true">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :small="isSmall"
        :disabled="isDisabled"
        :background="isBackground"
        :total="props.total"
        layout="sizes, prev, pager, next, jumper , total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
// -------------------------import----------------------------
import type { I_TableConfig } from '../type.ts' // import { dayjs, isOdd } from '@/utils'
import { computed, defineEmits, defineProps, onMounted, type PropType, ref } from 'vue'
import { DeleteFilled, EditPen, Grid, Refresh, Search } from '@element-plus/icons-vue' //
//<!-- -------------------------props emits---------------------------- -->

const emits = defineEmits<{
  (e: 'rowDbClick', row: any): void
  (e: 'rowClick', row: any, column: any, tableRef?: any): void
  (e: 'rowCtrlEdit', row: any): void
  (e: 'rowCtrlDelete', row: any): void
  (e: 'select', rows: any[]): void
  (e: 'selectAll', rows: any[]): void
  (e: 'refresh'): void
  (e: 'add'): void
  (e: 'edit', rows: any[]): void
  (e: 'delete', rows: any[]): void
  (e: 'search', searchData: string, searchField?: string): void
  (e: 'showSearch'): void
  (e: 'sizeChange', pageSize: number, currentPage: number): void
  (e: 'currentChange', pageSize: number, currentPage: number): void
}>()
const props = defineProps({
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  tableConfig: {
    type: Object as PropType<I_TableConfig>,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
//<!-- -------------------------let const---------------------------- -->
const config = ref<I_TableConfig>({ ...props.tableConfig })
// 展开数据的配置文件
const subConfig = ref<I_TableConfig>({
  tableItems: [{ prop: '', label: '' }]
})
const isShowCheckBox = ref(config.value.itemStyle?.isShowCheckBox ?? true)
const isShowHeaderLeft = ref(config.value.itemStyle?.isShowHeaderLeft ?? true)
const isExpand = ref(config.value.itemStyle?.isShowExpandColumn ?? false)
const isLazy = ref(true)
//<!-- -------------------------pagination start ---------------------------- -->
// let treeProps = ref({ children: 'children', hasChildren: 'hasChildren' })
const treeProps = ref(
  config.value.itemStyle?.tableTreeProps ?? {
    children: 'children',
    hasChildren: 'hasChildren',
    subChildren: 'children'
  }
)
// 当前页码
const currentPage = ref(1)
// pageSize 为设置每一页显示 多少条数据
const pageSize = ref(config.value.pagination?.pageSize ?? 10)
let isBackground = ref(config.value.pagination?.isBackground ?? true)
let isSmall = ref(config.value.pagination?.isSmall ?? false)
let isDisabled = ref(config.value.pagination?.isDisabled ?? false)

const handleSizeChange = () => {
  emits('sizeChange', pageSize.value, currentPage.value)
}
const handleCurrentChange = () => {
  emits('currentChange', pageSize.value, currentPage.value)
}
//<!-- -------------------------pagination end---------------------------- -->

// 这里有个问题  如果是设定这个类型就没有行高..表格格式崩
// const tableRef = ref<InstanceType<typeof ElTable>>()
const subTableRef = ref<any>()
const tableRef = ref<any>()
let isShowBg = ref(true)
const tableBgRef = ref<HTMLDivElement>()
let oddRowStyle = ref({
  backgroundColor: 'rgba(37,55,28,0.7)'
})
let evenRowStyle = ref({
  backgroundColor: `rgba(133, 64, 64, 0.8)`
})
let defaultHeaderStyle = ref<any>({
  color: '#A3A6A',
  whiteSpace: 'nowrap',
  fontWeight: 500,
  textOverflow: 'ellipsis'
})
const defaultColumnMinWidth = ref('50px')
const defaultSortProp = ref('id')
const data = computed(() => [...props.tableData])
const gridData = ref<any>([])
const tableLayout = ref<any>('auto')
// 用来存放 展开行 ==> row-key
const expandRowKeys = ref<any[]>([])
// 可以在生命周期函数中去设置 searchField 提示通过 哪个字段 去查询
// let searchField = ref<string>('name')
let searchField = ref<string>(config.value.other?.searchField ?? 'name')
const rightPlaceholder = ref(`通过 ${searchField.value} 模糊查询~`)
const rightSearchData = ref('')
//<!-- -------------------------Fn---------------------------- -->

const selectable = () => -1

const lazyLoad = (row: any, treeNode: any, resolve: any) => {
  if (row.menuList) {
    resolve(row.menuList)
  } else if (row.children) {
    resolve(row.children)
  } else {
    resolve([])
  }
}
// 主要去处理日期
const cellFormatter = (row: any, column: any, cellValue: any) => {
  if (column.property === 'createAt' || column.property === 'updateAt') {
    return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return cellValue
  }
}
const tableRowStyle = (payload: any) => {
  if (isOdd(payload.rowIndex)) {
    return config.value.itemStyle?.oddRowStyle ?? oddRowStyle.value
  } else {
    return config.value.itemStyle?.evenRowStyle ?? evenRowStyle.value
  }
}
// 头部的格式
const headerRowStyle = (): any => config.value.itemStyle?.headerStyle ?? defaultHeaderStyle.value
// 默认是用当前行的id 来作为key
const rowKey = (row: any) => {
  let index = 0
  // return row.id + index++
  return row.id
}

//<!-- -------------------------handle Fn---------------------------- -->

const handleSelect = (payload: any[]) => emits('select', payload)
const handleSelectAll = (payload: any[]) => emits('selectAll', payload)
const handleSelectChange = () => 'handleSelectChange'
const handleRowClick = (row: any, column: any) => {
  emits('rowClick', row, column, tableRef)
  tableRef.value.toggleRowExpansion(row)
}
// 双击之后 弹出修改本行的数据
const handleRowDbClick = (row: any) => emits('rowDbClick', row)
const handleRefreshClick = () => emits('refresh')
const handleAddClick = () => emits('add')
// 在删除或编辑的时候 把当前选中的 rows 传递过去
const handleEditClick = () => emits('edit', tableRef.value!.getSelectionRows())
const handleDeleteClick = () => emits('delete', tableRef.value!.getSelectionRows())
const handleCellClick = (row: any, column: any, cell: any) => {
  console.log('暂时关闭单元格动画~')
  // isShowBg.value = true
  // const cellOffsetLeft = cell.offsetLeft
  // const cellOffsetTop = cell.offsetTop
  // const cellOffsetWidth = cell.offsetWidth
  // const cellOffsetHeight = cell.offsetHeight
  // cell.setAttribute('style', `animation:jxls-table-cell 1s ease;`)
  // tableBgRef.value?.setAttribute(
  //   `style`,
  //   `
  //     transform:translate(${cellOffsetLeft}px,${cellOffsetTop}px);
  //     height:${cellOffsetHeight - 50}px;
  //     width:${cellOffsetWidth - 50}px;
  //     animation:jxls-table-bg 0.5s ease;
  //   `
  // )
}
const handleBlur = () => {
  emits('search', rightSearchData.value, config.value.other?.searchField ?? searchField.value)
  isShowBg.value = false
}
const handleSubTableRowClick = (row: any) => {
  subTableRef.value.toggleRowExpansion(row)
}
const handleShowExpandColumn = () => {
  isExpand.value = !isExpand.value
}
//<!-- -------------------------待确定 ---------------------------- -->
const handleExpandAll = () => {
  console.log(1)
}
//<!-- -------------------------待确定 ---------------------------- -->
const handleSearch = () => emits('showSearch')
const handleGridCheckChange = (item: any) => changeTableHeader(item.field, config.value, item.value)
const handleCtrlEdit = (row: any) => emits('rowCtrlEdit', row)
const handleCtrlDelete = (row: any) => emits('rowCtrlDelete', row)
//回调函数  row 展开或折叠都会触发
const handleExpandChange = (row: any) => {
  subConfig.value = autoConfig(row)
}
//<!-- -------------------------watch ---------------------------- -->
//<!-- -------------------------liveFn---------------------------- -->
//初始化 下拉菜单
onMounted(() => {
  config.value.tableItems.forEach((item) => {
    gridData.value.push({
      label: item.label,
      value: item.isShow ?? true,
      field: item.field
    })
  })
})
//<!-- -------------------------tools ---------------------------- -->
const changeTableHeader = (field: string, config: I_TableConfig, status: boolean) => {
  config.tableItems.forEach((item) => {
    if (item.field === field) {
      item.isShow = status
    }
  })
}
const autoConfig = (row: any): I_TableConfig => {
  const keys = Object.keys(row)
  let config: I_TableConfig = { tableItems: [{ prop: '', label: '' }] }
  config.tableItems.pop()
  keys.forEach((field) => {
    if (field !== treeProps.value.children) {
      config.tableItems.push({
        label: field,
        prop: field,
        field
      })
    }
  })
  return config
}
</script>
<style lang="less" scoped>
.scrollbar-view {
  width: 100%;
}
.jxls-table {
  width: 100%;
  position: relative;

  .sub-table {
    // padding: 0 10px;
  }
  .right-grid {
    background-color: #dc5709;
  }
  .jxls-table-bg {
    background-color: #ef7b0d;
    position: absolute;
    transition: all 0.5s ease;
  }
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px 5px;
    .left {
      white-space: nowrap;
      // padding-left: 10px;
      .left-one {
        font-size: 18px;
        font-weight: 900;
      }
      .el-icon {
        padding-right: 15px;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-dropdown {
        // margin-right: 5px;
        .right-grid {
          background-color: #f58106;
          font-size: 90px;
          border: 20px solid olivedrab;
        }
        .el-button {
          border-radius: 4px 0 0 4px;
          border-right: 1px solid rgba(250, 240, 230, 0.61);
        }
      }
      .el-button {
        background-color: #898a8d;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .el-button:hover {
        background-color: #393a3c;
      }

      .el-input {
        padding-right: 15px;
        min-width: 100px;
      }
    }
  }
  .el-table {
    .cell {
      box-sizing: border-box;
    }
    .ctrl {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      .el-button {
        padding: 5px 5px;
      }
    }
  }
}
.table-footer {
  margin-top: 10px;
  display: flex;
  justify-content: right;
}
</style>
<style lang="less">
.el-dropdown__popper.el-popper.right-grid {
  // background-color: #fff;
  .el-scrollbar {
    .el-dropdown-menu {
      .el-dropdown-menu__item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
}

.jxls-table {
  .cell {
    // 这是设置第一列有时会出现 一个这个元素  然后就变形...也是不知道 原因...
    .el-table__placeholder {
      display: none;
    }
  }
}
@keyframes jxls-table-bg {
  from {
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }

  to {
    border-radius: 5px;
    height: 0;
    width: 0;
    opacity: 0;
  }
}

@keyframes jxls-table-cell {
  0% {
    transform: rotateZ(0deg);

    opacity: 0;
  }
  100% {
    transform: rotateZ(3600deg);
    opacity: 1;
  }
}
.jxls-table {
  .el-table .cell {
    white-space: nowrap;
  }
}
</style>
