import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { GetUserByUuidOutputDto } from "../dtos/get-user-by-uuid.dto";

@injectable()
export class GetUserByUuidUseCase{
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(uuid: string): Promise<GetUserByUuidOutputDto>{
    const user = await this.userRepository.findByUuid(uuid)
    if (!user) {
      throw new NotExistsError('User not already exists')
    }

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
