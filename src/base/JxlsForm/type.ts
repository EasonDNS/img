import type { FormItemRule, FormRules } from 'element-plus'

interface I_FormConfig {
  formItems: I_FormItem[]
  formStyle?: I_FormStyle
  formAttribute?: I_FormAttribute
}

interface I_FormAttribute {
  rules?: FormRules
  labelPosition?: string | number
  labelWidth?: string | number
  labelSuffix?: string
  footerReset?: string
  footerSubmit?: string
  [x: string]: any
}

interface I_FormItem {
  //指定需要
  type: I_FormItemType
  prop: string
  field: string
  label?: string
  labelWidth?: string | number
  required?: boolean
  placeholder?: string
  options?: any
  specialOptions?: any
  rules?: FormItemRule | FormItemRule[]
  showMessage?: boolean
  prefixIcon?: string
  suffixIcon?: string
  readonly?: boolean
  slotName?: string
  selectOptions?: I_SelectOptions
  radioOptions?: I_RadioOptions
  isShow?: boolean
  [x: string]: any
}
interface I_RadioOptions {
  size?: 'large' | 'small' | 'default'
  labels?: I_Label[]
  border?: boolean
  disabled?: boolean
  textColor?: string
  fill?: string
  isButton?: boolean
}
interface I_Label {
  label: string | number
  placeholder?: string
}

interface I_SelectOptions {
  selectSubOptions: I_SelectSubOptions[]
  [x: string]: any
}
interface I_SelectSubOptions {
  value: string
  label?: string
  isShowValue?: boolean
}

type I_FormItemType =
  | 'input'
  | 'select'
  | 'password'
  | 'checkbox'
  | 'inputNumber'
  | 'switch'
  | 'tree'
  | 'dateRange'
  | 'date'
  | 'mouthRange'
  | 'radio'

interface I_FormStyle {
  gutter?: number
  col?: number
  layout?: any
  labelWidth?: string
  isShowHeader?: boolean
  isShowFooter?: boolean
}

type I_LabelPosition = 'left' | 'right' | 'top'

export type { I_FormConfig, I_FormItem, I_LabelPosition }
