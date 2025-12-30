// isExpand: true,
//   isShowBubble: true,
//   asideWidth: 300,
//   token?:String
// 定义public store 的一些接口 start --------------------------------------------------------------------------------------

interface IPublicStoreType {
  isExpand: boolean
  isShowBubble: boolean
  asideWidth: number
  token?: string
}

// 定义public store 的一些接口 end --------------------------------------------------------------------------------------

export type { IPublicStoreType }
