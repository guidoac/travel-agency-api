/* eslint-disable @typescript-eslint/no-unused-vars */
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/app/common/database/base-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { Country } from '../countries/country.entity';
import { Image } from '../images/image.entity';
import { User } from '../users/user.entity';

@Entity('tours')
export class Tour extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((_type) => Country, (country) => country.code, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  country: Country;

  @ManyToOne((_type) => User, (user) => user.id, {})
  @JoinColumn()
  @Exclude()
  company: Company;

  @ManyToMany(() => Image, (img) => img.tours, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'tour_images',
    joinColumn: {
      name: 'tour',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image',
      referencedColumnName: 'id',
    },
  })
  images: Image[];
}
