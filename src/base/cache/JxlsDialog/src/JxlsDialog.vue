<template>
  <el-dialog
    v-model="isShowDialog"
    title="编辑"
    :width="dialogConfig.dialogWidth ?? '50%'"
    draggable
    destroy-on-close
    center
    align-center
    :lock-scroll="true"
    :fullscreen="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <jxls-form
      v-model="formData"
      :form-config="formConfig"
      @visibleChange="handleVisibleChange"
      @submit="handleSubmitClick"
    >
      <template v-for="sName of formSlots" :key="sName.slotName">
        <template v-if="sName.slotName" v-slot:[sName.slotName]="scop">
          <slot :name="sName.slotName" :scop="scop"></slot>
        </template>
      </template>
    </jxls-form>
  </el-dialog>
</template>

<script lang="ts" setup>
//-------------------------import ---------------------------- -
import { defineEmits, defineExpose, defineProps, type PropType, ref, watch } from 'vue'
//@ts-ignore
import { JxlsForm } from '@/base/JxlsForm'
import type { I_DialogConfig, I_SelectorField } from '../type.ts'
import type { I_FormConfig } from '@/base/JxlsForm/type.ts' //

//<!-- -------------------------emits props---------------------------- -->

const emits = defineEmits<{
  (e: 'submit', subData: any, selectorField?: I_SelectorField): void
  (e: 'open', selectorField?: I_SelectorField): void
  (e: 'close', selectorField?: I_SelectorField): void
}>()

const props = defineProps({
  //这是从user => rowActiveData
  dialogData: {
    type: Object,
    required: true
  },
  dialogConfig: {
    type: Object as PropType<I_DialogConfig>,
    required: true
  }
})
//<!-- -------------------------let const  ---------------------------- -->

const formConfig = ref<I_FormConfig>({
  ...props.dialogConfig.formConfig,
  formStyle: {
    layout: 24,
    isShowHeader: false
  }
})

let isShowDialog = ref(false)
let selectorField = ref<I_SelectorField>('edit')
let formData = ref({ ...props.dialogData })

//<!-- -------------------------Fn---------------------------- -->
//<!---------------------------- slotName -------------------------------->
const formSlots = props.dialogConfig.formConfig.formItems.filter((item: any) => {
  if (item.slotName) {
    return true
  }
})
//<!-- -------------------------handle Fn---------------------------- -->

const handleSubmitClick = (formSubData: any) => {
  emits('submit', formSubData, selectorField.value)
  isShowDialog.value = false
}
//监听 form中传出的 select 事件, 参数为当前config中的那个 item
const handleVisibleChange = (formItem: any) => {
  // 传入一个 form item  通过 这个函数去处理 department role
  // visibleChange(formItem)
  console.log(formItem)
}
const handleOpen = () => {
  if (selectorField.value === 'edit') {
    formData.value = { ...props.dialogData }
  }
  if (selectorField.value === 'add') {
    formData.value = {}
  }
  emits('open', selectorField.value)
}
const handleClose = () => {
  emits('close', selectorField.value)
}
//<!-- -------------------------watch---------------------------- -->

watch(
  () => props.dialogData,
  (newValue) => {
    formData.value = newValue
  }
)
//<!-- -------------------------expose---------------------------- -->

defineExpose({ isShowDialog, selectorField })

//<!-- -------------------------Tools ---------------------------- -->
</script>

<style lang="less" scoped>
.el-dialog {
  border-radius: 10px;
}
</style>
