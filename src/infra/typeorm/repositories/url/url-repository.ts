import { Repository } from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { UserEntity } from '../../../../domain/entities/user/user.entity';
import { NotExistsError } from '../../../../shared/errors/not-exists.error';
import { IUserRepository } from '../../../../domain/interfaces/user/user.interface';
import { injectable } from "tsyringe";
import { Url } from '../../entities/url/url.entity';
import { IUrlRepository } from '../../../../domain/interfaces/urls/url.interface';
import { UrlEntity } from '../../../../domain/entities/url/url.entity';

@injectable()
export class TypeORMUrlRepository implements IUrlRepository {
  constructor(private readonly ormRepository: Repository<Url>) { }

  find(): Promise<UrlEntity[]> {
    throw new Error('');
  }

  updateByUuid(uuid: string): Promise<UrlEntity> {
    throw new Error('Method not implemented.');
  }

  async findByUuid(uuid: string): Promise<UrlEntity | undefined> {
    const urlEntity = await this.ormRepository.findOne({ where: { uuid } });
    if (!urlEntity) throw new NotExistsError('Url not exists');

    return urlEntity;
  }

  async save(url: UrlEntity): Promise<UrlEntity> {
    const urlCreated = this.ormRepository.create(url)

    await this.ormRepository.save(urlCreated)
    return urlCreated
  }
}
