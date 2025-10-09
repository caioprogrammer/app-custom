export interface MainMenuProps {
  data?: Data
  customLinks?: CustomLinks[]
  children?: React.ReactElement
}

export interface CustomLinks {
  name: string
  href: string
  order: number
  banners: MenuBanners[]
  children?: CustomLinksItem[]
  hasChildren: boolean
  setOpenMenu: Function
}

export interface CustomLinksItem {
  name: string
  href: string
  children?: CustomLinksSubItem[]
  order?: number
  setOpenMenu?: Function
}

export interface CustomLinksSubItem {
  name: string
  href: string
  order?: number
}

export type CategoriesChildren = {
  id: number
  name: string
  href: string
  order?: number
}

type Data = {
  categories: CategoriesTypes[]
}

export type CategoriesTypes = {
  id: number
  name: string
  href: string
  children: CategoriesChildren[]
  hasChildren: boolean
}

export type MenuBanners = {
  image: string
  link: string
  name: string
}
