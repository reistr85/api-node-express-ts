import { inject, injectable } from "tsyringe"
import { UserEntity } from "../../../../domain/entities/user/user.entity"
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface"
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error"
import { CreateUserDto, CreatedUserDto } from "../dtos/create-user.dto"

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(user: any, createUserDto: CreateUserDto): Promise<CreatedUserDto>{
    const userAlreadyExists = await this.userRepository.findByEmail(createUserDto.email)
    if (userAlreadyExists) {
      throw new AlreadyExistsError('User Already Exists')
    }

    const userEntity = new UserEntity({
      ...createUserDto,
      companyId: user.companyId,
      role: 'user'
    })


    await this.userRepository.save(userEntity)
    const output = {
      uuid: userEntity.uuid,
      name: userEntity.email,
      email: userEntity.email,
      companyId: userEntity.companyId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    return output
  }
}
