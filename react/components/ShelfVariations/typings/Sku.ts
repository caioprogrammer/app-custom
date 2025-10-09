export type ComemertialOffer = {
  AvailableQuantity: number
}

export type Sellers = {
  commertialOffer: ComemertialOffer
}

export type Sku = {
  name: string
  itemId: string
  sellers: Sellers[]
}

export type AddToCartItem = {
  id: string | number
  seller: number
  quantity: number
}

export type KitValue = {
  name: string
  values: string[]
  originalName: string
}

export type KitInfo = {
  specifications: KitValue[]
}
