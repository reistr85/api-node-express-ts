import { injectable, inject } from "tsyringe"
import { UrlEntity } from "../../../../domain/entities/url/url.entity"
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface"
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface"
import { GetAllUrlsDto } from "../dtos/get-all-urls.dto"
import { UnauthorizedError } from "../../../../shared/errors/unauthorized.error"

@injectable()
export class GetAllUrlsUseCase {
  constructor(
    @inject('UrlRepository') private readonly urlRepository: IUrlRepository,
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(user: any): Promise<GetAllUrlsDto>{
    if(!user) throw new UnauthorizedError()

    const userWhoOwnsTheURLs = await this.userRepository.findByEmail(user.email)
    const urls = await this.urlRepository.find(userWhoOwnsTheURLs?.uuid)

    const output = this.presentOutput(urls)
    return output
  }

  private presentOutput(urls: UrlEntity[] | undefined): GetAllUrlsDto{
    if(!urls) throw new Error('Urls not defined')
    return {
      urls: urls.map((url) => {
        return {
          uuid: url.uuid,
          originalUrl: url.originalUrl,
          shortUrl: url.shortUrl,
          clickCount: url.clickCount,
          userId: url.userId,
          companyId: url.companyId,
          isActive: url.isActive,
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
          deletedAt: url.deletedAt,
        }
      })
    }
  }
}
