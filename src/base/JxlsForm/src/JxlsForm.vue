<template>
  <div class="jxls-form">
    <!-- ------------------------- jxls form header---------------------------- -->
    <div class="jxls-form-header" v-if="props.formConfig.formStyle?.isShowHeader ?? true">
      <slot name="header" :config="props.formConfig" :data="props.modelValue">
        <el-steps :active="step" finish-status="success" align-center>
          <el-step title="查询条件" description="输入需要查询的 attribute " :icon="Edit" />
          <el-step title="检验规则" description="是否通过Rules检验" :icon="Refrigerator" />
          <el-step title="提交" description="发送服务器" :icon="UploadFilled" />
        </el-steps>
      </slot>
    </div>
    <!-- ------------------------- form content---------------------------- -->
    <div class="jxls-form-content">
      <el-form
        ref="formRef"
        :model="formData"
        :scroll-to-error="true"
        :label-position="formConfig.formAttribute?.labelPosition ?? defaultLabelPosition"
        :label-width="formConfig.formAttribute?.labelWidth ?? defaultLabelWidth"
        v-bind="formConfig.formAttribute"
      >
        <el-row justify="center" :gutter="formConfig?.formStyle?.gutter ?? 50">
          <template v-for="item of formConfig.formItems" :key="item.field">
            <el-col v-bind="formConfig.formStyle?.layout ?? defaultLayout">
              <el-form-item
                v-if="item.isShow ?? true"
                v-bind="item.options"
                :prop="item.prop ?? item.field"
                :label="item.label"
                :rules="item.rules"
                :required="item.required"
                :label-width="item.labelWidth"
              >
                <!-- input password -->
                <!-- -------------------------input password ---------------------------- -->

                <template v-if="item.type === 'input' || item.type === 'password'">
                  <slot :name="[item.slotName]" :item="item">
                    <el-input
                      v-bind="item.options"
                      clearable
                      v-model="formData[`${item.field}`]"
                      :placeholder="item.placeholder ?? '这个家伙很懒~'"
                      :show-password="item.type === 'password'"
                      :suffix-icon="item.suffixIcon"
                      :prefix-icon="item.prefixIcon"
                    >
                      <template #append v-if="item.slotName === 'append'">
                        <slot name="append"></slot>
                      </template>
                      <template #suffix>
                        <slot name="suffix"></slot>
                      </template>
                      <template #prefix>
                        <slot name="prefix"></slot>
                      </template>
                    </el-input>
                  </slot>
                </template>
                <!-- inputNumber -->
                <!-- -------------------------input Number---------------------------- -->
                <template v-else-if="item.type === 'inputNumber'">
                  <el-input-number
                    v-bind="item.options"
                    :placeholder="item.placeholder"
                    v-model="formData[`${item.field}`]"
                  />
                </template>
                <!-- dateRange -->
                <!-- -------------------------dateRange---------------------------- -->

                <template v-else-if="item.type === 'dateRange'">
                  <el-date-picker
                    v-bind="item.options"
                    type="daterange"
                    start-placeholder="start date"
                    end-placeholder="end date"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData[`${item.field}`]"
                  ></el-date-picker>
                </template>
                <!-- date -->
                <!-- -------------------------date---------------------------- -->

                <template v-else-if="item.type === 'date'">
                  <el-date-picker
                    v-bind="item.options"
                    type="date"
                    placeholder="选择时间~"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData[`${item.field}`]"
                  >
                  </el-date-picker>
                </template>
                <!-- select   -->
                <!-- -------------------------select---------------------------- -->

                <template v-else-if="item.type === 'select'">
                  <el-select
                    v-bind="item?.selectOptions"
                    @visible-change="visibleChange(item)"
                    v-model="formData[`${item.field}`]"
                    :placeholder="item.placeholder"
                    :clearable="item.selectOptions?.clearable ?? true"
                  >
                    <el-option
                      v-for="option of item?.selectOptions?.selectSubOptions ?? [
                        {
                          value: 'value',
                          label: 'label'
                        }
                      ]"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                      <span>{{ option.label }}</span>

                      <span v-if="item.selectOptions?.isShowValue ?? true">
                        -- {{ option.value }}</span
                      >
                    </el-option>
                  </el-select>
                </template>
                <!-- switch  -->
                <!-- -------------------------switch---------------------------- -->

                <template v-else-if="item.type === 'switch'">
                  <slot :name="[item.slotName]" :item="item">
                    <el-switch
                      v-bind="item.options"
                      v-model="formData[`${item.field}`]"
                      :active-value="1"
                      :inactive-value="0"
                      :active-text="item.activeText ?? '是'"
                      :inactive-text="item.inactiveText ?? '否'"
                      :validate-event="true"
                      inline-prompt
                    ></el-switch>
                  </slot>
                </template>
                <!-- radio -->
                <!-- -------------------------radio---------------------------- -->
                <template v-else-if="item.type === 'radio'">
                  <slot :name="[item.slotName]" :item="item">
                    <el-radio-group
                      v-model="formData[`${item.field}`]"
                      :size="item.radioOptions?.size ?? 'small'"
                    >
                      <template v-for="sub of item.radioOptions?.labels ?? []" :key="sub.label">
                        <el-radio-button v-if="item.radioOptions?.isButton" :label="sub.label">
                          {{ sub.placeholder }}
                        </el-radio-button>

                        <el-radio
                          v-else
                          :label="sub.label"
                          :border="item.radioOptions?.border ?? true"
                          :disabled="item.radioOptions?.disabled ?? false"
                          >{{ sub.placeholder }}
                        </el-radio>
                      </template>
                    </el-radio-group>
                  </slot>
                </template>

                <template v-else-if="item.type === 'tree'">
                  <slot :name="[item.slotName]" :item="item"></slot>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <!-- -------------------------jxls form footer ---------------------------- -->

    <div class="jxls-form-footer" v-if="formConfig?.formStyle?.isShowFooter ?? true">
      <slot name="footer" :config="props.formConfig" :data="formData">
        <el-button
          type="danger"
          plain
          round
          :icon="CircleCloseFilled"
          :disabled="isDisabled"
          @click="handlerResetFormData"
        >
          {{ formConfig.formAttribute?.footerReset ?? '重置' }}
        </el-button>
        <el-button type="success" plain round :icon="Check" @click="handleSubmit">
          {{ formConfig.formAttribute?.footerSubmit ?? '提交' }}
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
//  -------------------------import ----------------------------
import type { ElForm } from 'element-plus'
import type { I_FormConfig, I_LabelPosition } from '../type.ts'

import { type PropType, ref, watch } from 'vue'
import { Check, CircleCloseFilled, Refrigerator } from '@element-plus/icons-vue'

//<!-- -------------------------props  emits---------------------------- -->
// eslint-disable-next-line no-undef
const emits = defineEmits<{
  (e: 'update:modelValue', newValue: any): void
  (e: 'submit', item: any): void
  (e: 'visibleChange', item: any): void
  (e: 'resetFormData'): void
}>()
// eslint-disable-next-line no-undef
const props = defineProps({
  formConfig: {
    type: Object as PropType<I_FormConfig>,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
})

//------------------------------let const ---------------------------------
const defaultLabelPosition = ref<I_LabelPosition>('right')
const defaultLabelWidth = ref('80px')
const defaultLayout = ref({
  xl: 6, // >1920px 4个
  lg: 8,
  md: 12,
  sm: 24,
  xs: 24
})

const formRef = ref<InstanceType<typeof ElForm>>()
let formData = ref({ ...props.modelValue })
let defaultFormData = ref({ ...props.modelValue })
let step = ref(1)
let isDisabled = ref(true)

//<!-- -------------------------FN---------------------------- -->
const visibleChange = (item: any) => emits('visibleChange', item)

//<!-- -------------------------handle---------------------------- -->

const handlerResetFormData = () => {
  formRef.value?.resetFields()
  isDisabled.value = true
  emits('resetFormData')
}
// 监听提交
const handleSubmit = () => {
  formRef.value?.validate((isValid, fields) => {
    // 检察是否通过验证
    if (isValid) {
      step.value++
      emits('submit', filterFormData(formData.value))
    } else {
      console.log('请检查这个字段是否符合要求~', fields)
    }
  })
}
//<!-- -------------------------liveFn---------------------------- -->

watch(
  formData,
  (newValue) => {
    emits('update:modelValue', newValue)
    step.value = 1
    if (formData.value != defaultFormData.value) {
      isDisabled.value = false
    }
  },
  {
    deep: true
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = newValue
  }
)
// eslint-disable-next-line no-undef
defineExpose({
  formRef
})
//--------------------------------工具函数 -------------------------------
// 去除 时间
const filterFormData = (formData: any) => {
  if (formData.createAt) {
    delete formData.createAt
  }
  if (formData.updateAt) {
    delete formData.updateAt
  }
  return formData
}
</script>

<style lang="less" scoped>
.jxls-form {
  box-sizing: border-box;

  .jxls-form-header {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .jxls-form-footer {
    text-align: right;
    padding: 0 20px;
  }
}
</style>
