import { inject } from "tsyringe";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { GetCompanyByUuidOutputDto } from "../dtos/get-company-by-uuid.dto";

export class GetCompanyByUuidUseCase {
  constructor(
    @inject('CompanyRepository') private readonly companyRepository: ICompanyRepository
  ) { }

  async handle(uuid: string): Promise<GetCompanyByUuidOutputDto>{
    const company = await this.companyRepository.findByUuid(uuid)
    if (!company) {
      throw new NotExistsError('Company not exists!')
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
