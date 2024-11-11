import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { GetAllCompaniesOutputDto } from "../dtos/get-all-companies.dto";
import { CompanyEntity } from "../../../../domain/entities/company/company.entity";

@injectable()
export class GetAllCompaniesUseCase {
  constructor(
    @inject('CompanyRepository') private readonly companyRepository: ICompanyRepository
  ) { }

  async handle(): Promise<GetAllCompaniesOutputDto>{
    const companies = await this.companyRepository.find()

    const output = this.presentOutput(companies)
    return output
  }

  private presentOutput(companies: CompanyEntity[]): GetAllCompaniesOutputDto {
    return {
      companies: companies.map((companies) => {
        return {
          uuid: companies.uuid,
          corporateName: companies.corporateName,
          tradeName: companies.tradeName,
          cnpj: companies.cnpj,
          phone: companies.phone,
          email: companies.email,
          isActive: companies.isActive,
          createdAt: companies.createdAt,
          updatedAt: companies.updatedAt,
          deletedAt: companies.deletedAt,
        }
      })
    }
  }
}
