export interface GetAllUsersDto {
  users: {
    uuid: string,
    name: string,
    email: string,
    companyId: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | undefined,
  }[]
}
