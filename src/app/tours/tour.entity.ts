import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/utils/database/base-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Country } from '../countries/country.entity';
import { Image } from '../images/image.entity';
import { User } from '../users/user.entity';

@Entity('tours')
export class Tour extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((type) => Country, (country) => country.code, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  country: Country;

  @ManyToOne((type) => User, (user) => user.id, {
    eager: false,
  })
  @JoinColumn()
  @Exclude()
  user: User;
}
