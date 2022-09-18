import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CountriesService } from '../countries/countries.service';
import { Country } from '../countries/country.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';

@Injectable()
export class ToursRepository extends Repository<Tour> {
  constructor(
    private dataSource: DataSource,
    private countriesService: CountriesService,
  ) {
    super(Tour, dataSource.createEntityManager());
  }

  async createTour(createTourDto: CreateTourDto): Promise<Tour> {
    const { name, description, country } = createTourDto;

    const countryFound = await this.countriesService.findCountry(country);

    if (!countryFound) {
      throw new NotFoundException(
        `Country with code ${country} not found, please create this country and try again.`,
      );
    }

    const tour = this.create({
      name,
      description,
      country: countryFound,
    });

    console.log('tour', tour);
    try {
      await this.save(tour);

      return tour;
    } catch (err) {
      throw err;
    }
  }
}
