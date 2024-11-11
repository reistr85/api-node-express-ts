export type CreateUrlDto = {
  originalUrl: string
  userId: string
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
