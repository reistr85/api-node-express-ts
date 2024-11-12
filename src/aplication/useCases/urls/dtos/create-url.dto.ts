import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}

export type CreatedUrlDto = {
  id: number;
  uuid: string
  originalUrl: string
  shortUrl: string;
  newUrl: string;
  userId: string | undefined
  companyId: string | undefined
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
