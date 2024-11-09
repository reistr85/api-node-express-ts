export type GetCompanyByUuidOutputDto = {
  uuid: string;
  corporateName: string;
  tradeName: string;
  cnpj: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
