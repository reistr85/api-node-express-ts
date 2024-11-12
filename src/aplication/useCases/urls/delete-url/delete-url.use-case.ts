import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface";

import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { UnauthorizedError } from "../../../../shared/errors/unauthorized.error";
import { DeleteOutputDto } from "../dtos/delete-url.dto";

@injectable()
export class DeleteUrlUseCase {
  constructor(@inject('UrlRepository') private readonly urlRepository: IUrlRepository){}

  async handle(shortUrl: string, user: any): Promise<DeleteOutputDto>{
    if(!user) throw new UnauthorizedError()
    const url = await this.urlRepository.findByShortUrl(shortUrl)
    if (!url) throw new NotExistsError('Url not founded')

    const deletedUrl = await this.urlRepository.delete(url.uuid)
    return {
      message: 'Url disabled',
      url: deletedUrl
    }
  }
}
