import { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

export interface ProductAndQuery {
  query: Record<string, any>
  product: MaybeProduct
}
declare type GroupId = string
export interface AssemblyOptionItem {
  id: string
  quantity: number
  seller: string
  initialQuantity: number
  choiceType: string
  name: string
  price: number
  children: Record<string, AssemblyOptionItem[]> | null
}
export interface BuyButtonContextState {
  clicked: boolean
}
export interface SkuSelectorContextState {
  selectedImageVariationSKU: string | null
  isVisible: boolean
  areAllVariationsSelected: boolean
}
export interface ProductContextState {
  loadingItem: boolean
  selectedItem?: Item | null
  product: MaybeProduct
  selectedQuantity: number
  skuSelector: Partial<SkuSelectorContextState>
  buyButton: BuyButtonContextState
  assemblyOptions: {
    items: Record<GroupId, AssemblyOptionItem[]>
    inputValues: Record<GroupId, InputValues>
    areGroupsValid: Record<GroupId, boolean>
  }
}

export declare type Item = {
  complementName: string
  ean: string
  images: Array<{
    imageId: string
    imageLabel: string
    imageTag: string
    imageUrl: string
    imageText: string
  }>
  itemId: string
  kitItems: KitItem[]
  measurementUnit: string
  name: string
  nameComplete: string
  referenceId: Array<{
    Key: string
    Value: string
  }>
  sellers: Seller[]
  unitMultiplier: number
  variations: Array<{
    name: string
    values: string[]
  }>
  videos: Array<{
    videoUrl: string
  }>
}

export declare type Seller = {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommercialOffer
}

export declare type CommercialOffer = {
  Installments: Installment[]
  discountHighlights: Array<{
    name: string
  }>
  teasers: Teaser[]
  Price: number
  ListPrice: number
  spotPrice: number
  SellingPrice?: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  taxPercentage: number
  CacheVersionUsedToCallCheckout: string
}

export declare type Installment = {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

declare type TeaserCondition = {
  minimumQuantity: number
  parameters: Array<{
    name: string
    value: string
  }>
}
declare type TeaserEffects = {
  parameters: Array<{
    name: string
    value: string
  }>
}
export declare type Teaser = {
  name: string
  conditions: TeaserCondition
  effects: TeaserEffects
}

declare type KitItem = {
  amount: number
  itemId: string
  product: ProductKit
  sku: SkuProductKit
}

declare type ProductKit = {
  brand: string
  categoryId: string
  categoryTree: any
  description: string
  linkText: string
  productId: string
  productName: string
  properties: any
}

declare type SkuProductKit = {
  images: Array<{
    imageId: string
    imageLabel: string
    imageTag: string
    imageUrl: string
    imageText: string
  }>
  itemId: string
  name: string
  referenceId: Array<{
    Key: string
    Value: string
  }>
  sellers: Seller[]
}

declare type InputValues = Record<string, string>
