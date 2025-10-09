export interface Contato {
  nome: string
  email: string
  celular: string
  mensagem: string
}
export class SobMedidaMasterDataService {
  private url = '/api/dataentities/SM/documents'
  public postRequest(props: Contato): Promise<Response> {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vtex.ds.v10+json',
    }

    const config: RequestInit = {
      method: 'post',
      headers,
      body: JSON.stringify(props),
    }

    return fetch(this.url, config).then(response => {
      if (!response.ok) {
        throw new Error('Request failed')
      }
      return response
    })
  }
}
