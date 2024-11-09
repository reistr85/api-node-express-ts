import { CompanyEntity } from "../../../../domain/entities/company/company.entity";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { AlreadyExistsError } from "../../../../shared/errors/already-exists.error";
import { CreateCompanyDto, CreatedCompanyDto } from "../dtos/create-company.dto";


export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) { }

  async handle(companyData: CreateCompanyDto): Promise<CreatedCompanyDto>{
    const company = new CompanyEntity(companyData)
    console.log(company)
    const companyAlreadyExists = await this.companyRepository.findByUuid(company.uuid)

    if (companyAlreadyExists) {
      throw new AlreadyExistsError('Company Already Exists')
    }

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
