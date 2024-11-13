import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';
import { BaseOrmEntity } from '../../../../shared/base-classes/typeorm/base.orm-entity';
import { Url } from '../url/url.entity';

@Entity('Users')
export class User extends BaseOrmEntity{
  @PrimaryGeneratedColumn("uuid")
  //@ApiProperty({ readOnly: true })
  uuid: string;

  @Column()
  //@ApiProperty({ readOnly: true })
  id: number;

  //@ApiProperty()
  @Column({ length: 150 })
  name: string;

  //@ApiProperty()
  @Column({ length: 150 })
  email: string;

  //@ApiProperty()
  @Column({ nullable: false })
  password: string;

  //@ApiProperty()
  @Column({ length: 20, nullable: false })
  role: string;

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

  @Column()
  companyId: string;

  //@ApiProperty({ type: () => Company })
  @ManyToOne(() => Company, (company) => company.user)
  company: Company;

  @JoinColumn()
  @OneToMany(() => Url, (url) => url.user)
  url: Url[];
}
