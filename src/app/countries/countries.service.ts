import { Injectable } from '@nestjs/common';
import { CountriesRepository } from './countries.repository';
import { Country } from './country.entity';

@Injectable()
export class CountriesService {
  constructor(private countriesRepository: CountriesRepository) {}

  async findAll(): Promise<Country[]> {
    return await this.countriesRepository.findAll();
  }

  async findCountry(countryCode: string): Promise<Country> {
    return await this.countriesRepository.findCountry(countryCode);
  }
}
