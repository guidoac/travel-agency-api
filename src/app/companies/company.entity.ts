import { BaseEntity } from 'src/utils/database/base-entity.entity';
import { Entity, Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Address } from '../address/address.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  description: string;

  @OneToOne((_type) => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;
}
