export abstract class BaseEntity {
  id?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
