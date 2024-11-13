import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { UrlEntity } from "../../../../domain/entities/url/url.entity";

export class DeleteOutputDto{
  @IsNotEmpty()
  @IsString()
  message: string

  @IsNotEmpty()
  @IsUrl()
  url: UrlEntity
}

export interface DeletedUrlEntity{
  id: number;
  uuid: string,
  originalUrl: string,
  shortUrl: string,
  clickCount: number,
  userId: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}
