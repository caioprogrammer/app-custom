import type { ReactNode, Dispatch } from 'react'

export type KitLookProviderType = {
  children: ReactNode | ReactNode[]
}

export interface KitLookActions {
  state: KitLookTypes
  dispatch: Dispatch<Action>
}

export interface KitLookTypes {
  topProduct?: KitLookProduct
  bottomProduct?: KitLookProduct
  topToCart: AddToCart
  bottomToCart: AddToCart
  valueTop: number
  valueBottom: number
}

export type KitLookProduct = {
  available: boolean
  dimensions: string[]
  name: string
  skus: KitLookSkus[]
}

type KitLookSkus = {
  available: boolean
  image: string
  bestPriceFormated: string
  seller: string
  sellerId: string
  skuname: string
  sku: number
  bestPrice: number
  installmentsValue: number
}

type AddToCart = {
  id: number
  seller: number
  quantity: number
}

export type Action =
  | {
      type: 'SET_TOP'
      available: boolean
      dimensions: string[]
      name: string
      skus: KitLookSkus[]
    }
  | {
      type: 'SET_BOTTOM'
      available: boolean
      dimensions: string[]
      name: string
      skus: KitLookSkus[]
    }
  | { type: 'SET_TOPTOCART'; value: AddToCart }
  | { type: 'SET_BOTTOMTOCART'; value: AddToCart }
  | { type: 'SET_TOP_VALUE'; value: number }
  | { type: 'SET_BOTTOM_VALUE'; value: number }
