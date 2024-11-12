import { IsNotEmpty, IsString } from "class-validator";

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  originalUrl: string;
}

export type CreatedUrlDto = {
  id: number;
  uuid: string
  originalUrl: string
  shortUrl: string;
  userId: string | null
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
