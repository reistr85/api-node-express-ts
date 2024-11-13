import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../../../../domain/interfaces/urls/url.interface";

import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { UnauthorizedError } from "../../../../shared/errors/unauthorized.error";
import { DeleteOutputDto } from "../dtos/delete-url.dto";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";

@injectable()
export class DeleteUrlUseCase {
  constructor(
    @inject('UrlRepository') private readonly urlRepository: IUrlRepository,
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(shortUrl: string, user: any): Promise<DeleteOutputDto>{
    if (!user) throw new UnauthorizedError()

    const url = await this.urlRepository.findByShortUrl(shortUrl)
    const userLogged = await this.userRepository.findByEmail(user.email)

    if(!userLogged) throw new Error('Please enter your login')
    if (!url) throw new NotExistsError('Url not founded')
    if (url.userId !== userLogged.uuid) throw new UnauthorizedError()

    const deletedUrl = await this.urlRepository.delete(url.uuid)
    return {
      message: 'Url disabled',
      url: deletedUrl
    }
  }
}
