import { UrlEntity } from "../../../../domain/entities/url/url.entity";

export interface DeleteOutputDto{
  message: string,
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
