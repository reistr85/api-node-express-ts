import { Repository, UpdateResult } from 'typeorm';
import { NotExistsError } from '../../../../shared/errors/not-exists.error';
import { injectable } from "tsyringe";
import { Url } from '../../entities/url/url.entity';
import { IUrlRepository } from '../../../../domain/interfaces/urls/url.interface';
import { UrlEntity } from '../../../../domain/entities/url/url.entity';
import { DeletedUrlEntity, DeleteOutputDto } from '../../../../aplication/useCases/urls/dtos/delete-url.dto';

@injectable()
export class TypeORMUrlRepository implements IUrlRepository {
  constructor(private readonly ormRepository: Repository<Url>) { }
  async delete(uuid: string | undefined): Promise<DeletedUrlEntity> {
    const url = await this.ormRepository.findOne({
      where: {
        uuid
      }
    });

    if(!url) throw new NotExistsError('Url not founded')

    await this.ormRepository.update(url.uuid, {
      isActive: false,
      deletedAt: new Date()
    })
    const output = {
      uuid: url.uuid,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clickCount: url.clickCount,
      userId: url.userId,
      isActive: url.isActive,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      deletedAt: url.deletedAt,
    }

    return output
  }

  async updateOriginalUrl(uuid: string | undefined, originalUrl: string | undefined): Promise<UrlEntity> {
    const url = await this.ormRepository.findOne({
      where: {
        uuid
      }
    })
    if (!url) throw new NotExistsError('Url not founded')

    await this.ormRepository.update(url?.uuid, {
      originalUrl
    })

    const updatedUrl = await this.ormRepository.findOne({
      where: {
        uuid
      }
    })

    if (!updatedUrl) throw new NotExistsError('Url not founded')

    return updatedUrl
  }

  async findByShortUrl(shortUrl: string): Promise<UrlEntity | undefined> {
    const url = await this.ormRepository.findOne({
      where: {
        shortUrl
      }
    })

    if(!url) throw new NotExistsError('Url not exists!')

    return url
  }

  async updateClickCount(uuid: string, clickCount: number): Promise<void> {
    const url = await this.ormRepository.findOne({ where: { uuid } })
    if(!url) throw new NotExistsError('Url not exists')

    await this.ormRepository.update(url.uuid, {
      clickCount: url.clickCount += 1
    })
  }

  async find(uuid: string): Promise<UrlEntity[]> {
    const urls = await this.ormRepository.find({
      where: {
        userId: uuid
      }
    })

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
