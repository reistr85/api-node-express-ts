import { BaseEntity } from "../../../shared/base-classes/base-entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  companyId: string;
}

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;
  companyId: string;

  constructor(private readonly userProps: UserProps) {
    super()
  }
}
