<template>
  <div class="jxls-page-content">
    <transition name="el-zoom-in-center">
      <div class="top" v-if="isShowTop">
        <el-form>
          <JxlsForm
            :form-config="pageForm.formConfig"
            v-model="pageForm.formData"
            @submit="handleFormSubmit"
            @visibleChange="handleFormVisibleChange"
            @resetFormData="handleResetFormData"
          >
            <template v-for="sName of formSlots" :key="sName.slotName" #[sName.slotName!]="scop">
              <slot :name="sName.slotName" :scop="scop"></slot>
            </template>
          </JxlsForm>
        </el-form>
      </div>
    </transition>
    <!-- -------------------------center---------------------------- -->
    <div class="center">
      <el-scrollbar :max-height="maxHeight">
        <JxlsDialog
          ref="jxlsDialogRef"
          :dialog-config="pageDialog.dialogConfig"
          :dialog-data="pageDialog.dialogData"
          @submit="handleDialogSubmit"
          @open="handleDialogOpen"
          @close="handleDialogClose"
        >
          <template v-for="sName of dialogSlots" :key="sName.slotName" #[sName.slotName!]="scop">
            <slot :name="sName.slotName" :scop="scop"></slot>
          </template>
        </JxlsDialog>
      </el-scrollbar>
      <!---------------------------- jxls table -------------------------------->
      <JxlsTable
        :table-config="pageTable.tableConfig"
        :table-data="pageTable.tableData"
        :total="props.totalCount ?? 100"
        @rowDbClick="handleTableRowDbClick"
        @rowCtrlEdit="handleTableRowCtrlEdit"
        @rowCtrlDelete="handleTableRowCtrlDelete"
        @select="handleTableSelect"
        @selectAll="handleTableSelectAll"
        @refresh="handleTableHeaderRefresh"
        @add="handleTableHeaderAdd"
        @edit="handleTableHeaderEdit"
        @delete="handleTableHeaderDelete"
        @search="handleTableHeaderSearch"
        @showSearch="handleTableHeaderShowSearch"
        @size-change="handleTableFooterSizeChange"
        @current-change="handleTableFooterCurrentChange"
      >
        <template v-for="sName of tableSlots" :key="sName.label" #[sName.slotName!]="scop">
          <slot :name="sName.slotName" :scop="scop"></slot>
        </template>
      </JxlsTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { JxlsDialog } from '@/base/JxlsDialog'
import { JxlsForm } from '@/base/JxlsForm'
import { JxlsTable } from '@/base/jxlsTable'
// import { visibleChange } from '@/hooks'
// import { mapArrayGen } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { I_DialogConfig, I_FormConfig, I_SelectorField, I_TableConfig } from '@/base/types.ts'
import { computed, type PropType, ref, watch } from 'vue'

//<!-- -------------------------props emits---------------------------- -->
// eslint-disable-next-line no-undef
const props = defineProps({
  totalCount: {
    type: Number,
    required: false
  },
  formData: {
    type: Object,
    required: false
  },
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  dialogData: {
    type: Object,
    required: false
  },
  formConfig: {
    type: Object as PropType<I_FormConfig>,
    required: true
  },
  tableConfig: {
    type: Object as PropType<I_TableConfig>,
    required: true
  },
  dialogConfig: {
    type: Object as PropType<I_DialogConfig>,
    required: true
  },
  pageConfig: {
    type: Object as PropType<any>,
    required: false
  },
  formSubFn: {
    type: Function,
    required: false
  },
  refreshFn: {
    type: Function,
    required: true
  },
  addFn: {
    type: Function,
    required: false
  },
  deleteRowFn: {
    type: Function,
    required: false
  },
  editFn: {
    type: Function,
    required: false
  },
  searchFn: {
    type: Function,
    required: false
  }
})
//<!-- -------------------------emits ---------------------------- -->

//<!-- -------------------------let const ---------------------------- -->
const menuList = ref<any[]>([])
let maxHeight = ref('400px')
let pageSize = ref<number>(10)
let currentPage = ref<number>(1)
let isDone = ref<boolean>()
let isShowTop = ref<boolean>(false)
const jxlsDialogRef = ref<InstanceType<typeof JxlsDialog>>()
let generatorFn: Generator<any, any, any>
let activeRows = ref<any[]>([])
let activeRow = ref<any>({})
const pageForm = ref({
  formConfig: { ...props.formConfig },
  formData: { ...props.formData }
})
// const pageTable = ref({
//   tableConfig: { ...props.tableConfig },
//   tableData: props.tableData ?? []
// })
const pageTable = computed(() => {
  return {
    tableConfig: props.tableConfig,
    tableData: [...props.tableData]
  }
})
const pageDialog = ref({
  dialogConfig: { ...props.dialogConfig },
  dialogData: { ...props.dialogData }
})
const pageConfig = ref({ ...props.pageConfig })
//<!---------------------------- slotName -------------------------------->
const formSlots = pageForm.value.formConfig?.formItems.filter((item: any) => {
  return !!item.slotName
})
const tableSlots = pageTable.value.tableConfig.tableItems.filter((item: any) => {
  if (item.slotName) {
    return true
  }
})
const dialogSlots = pageDialog.value.dialogConfig.formConfig.formItems.filter((item: any) => {
  if (item.slotName) {
    return true
  }
})

//<!---------------------------- handle fn -------------------------------->
const handleFormSubmit = (formData: any) => {
  if (props.formSubFn) {
    props.formSubFn(formData)
    jxlsDialogRef.value!.isShowDialog = false
  }
}
const handleFormVisibleChange = (formItem: any) => {
  // visibleChange(formItem)
}
const handleResetFormData = async () => {
  if (props.refreshFn) {
    await props.refreshFn()
  }
}
//<!---------------------------- handle dialog fn  -------------------------------->
const handleDialogSubmit = async (subData: any, selectorField?: I_SelectorField) => {
  if (selectorField === 'edit') {
    if (props.editFn) {
      await props.editFn(subData)
    }
  }
  if (selectorField === 'add') {
    if (props.addFn) {
      await props.addFn(subData)
    }
  }
}
// 在调出这个dialog 会把row 传进来 ,可以从table 头部 的编辑调出,也可以从每一行中的编辑调出
// 所以这个打开的时候一定能拿 到row 数据
const handleDialogOpen = () => {
  console.log('------+++++> dialogData ==> ', pageDialog.value.dialogData)
  console.log('----> dialog open ==>  menuList ', menuList.value)

  // debugger
  isDone.value = false
}
const handleDialogClose = () => {
  isDone.value = true
  // 在关闭是去初始化activeRow
  activeRow.value = {}
  props.refreshFn()
}
//<!---------------------------- handle table fn  -------------------------------->
const handleTableRowDbClick = (row: any) => {
  pageDialog.value.dialogData = row
  activeRow.value = row
  jxlsDialogRef.value!.selectorField = 'edit'
  jxlsDialogRef.value!.isShowDialog = true
}
const handleTableRowCtrlEdit = (row: any) => {
  pageDialog.value.dialogData = row
  activeRow.value = row
  console.log('----> dialog open ==>  row edit  menuList ', menuList.value)
  jxlsDialogRef.value!.selectorField = 'edit'
  jxlsDialogRef.value!.isShowDialog = true
}
const handleTableRowCtrlDelete = async (row: any) => {
  if (props.deleteRowFn) {
    activeRow.value = row
    await props.deleteRowFn(row)

    if (props.refreshFn) {
      await props.refreshFn()
    }
  }
}
// 会从Table 中传递一个选中的行数组
const handleTableSelect = (rows: any[]) => {
  activeRows.value = rows
}
const handleTableSelectAll = (rows: any[]) => {
  activeRows.value = rows
}
//table header 中第一个刷新按钮 事件
//<!-- -------------------------会调用 refreshFn---------------------------- -->
const handleTableHeaderRefresh = async () => {
  pageForm.value.formData = {}
  if (props.refreshFn) {
    await props.refreshFn({
      offset: (currentPage.value - 1) * pageSize.value,
      size: pageSize.value
    })
  }
}
// 添加时会调出dialog 并把 createAt 和 updateAt 两个字段 屏蔽掉
const handleTableHeaderAdd = () => {
  pageDialog.value.dialogConfig.formConfig.formItems.forEach((item: any) => {
    if (item.field === 'createAt' || item.field === 'updateAt') {
      item.isShow = false
    }
  })

  jxlsDialogRef.value!.selectorField = 'add'
  jxlsDialogRef.value!.isShowDialog = true
}
// table header 中的编辑按钮 会接受一个rows数组
//<!-- -------------------------editFn ---------------------------- -->
// 会去调用 editFn
const handleTableHeaderEdit = async (rows: any[]) => {
  generatorFn = mapArrayGen(rows, async (row: any) => {
    jxlsDialogRef.value!.isShowDialog = true
    jxlsDialogRef.value!.selectorField = 'edit'
    pageDialog.value.dialogData = row
    if (props.editFn) {
      await props.editFn(row)
    }
  })
  generatorFn.next()
}
//<!-- -------------------------deleteRowFn---------------------------- -->
// 会调用 props 中传递过来的 deleteRowFn
const handleTableHeaderDelete = (rows: any[]) => {
  generatorFn = mapArrayGen(rows, async (row: any) => {
    ElMessageBox.confirm(`是否确定需要删除 ${row.id} --${row.name}  这行数据~`, 'Warning', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      draggable: true
    })
      .then(async () => {
        if (props.deleteRowFn) {
          await props.deleteRowFn(row)
        }
        generatorFn.next()
        ElMessage({
          type: 'success',
          center: true,
          message: `删除 ${row.id} --${row.name}这行数据成功~`
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: `取消 删除 ${row.id} --${row.name} 这行数据~ `
        })
      })
  })
  generatorFn.next()
}
//<!-- -------------------------searchFn---------------------------- -->
// 会调用 props 中传递过来的 搜索 函数
// 参数 searchData searchField
const handleTableHeaderSearch = async (searchData: string, searchField?: string) => {
  if (props.searchFn) {
    await props.searchFn(searchData, searchField)
  }
}
const handleTableHeaderShowSearch = () => {
  isShowTop.value = !isShowTop.value
}
// 接受第一个参数为pageSize 每页数量  第二参数 currentPage 为当前页码
//<!-- -------------------------会调用 refreshFn ---------------------------- -->
const handleTableFooterSizeChange = async (pz: number, cp: number) => {
  pageSize.value = pz
  currentPage.value = cp
  await props.refreshFn({
    offset: (cp - 1) * pz,
    size: pz
  })
}
const handleTableFooterCurrentChange = async (pz: number, cp: number) => {
  pageSize.value = pz
  currentPage.value = cp
  await props.refreshFn({
    offset: (cp - 1) * pz,
    size: pz
  })
}
//<!---------------------------- live Fn -------------------------------->
watch(
  () => props.tableData,
  (newValue) => {
    pageTable.value.tableData = newValue
  }
)
watch(isDone, (newValue) => {
  if (newValue) {
    try {
      generatorFn.next()
    } catch (error) {
      console.log('有可能是没有生成 生成器函数 请检查 ~')
    }
  }
})

//<!---------------------------- tools -------------------------------->
</script>

<style lang="less" scoped>
.jxls-page-content {
  .top {
    border-bottom: 1px solid floralwhite;
    padding-bottom: 10px;
    //margin-bottom: 10px;
  }
}
</style>
