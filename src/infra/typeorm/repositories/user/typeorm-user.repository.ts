import { Repository } from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { UserEntity } from '../../../../domain/entities/user/user.entity';
import { NotExistsError } from '../../../../shared/errors/not-exists.error';
import { IUserRepository } from '../../../../domain/interfaces/user/user.interface';
import { injectable } from "tsyringe";

@injectable()
export class TypeORMUserRepository implements IUserRepository {
  constructor(private readonly ormRepository: Repository<User>) { }

  async find(): Promise<UserEntity[]> {
    const users = await this.ormRepository.find()
    return users
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.ormRepository.findOne({ where: { email } })

    return user
  }

  updateByUuid(uuid: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    const userEntity = await this.ormRepository.findOne({ where: { uuid } });
    if (!userEntity) throw new NotExistsError('User not exists');

    const userProps = {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      companyId: userEntity.companyId,
      role: userEntity.role,
    }
    return new UserEntity(userProps);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userEntity = this.ormRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId,
      role: user.role,
    });
    return await this.ormRepository.save(userEntity);
  }
}
