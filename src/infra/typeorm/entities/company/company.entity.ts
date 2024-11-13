import { Entity, Column, JoinColumn, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { BaseOrmEntity } from "../../../../shared/base-classes/typeorm/base.orm-entity";
import { User } from "../user/user.entity";

@Entity('Companies')
export class Company extends BaseOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 100 })
  corporateName: string;

  @Column({ type: "varchar", length: 100 })
  tradeName: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 18 }) // ajuste aqui para um tamanho maior
  cnpj: string;

  @Column({ type: "varchar", length: 15 }) // ajuste o tamanho para o necessário
  phone: string;

  @Column({ type: "boolean", default: true })
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
