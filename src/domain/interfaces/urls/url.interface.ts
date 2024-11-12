import { UrlEntity } from "../../entities/url/url.entity";

export abstract class IUrlRepository {
  abstract save(urlEntity: UrlEntity): Promise<UrlEntity>
  abstract find(uuid: string | undefined): Promise<UrlEntity[]>;
  abstract findByUuid(uuid: string): Promise<UrlEntity | undefined>;
  abstract updateByUuid(uuid: string): Promise<UrlEntity>;
}
