import { CompanyEntity } from "../../entities/company/company.entity";

export abstract class ICompanyRepository {
  abstract save(companyEntity: CompanyEntity): Promise<CompanyEntity>
  abstract find(): Promise<CompanyEntity[]>;
  abstract findByEmail(email: string): Promise<CompanyEntity | null>;
  abstract findByUuid(uuid: string): Promise<CompanyEntity>;
  abstract updateByUuid(uuid: string, data: any): Promise<CompanyEntity>;
}
