import { randomUUID } from "crypto";
import { BaseEntity } from "../../../shared/base-classes/base-entity";

type UrlProps = {
  originalUrl: string
  userId?: number
  companyId?: number
}

export class UrlEntity extends BaseEntity {
  uuid: string
  originalUrl: string
  shortUrl: string;
  userId?: number | undefined
  companyId?: number | undefined

  constructor(urlProps: UrlProps) {
    super()
    this.originalUrl = urlProps.originalUrl
    this.shortUrl = Math.random().toString(36).slice(-6)
    this.userId = urlProps.userId
    this.companyId = urlProps.companyId
    this.uuid = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.deletedAt = undefined
    this.isActive = true
  }
}
