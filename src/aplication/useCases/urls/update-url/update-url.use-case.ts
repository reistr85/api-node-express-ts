import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface";
import { UpdateUrlDto } from "../dtos/update-url.dto";
import { UrlEntity } from "../../../../domain/entities/url/url.entity";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { UnauthorizedError } from "../../../../shared/errors/unauthorized.error";

@injectable()
export class UpdateUrlUseCase {
  constructor(@inject('UrlRepository') private readonly urlRepository: IUrlRepository){}

  async handle(updateUrlDto: UpdateUrlDto, user: any): Promise<UrlEntity>{
    if(!user) throw new UnauthorizedError()
    const shortenedUrl = await this.urlRepository.findByShortUrl(updateUrlDto.shortUrl)
    if (!shortenedUrl) throw new NotExistsError('Url not founded')

    const urlUpdated = await this.urlRepository.updateOriginalUrl(shortenedUrl.uuid, updateUrlDto.originalUrl)

    return urlUpdated
  }
}
