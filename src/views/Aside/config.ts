import type { InterFace_AsideView } from './type.ts'

const asideConfig: InterFace_AsideView[] = [
  {
    name: 'DOC',
    url: '/DOC',
    iconName: 'ChatLineSquare'
  },
  {
    name: 'NAS',
    url: '/nas',
    iconName: 'Monitor',
    children: [
      {
        name: 'file',
        url: '/nas/file',
        iconName: 'Folder'
      },
      {
        name: 'webDav',
        url: '/nas/webDav',
        iconName: 'Box'
      }
    ]
  },
  {
    name: 'Tools',
    url: '/tools',
    iconName: 'Paperclip',
    children: [
      {
        name: 'file',
        url: '/tools//file',
        iconName: 'Folder'
      },
      {
        name: 'webDav',
        url: '/tools//webDav',
        iconName: 'Box'
      }
    ]
  }
]
// <el-icon><ChatLineSquare /></el-icon>

export { asideConfig }
