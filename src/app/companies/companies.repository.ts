import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddressRepository } from '../address/address.repository';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesRepository extends Repository<Company> {
  private logger = new Logger('CompaniesRepository');

  constructor(
    private addressRepository: AddressRepository,
    private dataSource: DataSource,
  ) {
    super(Company, dataSource.createEntityManager());
  }

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    createAddressDto: CreateAddressDto,
  ): Promise<Company> {
    const { name, description, telephone, email, logo } = createCompanyDto;

    try {
      const addressCreated = await this.addressRepository.createAddress(
        createAddressDto,
      );

      const company = this.create({
        name,
        email,
        logo,
        telephone,
        description,
        address: addressCreated,
      });

      await this.save(company);

      return company;
    } catch (err) {
      this.logger.log(err);

      throw new InternalServerErrorException(`Company ${name} wasn't saved`);
    }
  }
}
