import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
