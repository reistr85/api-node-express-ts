import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface";
import { CreateUrlDto, CreatedUrlDto } from "../dtos/create-url.dto";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { UrlEntity } from "../../../../domain/entities/url/url.entity";

@injectable()
export class CreateUrlUseCase {
  constructor(
    @inject('UrlRepository') private readonly urlRepository: IUrlRepository,
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(createUrlDto: CreateUrlDto, user?: any): Promise<CreatedUrlDto>{
    let userLogged
    if (user) {
       userLogged = await this.userRepository.findByEmail(user.email)
    }

    if(!createUrlDto) throw new Error('Enter your URL')

    const url = new UrlEntity({
      ...createUrlDto,
      userId: userLogged?.uuid,
      companyId: userLogged?.companyId
    })

    await this.urlRepository.save({
        ...url,
        userId: userLogged?.uuid,
        companyId: userLogged?.companyId
    })

    const output = {
      id: url.id,
      uuid: url.uuid,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      newUrl: `http://localhost:3000/${url.shortUrl}`,
      clickCount: url.clickCount,
      userId: url.userId,
      companyId: url.companyId,
      isActive: url.isActive,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      deletedAt: url.deletedAt,
    }

    return output
  }
}
