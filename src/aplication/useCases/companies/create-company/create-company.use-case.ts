import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { CompanyEntity } from "../../../../domain/entities/company/company.entity";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error";
import { CreateCompanyDto, CreatedCompanyDto } from "../dtos/create-company.dto";
import { IUserRepository } from "../../../../domain/interfaces/user/user.interface";
import { UserEntity } from "../../../../domain/entities/user/user.entity";

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('CompanyRepository') private readonly companyRepository: ICompanyRepository,
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) { }

  async handle(createCompanyDto: CreateCompanyDto): Promise<CreatedCompanyDto|Error>{
    const companyAlreadyExists = await this.companyRepository.findByEmail(createCompanyDto.email)
    if (companyAlreadyExists) {
      throw new AlreadyExistsError('Company Already Exists')
    }

    const company = new CompanyEntity(createCompanyDto)
    const companyCreated = await this.companyRepository.save(company)

    if (!companyCreated) {
      throw new Error('Error to create company')
    }

    const userEntity = new UserEntity({
      name: createCompanyDto.username,
      email: createCompanyDto.email,
      password:  await bcrypt.hash(createCompanyDto.password, 10),
      companyId: companyCreated.uuid,
      role: 'admin'
    })

    const userAdmin = await this.userRepository.save(userEntity)

    if (!userAdmin) {
      throw new Error('Error to create user admin')
    }

    const output = {
      uuid: company.uuid,
      corporateName: company.corporateName,
      tradeName: company.tradeName,
      cnpj: company.cnpj,
      phone: company.phone,
      email: company.email,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    return output
  }
}
