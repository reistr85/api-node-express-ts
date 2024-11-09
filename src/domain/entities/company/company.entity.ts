import { BaseEntity } from '../../../shared/base-classes/base-entity';
import { randomUUID } from 'crypto';

type CompanyProps = {
  uuid?: string
  corporateName: string;
  tradeName: string;
  cnpj: string;
  phone: string;
  email: string;
}

export class CompanyEntity extends BaseEntity{
  uuid: string
  corporateName: string;
  tradeName: string;
  cnpj: string;
  phone: string;
  email: string;

  constructor(companyProps: CompanyProps) {
    super()
    this.corporateName = companyProps.corporateName
    this.tradeName = companyProps.tradeName
    this.cnpj = companyProps.cnpj
    this.phone = companyProps.phone
    this.email = companyProps.email
    if (!this.uuid) {
      this.uuid = randomUUID()
    }
  }
}
