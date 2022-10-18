import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/app/common/database/base-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany((_type) => Company, (company) => company.user, {
    eager: true,
  })
  companies: Company[];
}
