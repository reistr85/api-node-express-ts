import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateCompanyDto{
  @IsString()
  @IsNotEmpty()
  corporateName: string;

  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export type CreatedCompanyDto = {
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
