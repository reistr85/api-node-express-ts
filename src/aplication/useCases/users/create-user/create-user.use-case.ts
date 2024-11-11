import { inject } from "tsyringe"
import { UserEntity } from "../../../../domain/entities/user/user.entity"
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface"
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error"
import { CreateUserDto, CreatedUserDto } from "../dtos/create-user.dto"

export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(createUserDto: CreateUserDto): Promise<CreatedUserDto>{
    const userAlreadyExists = await this.userRepository.findByEmail(createUserDto.email)
    if (userAlreadyExists) {
      throw new AlreadyExistsError('User Already Exists')
    }

    const user = new UserEntity(createUserDto)
    await this.userRepository.save(user)
    const output = {
      uuid: user.uuid,
      name: user.email,
      email: user.email,
      companyId: user.companyId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    return output
  }
}
