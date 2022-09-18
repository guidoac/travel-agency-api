import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from './tour.entity';

@Entity('tour_images')
export class TourImage {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @ManyToOne((type) => Tour, (tour) => tour.images, { eager: true })
  @JoinColumn()
  tour: Tour;
}
