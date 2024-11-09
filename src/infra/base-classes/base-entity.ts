export abstract class BaseEntity {
  id?: number;
  isActive?: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
