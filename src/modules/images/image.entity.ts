import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/common/database/base-entity.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Country } from '../countries/country.entity';
import { Tour } from '../tours/tour.entity';

@Entity('images')
export class Image extends BaseEntity {
  @Column()
  path: string;

  @ManyToMany(() => Tour, (tour) => tour.images, {
    eager: false,
  })
  @Exclude()
  tours: Tour[];

  @ManyToOne((_type) => Country, (country) => country.banner, {
    eager: false,
  })
  @Exclude()
  country: Country;
}
