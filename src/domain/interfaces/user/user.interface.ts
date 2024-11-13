import { UserEntity } from "../../entities/user/user.entity";

export abstract class IUserRepository {
  abstract save(userEntity: UserEntity): Promise<UserEntity>
  abstract find(companyId: string): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByUuid(uuid: string): Promise<UserEntity>;
  abstract updateByUuid(uuid: string, data: any): Promise<UserEntity>;
  abstract delete(uuid: string | undefined): Promise<void>;
}
