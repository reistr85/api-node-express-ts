import { Repository } from 'typeorm';
import { NotExistsError } from '../../../../shared/errors/not-exists.error';
import { injectable } from "tsyringe";
import { Url } from '../../entities/url/url.entity';
import { IUrlRepository } from '../../../../domain/interfaces/urls/url.interface';
import { UrlEntity } from '../../../../domain/entities/url/url.entity';

@injectable()
export class TypeORMUrlRepository implements IUrlRepository {
  constructor(private readonly ormRepository: Repository<Url>) { }

  async find(uuid: string): Promise<UrlEntity[]> {
    const urls = await this.ormRepository.find({
      where: {
        userId: uuid
      }
    })

    console.log(uuid)
    console.log(urls)
    return urls
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
