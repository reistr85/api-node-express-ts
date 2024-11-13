import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { UnauthorizedError } from "../../../../shared/errors/unauthorized.error";

@injectable()
export class RedirectUrlUseCase {
  constructor(
    @inject('UrlRepository') private readonly urlRepository: IUrlRepository,
    @inject('UserRepository') private readonly userRepository: IUserRepository){}

  async handle(shortUrl: string, user: any): Promise<string | null>{
    let userLogged
    const shortenedUrl = await this.urlRepository.findByShortUrl(shortUrl)
    if (!shortenedUrl) return null

    if (user) {
      userLogged = await this.userRepository.findByEmail(user.email)
      if(userLogged && shortenedUrl?.userId !== userLogged?.uuid) throw new UnauthorizedError()
    }

    shortenedUrl.clickCount += 1
    await this.urlRepository.updateClickCount(shortenedUrl.uuid, shortenedUrl.clickCount)

    return shortenedUrl.originalUrl
  }
}
