import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;
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
