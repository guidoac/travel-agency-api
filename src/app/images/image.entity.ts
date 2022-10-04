import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/utils/database/base-entity.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tour } from '../tours/tour.entity';

@Entity('images')
export class Image extends BaseEntity {
  @Column()
  file_name: string;

  @ManyToMany(() => Tour, (tour) => tour.images, {
    eager: false,
  })
  @Exclude()
  tours: Tour[];
}
