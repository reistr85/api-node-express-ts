import { inject, injectable } from "tsyringe"
import bcrypt from 'bcrypt';
import { UserEntity } from "../../../../domain/entities/user/user.entity"
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface"
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error"
import { CreateUserDto, CreatedUserDto } from "../dtos/create-user.dto"
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('CompanyRepository') private readonly companyRepository: ICompanyRepository
  ) { }

  async handle(user: any, createUserDto: CreateUserDto): Promise<CreatedUserDto>{
    const userAlreadyExists = await this.userRepository.findByEmail(createUserDto.email)
    if (userAlreadyExists) {
      throw new AlreadyExistsError('User Already Exists')
    }

    const companyExists = await this.companyRepository.findByUuid(user.companyId)
    if(!companyExists) throw new NotExistsError('User does not belong to a company')

    const userEntity = new UserEntity({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      companyId: user.companyId,
      role: 'user'
    })

    console.log(userEntity)

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
