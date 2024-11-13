import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { UserEntity } from "../../../../domain/entities/user/user.entity";
import { GetAllUsersDto } from "../dtos/get-all-users-dto";

@injectable()
export class GetAllUsersUseCase{
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(user: any): Promise<GetAllUsersDto>{
    const users = await this.userRepository.find(user.companyId)
    return this.presentOutput(users)
  }

  private presentOutput(users: UserEntity[]): GetAllUsersDto{
    return {
      users: users.map((users) => {
        return {
          uuid: users.uuid,
          name: users.name,
          email: users.email,
          role: users.role,
          companyId: users.companyId,
          isActive: users.isActive,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          deletedAt: users.deletedAt,
        }
      })
    }
  }
}
