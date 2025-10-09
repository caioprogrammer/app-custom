export default class ProductService {
  private url = {
    product: '/api/catalog_system/pub/products/variations',
    ref: '/api/catalog_system/pvt/products/productgetbyrefid',
  }

  public async GetProductSkus(productId?: string): Promise<any> {
    const content = {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      method: 'GET',
    }

    const req = await fetch(`${this.url.product}/${productId}`, content)

    return req.json()
  }

  public async GetProductByRef(refId?: string): Promise<any> {
    const content = {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      method: 'GET',
    }

    const req = await fetch(`${this.url.ref}/${refId}`, content)

    return req.json()
  }
}
