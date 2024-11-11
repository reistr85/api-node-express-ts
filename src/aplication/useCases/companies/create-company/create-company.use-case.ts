import { inject, injectable } from "tsyringe";
import { CompanyEntity } from "../../../../domain/entities/company/company.entity";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error";
import { CreateCompanyDto, CreatedCompanyDto } from "../dtos/create-company.dto";

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('CompanyRepository') private readonly companyRepository: ICompanyRepository
  ) { }

  async handle(companyData: CreateCompanyDto): Promise<CreatedCompanyDto>{
    const companyAlreadyExists = await this.companyRepository.findByEmail(companyData.email)
    if (companyAlreadyExists) {
      throw new AlreadyExistsError('Company Already Exists')
    }

    const company = new CompanyEntity(companyData)
    await this.companyRepository.save(company)
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
