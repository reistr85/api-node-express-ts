import { EntityManager } from 'typeorm';

export interface BaseRepository {
  transactionInsert(data: object, entityManager: EntityManager): Promise<any>;
  transactionUpdate(
    id: string,
    data: object,
    entityManager: EntityManager,
  ): Promise<void>;
}
