import { randomUUID } from "crypto";
import { BaseEntity } from "../../../shared/base-classes/base-entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  companyId: string;
  role: string;
}

export class UserEntity extends BaseEntity {
  uuid: string
  name: string;
  email: string;
  password: string;
  companyId: string;
  role: string;

  constructor(userProps: UserProps) {
    super()
    this.name = userProps.name
    this.email = userProps.email
    this.password = userProps.password
    this.companyId = userProps.companyId
    this.role = userProps.role
    this.uuid = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.deletedAt = undefined
  }
}
