import { BaseEntity } from "../../infra/base-classes/base-entity";

class CompanyEntity extends BaseEntity{
  corporateName: string;
  tradeName: string;
  cnpj: string;
  phone: string;
  email: string;
}
