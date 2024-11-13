import { Repository } from "typeorm";
import { CompanyEntity } from "../../../../domain/entities/company/company.entity";
import { ICompanyRepository } from "../../../../domain/interfaces/company/company.interface";
import { NotExistsError } from "../../../../shared/errors/not-exists.error";
import { Company } from "../../entities/company/company.entity";
import { injectable } from "tsyringe";

@injectable()
export class TypeORMCompanyRepository implements ICompanyRepository {
  constructor(private readonly ormRepository: Repository<Company>) {}

  async find(): Promise<CompanyEntity[]> {
    const companies = await this.ormRepository.find()
    return companies
  }

  async findByEmail(email: string): Promise<CompanyEntity | null> {
    const company = await this.ormRepository.findOne({
      where: {
        email
      }
    })
    return company
  }

  async updateByUuid(uuid: string, data: any): Promise<CompanyEntity> {
    const company = await this.ormRepository.findOne({
      where: {
        uuid
      }
    })
    if(!company) throw new NotExistsError('Company not exists')

    await this.ormRepository.update(company.uuid, {})

    return company
  }

  async findByUuid(uuid: string): Promise<CompanyEntity> {
    const companyEntity = await this.ormRepository.findOne({ where: { uuid } });
    if (!companyEntity) throw new NotExistsError('User not exists');

    return companyEntity;
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
