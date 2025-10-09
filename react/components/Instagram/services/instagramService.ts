export default class InstagramService {
  private url = {
    instagram: 'https://graph.instagram.com/me/media?fields=media_url,thumbnail_url,media_type,caption,permalink&access_token=',
  }

  public async GetPosts(token: string): Promise<any> {
  
    // console.log("url -> ", `${this.url.instagram}${token}`)
    const req = await fetch(`${this.url.instagram}${token}`)

    return req.json()
  }
}
