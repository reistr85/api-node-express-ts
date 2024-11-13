import { Column, DeleteDateColumn } from "typeorm";

export abstract class BaseOrmEntity {
  @Column({ type: "int", generated: "increment" })
  //@ApiProperty({ readOnly: true })
  id: number;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  //@ApiProperty({ readOnly: true })
  createdAt?: Date;

  @Column({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  //@ApiProperty({ readOnly: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  //@Exclude()
  deletedAt?: Date;
}
