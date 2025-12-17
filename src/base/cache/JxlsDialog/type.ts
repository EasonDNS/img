import type { I_FormConfig } from '@/base/JxlsForm/type'

interface I_DialogConfig {
  formConfig: I_FormConfig
  dialogWidth?: string
  [x: string]: any
}

type I_SelectorField = 'edit' | 'add' | 'delete'

export type { I_DialogConfig, I_SelectorField }
