export default class OrderFormService {
  private url = {
    orderForm: '/api/checkout/pub/orderForm/',
  }

  public async getOrderForm(): Promise<OrderForm> {
    const req = await fetch(this.url.orderForm)
    const data = await req.json()
    return data as OrderForm
  }

  public async marketingDataPost(
    orderForm: any,
    utmCampaign: string,
    utmiPart: string,
    utmiPage: string
  ): Promise<any> {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ...(orderForm.marketingData || {}),
        utmiCampaign: utmCampaign,
        utmiPart: utmiPart,
        utmiPage: utmiPage,
      }),
    }

    const req = await fetch(
      `${this.url.orderForm}/${orderForm.id}/attachments/marketingData`,
      content
    )

    return req.json()
  }

  public async shippingCalc(
    orderFormId: string,
    postalCode: string,
    country = 'BRA'
  ): Promise<any> {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        address: { postalCode, country },
      }),
    }

    const req = await fetch(
      `${this.url.orderForm}/${orderFormId}/attachments/shippingData`,
      content
    )

    return req.json()
  }

  public async addCoupon(orderForm: any, coupon: string): Promise<any> {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ...(orderForm.marketingData || {}),
        coupon: coupon,
      }),
    }

    const req = await fetch(
      `${this.url.orderForm}/${orderForm.id}/attachments/marketingData`,
      content
    )

    return req.json()
  }

  public async removeCoupon(orderForm: any): Promise<any> {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ...(orderForm.marketingData || {}),
        coupon: 'coupon',
      }),
    }

    const req = await fetch(
      `${this.url.orderForm}/${orderForm.id}/attachments/marketingData`,
      content
    )

    return req.json()
  }
}
