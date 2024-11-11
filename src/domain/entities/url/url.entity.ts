import { randomUUID } from "crypto";
import { BaseEntity } from "../../../shared/base-classes/base-entity";

type UrlProps = {
  originalUrl: string
  userId: string | null;
}

export class UrlEntity extends BaseEntity {
  uuid: string
  originalUrl: string
  shortUrl: string;
  userId: string | null

  constructor(urlProps: UrlProps) {
    super()
    this.originalUrl = urlProps.originalUrl
    this.shortUrl = Math.random().toString(36).slice(-6)
    this.userId = urlProps.userId
    this.uuid = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.deletedAt = null
    this.isActive = true
  }
}
