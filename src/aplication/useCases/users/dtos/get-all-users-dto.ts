export interface GetAllUsersDto {
  users: {
    uuid: string,
    name: string,
    email: string,
    companyId: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  }[]
}
