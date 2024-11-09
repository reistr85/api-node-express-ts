import { CompanyEntity } from "../../entities/company/company.entity";

export abstract class ICompanyRepository {
  abstract save(companyEntity: CompanyEntity): Promise<CompanyEntity>
  abstract find(): Promise<CompanyEntity[]>;
  abstract findByUuid(uuid: string): Promise<CompanyEntity | undefined>;
  abstract updateByUuid(uuid: string): Promise<CompanyEntity>;
}
