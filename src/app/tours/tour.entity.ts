import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from '../countries/country.entity';
import { User } from '../users/user.entity';
import { TourImage } from './tour-image.entity';

@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany((type) => TourImage, (image) => image.tour)
  @JoinColumn()
  images: TourImage[];

  @CreateDateColumn()
  created_at: string;

  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
