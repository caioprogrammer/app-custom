/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IImages {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
}

export interface ISellers {
  commertialOffer: IComertialOffer
  sellerId: string
}

export interface IComertialOffer {
  Price: number
  IsAvailable: boolean
  AvailableQuantity: number
  Installments: any
}
export interface ISpecificationsGroups {
  name: string
  originalName: string
  specifications?: ISpecificationsGroups[]
  values?: string[]
}
export interface IProducts {
  productId: string
  link: string
  linkText: string
  productName: string
  productTitle: string
  metaTagDescription: string
  items: Array<{ images: IImages[]; sellers: ISellers[]; itemId: string }>
}

export interface ICrossSellingService {
  similars(id: string | undefined): Promise<IProducts[]>
  suggestions(id: string | undefined): Promise<IProducts[]>
  showtogether(id: string | undefined): Promise<IProducts[]>
}
