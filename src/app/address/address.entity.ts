import { BaseEntity } from 'src/utils/database/base-entity.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { Country } from '../countries/country.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @ManyToOne((_type) => Country, (country) => country.code)
  country: Country;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  zipcode: string;
}
