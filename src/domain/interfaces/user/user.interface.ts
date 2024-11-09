import { UserEntity } from "../../entities/user/user.entity";


export abstract class IUserRepository {
  abstract save(userEntity: UserEntity): Promise<UserEntity>
  abstract find(): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | undefined>;
  abstract findByUuid(uuid: string): Promise<UserEntity | undefined>;
  abstract updateByUuid(uuid: string): Promise<UserEntity>;
}
