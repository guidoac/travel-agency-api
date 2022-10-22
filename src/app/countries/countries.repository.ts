import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ImagesRepository } from '../images/images.repository';
import { ImagesService } from '../images/images.service';
import { Country } from './country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesRepository extends Repository<Country> {
  private logger = new Logger('CountriesRepository', { timestamp: true });

  constructor(
    private dataSource: DataSource,
    private imagesRepository: ImagesRepository,
  ) {
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

  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, description, code, banner } = createCountryDto;

    const image = await this.imagesRepository.createImage(banner);

    try {
      const country = this.create({
        name,
        description,
        code,
        banner: image,
      });

      await this.save(country);

      return country;
    } catch (err) {
      this.logger.error(
        `Error while creating image for the country: ${name} error: ${err.message}`,
      );

      throw new InternalServerErrorException();
    }
  }
}
