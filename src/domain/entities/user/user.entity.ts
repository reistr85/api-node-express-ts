import { randomUUID } from "crypto";
import { BaseEntity } from "../../../shared/base-classes/base-entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  companyId: string;
}

export class UserEntity extends BaseEntity {
  uuid: string
  name: string;
  email: string;
  password: string;
  companyId: string;

  constructor(private readonly userProps: UserProps) {
    super()
    this.uuid = randomUUID()
  }
}
