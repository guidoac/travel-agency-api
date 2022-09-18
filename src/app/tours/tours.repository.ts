import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CountriesService } from '../countries/countries.service';
import { Country } from '../countries/country.entity';
import { User } from '../users/user.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { GetToursFilterDto } from './dto/get-tours-filter.dto';
import { Tour } from './tour.entity';

@Injectable()
export class ToursRepository extends Repository<Tour> {
  constructor(
    private dataSource: DataSource,
    private countriesService: CountriesService,
  ) {
    super(Tour, dataSource.createEntityManager());
  }

  async findTours(getToursFilterDto: GetToursFilterDto): Promise<Tour[]> {
    const result = await this.find();

    return result;
  }

  async createTour(createTourDto: CreateTourDto, user: User): Promise<Tour> {
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
      user,
    });

    try {
      await this.save(tour);

      return tour;
    } catch (err) {
      throw err;
    }
  }
}
