import { Entity, Column, JoinColumn, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { BaseOrmEntity } from "../../../../shared/base-classes/typeorm/base.orm-entity";
import { User } from "../user/user.entity";

@Entity('Companies')
export class Company extends BaseOrmEntity {
  @PrimaryGeneratedColumn()
  //@ApiProperty({ readOnly: true })
  uuid: string;

  @Column()
  //@ApiProperty({ readOnly: true })
  id: number;

  //@ApiProperty()
  @Column({ length: 150 })
  corporateName: string;

  //@ApiProperty()
  @Column({ length: 50 })
  tradeName: string;

  @Column({ length: 50 })
  email: string;

  //@ApiProperty()
  @Column({ length: 14 })
  cnpj: string;

  //@ApiProperty()
  @Column({ length: 20, nullable: true })
  phone: string;

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

  //@ApiProperty({ type: () => User })
  @JoinColumn()
  @OneToMany(() => User, (user) => user.company)
  user: User[];
}
