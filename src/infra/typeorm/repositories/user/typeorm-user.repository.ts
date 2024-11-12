import { Repository } from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { UserEntity } from '../../../../domain/entities/user/user.entity';
import { NotExistsError } from '../../../../shared/errors/not-exists.error';
import { IUserRepository } from '../../../../domain/interfaces/user/user.interface';
import { injectable } from "tsyringe";
import { UrlEntity } from '../../../../domain/entities/url/url.entity';
import { UnauthorizedError } from '../../../../shared/errors/unauthorized.error';
import { Url } from '../../entities/url/url.entity';

@injectable()
export class TypeORMUserRepository implements IUserRepository {
  constructor(
    private readonly userOrmRepository: Repository<User>,
  ) { }

  async delete(uuid: string): Promise<void> {
    const user = await this.userOrmRepository.findOne({
      where: {
        uuid
      }
    })

    if (!user) throw new NotExistsError('User not exists')
    await this.userOrmRepository.delete(user.id)
  }

  async find(): Promise<UserEntity[]> {
    const users = await this.userOrmRepository.find()
    return users
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userOrmRepository.findOne({ where: { email } })

    return user
  }

  updateByUuid(uuid: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    const userEntity = await this.userOrmRepository.findOne({ where: { uuid } });
    if (!userEntity) throw new NotExistsError('User not exists');

    return new UserEntity(userEntity);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userEntity = this.userOrmRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId,
      role: user.role,
    });
    return await this.userOrmRepository.save(userEntity);
  }
}
