import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CountriesService } from '../countries/countries.service';
import { Country } from '../countries/country.entity';
import { Image } from '../images/image.entity';
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

  async findTours(
    getToursFilterDto: GetToursFilterDto,
    user: User,
  ): Promise<Tour[]> {
    const { search } = getToursFilterDto;
    const query = this.createQueryBuilder('tour');

    query.where({ user });

    if (search) {
      query.andWhere(
        'LOWER(tour.name) LIKE %:search% OR LOWER(tour.description) LIKE %:search%',
      );
    }

    const result = await query.getMany();

    if (!result) {
      throw new NotFoundException(
        `Não foi encontrado nenhum tour para o usuário ${user.username} com o filtro: ${search}`,
      );
    }
    return result;
  }

  async findTourById(id: string, user: User): Promise<Tour> {
    const query = this.createQueryBuilder('tours');

    query.andWhere({ user, id });

    const found = await query.getOne();

    if (!found) {
      throw new NotFoundException(
        `Tour com id: ${id} do usuário: ${user.username} não encontrado`,
      );
    }

    return found;
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

  async createTourImage(tourId: string, img: Image, user: User) {
    const tourFound = await this.findTourById(tourId, user);

    tourFound.images = [img];

    try {
      await this.save(tourFound);

      return tourFound;
    } catch (err) {
      throw err;
    }
  }
}
