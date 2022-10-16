import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/app/common/database/base-entity.entity';
import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { User } from '../users/user.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  alias: string;

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

  @ManyToOne((_type) => User, {
    eager: false,
  })
  @JoinColumn()
  @Exclude()
  user: User;
}
