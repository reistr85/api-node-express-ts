import { Repository } from "typeorm";
import { CompanyEntity } from "../../../../domain/entities/company/company.entity";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { Company } from "../../entities/company/company.entity";

export class TypeORMCompanyRepository implements ICompanyRepository {
  constructor(private readonly ormRepository: Repository<Company>) { }

  find(): Promise<CompanyEntity[]> {
    throw new Error('');
  }

  findByEmail(email: string): Promise<CompanyEntity | undefined> {
    throw new Error('Method not implemented.');
  }

  updateByUuid(uuid: string): Promise<CompanyEntity> {
    throw new Error('Method not implemented.');
  }

  async findByUuid(uuid: string): Promise<CompanyEntity | undefined> {
    const companyEntity = await this.ormRepository.findOne({ where: { uuid } });
    if (!companyEntity) throw new NotExistsError('User not exists');

    const companyProps = {
      corporateName: companyEntity.corporateName,
      tradeName: companyEntity.tradeName,
      cnpj: companyEntity.cnpj,
      phone: companyEntity.phone,
      email: companyEntity.email
    }
    return new CompanyEntity(companyProps);
  }

  async save(company: CompanyEntity): Promise<CompanyEntity> {
    const companyEntity = this.ormRepository.create({
      corporateName: company.corporateName,
      tradeName: company.tradeName,
      cnpj: company.cnpj,
      phone: company.phone,
      email: company.email,
    });
    return await this.ormRepository.save(companyEntity);
  }
}
