import { UrlEntity } from "../../entities/url/url.entity";
import { UserEntity } from "../../entities/user/user.entity";

export abstract class IUserRepository {
  abstract save(userEntity: UserEntity): Promise<UserEntity>
  abstract find(): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByUuid(uuid: string): Promise<UserEntity | null>;
  abstract updateByUuid(uuid: string): Promise<UserEntity>;
  abstract delete(uuid: string | undefined): Promise<void>;
}
