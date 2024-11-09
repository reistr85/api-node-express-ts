import { UserEntity } from "../../entities/user/user.entity";


export abstract class ICompanyRepository {
  abstract save(companyEntity: UserEntity): Promise<UserEntity>
  abstract find(): Promise<UserEntity[]>;
  abstract findByUuid(uuid: string): Promise<UserEntity | undefined>;
  abstract updateByUuid(uuid: string): Promise<UserEntity>;
}
