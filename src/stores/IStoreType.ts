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

// navigation type--------------------------------------------------------------------------------------
interface IResponseType {
  code: number
  message: string
  data: any
}
interface INavigationMenuType {
  name: string
  url: string
  id: number
  imgUrl: string
  category?: string
  CreateAt?: Date
  UpdateAt?: Date
  // [x: string]：表示这个接口允许有任意数量的、以 字符串 作为键（属性名）的属性。
  [x: string]: any
}
interface INavigationStateType {
  navigationMenu: INavigationMenuType[]
}
// navigation type--------------------------------------------------------------------------------------

// 定义public store 的一些接口 end --------------------------------------------------------------------------------------

export type { IPublicStoreType, INavigationMenuType, INavigationStateType, IResponseType }
