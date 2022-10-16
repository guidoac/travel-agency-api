import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/app/common/database/base-entity.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
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
}
