import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../address/address.entity';
import { Tour } from '../tours/tour.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  code: string;

  @OneToMany((_type) => Tour, (tour) => tour.country, {
    eager: false,
  })
  tours: Tour[];
}
