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

  async handle(createUrlDto: CreateUrlDto): Promise<CreatedUrlDto>{
    const urlHasBelonging = await this.userRepository.findByUuid(createUrlDto.userId)
    const url = new UrlEntity(createUrlDto)
    if (urlHasBelonging) {
      await this.urlRepository.save({
        ...url,
        userId: urlHasBelonging.uuid
      })
    }

    await this.urlRepository.save(url)
    const output = {
      id: url.id,
      uuid: url.uuid,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      userId: url.userId,
      isActive: url.isActive,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      deletedAt: url.deletedAt,
    }

    return output
  }
}
