import type { FormRules } from 'element-plus'

const LoginRules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码~',
      trigger: 'change'
    },
    { min: 3, max: 5, message: '请输入最小3位的密码', trigger: 'blur' }
  ]
}

export type { LoginRules }
