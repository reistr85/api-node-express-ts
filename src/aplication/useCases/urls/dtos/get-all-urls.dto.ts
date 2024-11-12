export interface GetAllUrlsDto {
  urls: {
    uuid: string,
    originalUrl: string,
    shortUrl: string,
    userId: string | undefined,
    companyId: string | undefined,
    clickCount: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | undefined,
  }[]
}
