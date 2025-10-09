export interface Contato {
  assunto: string
  celular: string
  email: string
  mensagem: string
  nome: string
  telefone: string
}
export class FaleConoscoMasterDataService {
  private url = '/api/dataentities/FC/documents'
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
