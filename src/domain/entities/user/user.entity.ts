import { BaseEntity } from "../../../shared/base-classes/base-entity";

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  companyId: string;
}
