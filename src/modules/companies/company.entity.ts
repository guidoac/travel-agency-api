import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/common/database/base-entity.entity';
import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { Tour } from '../tours/tour.entity';
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

  @OneToMany((_type) => Tour, (tour) => tour.company, {
    eager: true,
  })
  tours: Tour[];
}
