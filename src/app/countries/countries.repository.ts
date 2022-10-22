import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountriesRepository extends Repository<Country> {
  constructor(private dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }

  async findCountry(code: string): Promise<Country> {
    const country = await this.findOneBy({ code });

    if (country) {
      return country;
    } else {
      return null;
    }
  }

  async findAll(): Promise<Country[]> {
    const query = this.createQueryBuilder('country');

    const countries = await query.getMany();

    return await countries;
  }
}
