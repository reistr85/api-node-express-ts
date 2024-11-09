export type CreateUserDto = {
  name: string;
  email: string
  password: string;
  companyId: string
}

export type CreatedUserDto = {
  uuid: string;
  name: string;
  email: string
  companyId: string
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
