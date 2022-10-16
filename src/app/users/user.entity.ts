import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/app/common/database/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Tour } from '../tours/tour.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany((type) => Tour, (tour) => tour.user, {
    eager: true,
  })
  tours: Tour[];
}
