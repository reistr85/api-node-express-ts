import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface";

@injectable()
export class RedirectUrlUseCase {
  constructor(@inject('UrlRepository') private readonly urlRepository: IUrlRepository){}

  async handle(shortUrl: string): Promise<string | null>{
    const shortenedUrl = await this.urlRepository.findByShortUrl(shortUrl)
    if (!shortenedUrl) return null

    shortenedUrl.clickCount += 1
    await this.urlRepository.updateClickCount(shortenedUrl.uuid, shortenedUrl.clickCount)

    return shortenedUrl.originalUrl
  }
}
