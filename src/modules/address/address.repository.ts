import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CountriesRepository } from '../countries/countries.repository';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressRepository extends Repository<Address> {
  private logger = new Logger('AddressRepository');

  constructor(
    private dataSource: DataSource,
    private countriesRepository: CountriesRepository,
  ) {
    super(Address, dataSource.createEntityManager());
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { country, address, complement, district, zipcode, number, state } =
      createAddressDto;

    const countryFound = await this.countriesRepository.findCountry(country);

    const addressSaved = this.create({
      address,
      complement,
      district,
      zipcode,
      number,
      state,
      country: countryFound,
    });

    try {
      await this.save(addressSaved);
      this.logger.log(`Address saved ${JSON.stringify(addressSaved)}`);

      return addressSaved;
    } catch (err) {
      this.logger.log(err);

      throw new InternalServerErrorException(
        `Error when saving address ${address}`,
      );
    }
  }
}
