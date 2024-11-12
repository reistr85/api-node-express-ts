import { UrlEntity } from "../../entities/url/url.entity";

export abstract class IUrlRepository {
  abstract save(urlEntity: UrlEntity): Promise<UrlEntity>
  abstract find(uuid: string | undefined): Promise<UrlEntity[]>;
  abstract findByShortUrl(shortUrl: string): Promise<UrlEntity | undefined>;
  abstract updateClickCount(uuid: string | null, clickCount: number | null): Promise<void>;
}
