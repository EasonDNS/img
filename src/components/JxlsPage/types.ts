import { I_FormConfig } from '@/base/JxlsForm/type'

interface I_PageConfig {
  formConfig: I_FormConfig
  slotName?: string
  [x: string]: any
}

// interface I_PageData {}

export { I_PageConfig }
