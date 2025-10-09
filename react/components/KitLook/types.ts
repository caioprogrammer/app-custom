export interface KitLookProduct {
  available: boolean
  dimensions: string[]
  name: string
  skus: KitLookSkus[]
}

export type KitLookSkus = {
  available: boolean
  image: string
  bestPriceFormated: string
  seller: string
  sellerId: string
  skuname: string
  sku: number
  installmentsValue: number
}
