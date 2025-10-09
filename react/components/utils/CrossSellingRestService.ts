/* eslint-disable no-return-await */
import { ICrossSellingService, IProducts } from './ICrosselingService'

class CrossSellingService implements ICrossSellingService {
  private _url = {
    similars: '/api/catalog_system/pub/products/crossselling/similars',
    suggestions: '/api/catalog_system/pub/products/crossselling/suggestions',

    showtogether: '/api/catalog_system/pub/products/crossselling/showtogether',
  }

  public async similars(id: string) {
    const res = await this._loadProduct('similars', id)
    return this._cleanProducts(res)
  }

  public async suggestions(id: string) {
    const res = await this._loadProduct('suggestions', id)
    return this._cleanProducts(res)
  }

  public async showtogether(id: string) {
    const res = await this._loadProduct('showtogether', id)
    return this._cleanProducts(res)
  }

  private async _loadProduct(
    type: 'similars' | 'suggestions' | 'showtogether',
    id: string
  ) {
    if (Reflect.has(this._url, type)) {
      return await (await fetch(`${this._url[type]}/${id}`)).json()
    }

    return false
  }

  private _cleanProducts(products: IProducts[]) {
    const cleanProducts = []
    const usedIds = []

    // cria lista sem repetiçaõ de produtos
    for (let i = 0; i < products.length; i++) {
      const item = products[i]
      if (usedIds.indexOf(item.productId) < 0) {
        cleanProducts.push({ ...item })
        usedIds.push(item.productId)
      }
    }

    return cleanProducts
  }
}

export default CrossSellingService
