import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne } from "typeorm";
import { BaseOrmEntity } from "../../../../shared/base-classes/typeorm/base.orm-entity";
import { Company } from "../company/company.entity";
import { User } from "../user/user.entity";

@Entity('Urls')
export class Url extends BaseOrmEntity {
  @PrimaryGeneratedColumn()
  //@ApiProperty({ readOnly: true })
  uuid: string;

  @Column()
  //@ApiProperty({ readOnly: true })
  id: number;

  //@ApiProperty()
  @Column({ length: 150 })
  originalUrl: string;

  //@ApiProperty()
  @Column({ length: 150 })
  shortUrl: string;

  //@ApiProperty()
  @Column({ nullable: true })
  userId: number;

  //@ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  //@ApiProperty({ readOnly: true })
  createdAt: Date;

  @Column({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  //@ApiProperty({ readOnly: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  //@Exclude()
  deletedAt: Date;

  //@ApiProperty({ type: () => Company })
  @ManyToOne(() => User, (user) => user.url)
  user: User;
}
