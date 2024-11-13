import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { GetUserByUuidOutputDto } from "../dtos/get-user-by-uuid.dto";
import { UnauthorizedError } from "../../../../shared/errors/unauthorized.error";

@injectable()
export class GetUserByUuidUseCase{
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(uuid: string, user: any): Promise<GetUserByUuidOutputDto>{
    if (!uuid) throw new Error('Please enter User Uuid!')
    const userLogged = await this.userRepository.findByEmail(user.email)
    if (!userLogged) throw new UnauthorizedError()

    const foundUser = await this.userRepository.findByUuid(uuid)
    if (!user) {
      throw new NotExistsError('User not already exists')
    }

    if(userLogged.companyId !== foundUser.companyId) throw new UnauthorizedError()

    const output = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      companyId: user.companyId,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }

    return output
  }
}
