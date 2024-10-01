import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddressRepository } from '../address/address.repository';
import { Auth } from '../common/types/req-auth';
import { User } from '../users/user.entity';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';

@Injectable()
export class CompaniesRepository extends Repository<Company> {
  private logger = new Logger('CompaniesRepository', { timestamp: true });

  constructor(
    private addressRepository: AddressRepository,
    private dataSource: DataSource,
  ) {
    super(Company, dataSource.createEntityManager());
  }

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    auth: Auth,
  ): Promise<Company> {
    const {
      alias,
      name,
      description,
      telephone,
      email,
      logo,
      company_address,
    } = createCompanyDto;

    try {
      const addressCreated = await this.addressRepository.createAddress(
        company_address,
      );

      const company = this.create({
        alias,
        name,
        email,
        logo,
        telephone,
        description,
        address: addressCreated,
        user: auth.user,
      });

      await this.save(company);

      return company;
    } catch (err) {
      this.logger.log(err);

      throw new InternalServerErrorException(`Company ${name} wasn't saved`);
    }
  }

  async getCompanies(getCompaniesFilterDto: GetCompaniesFilterDto, auth: Auth) {
    const { search } = getCompaniesFilterDto;
    try {
      const query = await this.createQueryBuilder('company');

      query.where({ user: auth.user });

      if (search) {
        query.andWhere(
          'LOWER(company.description) LIKE LOWER(:search) OR LOWER(company.name) LIKE LOWER(:search)',
          { search: `%${search}%` },
        );
      }

      const companies = await query.getMany();

      return companies;
    } catch (err) {
      this.logger.log(
        `Failed to get companies for the user ${auth.user}`,
        err.stack,
      );

      throw err;
    }
  }

  async getCompanyByAlias(alias: string, user: User): Promise<Company> {
    const query = await this.createQueryBuilder('company');

    query.where({ alias, user });

    const company = await query.getOne();

    if (!company) {
      throw new NotFoundException(`Company with alias ${alias} not found`);
    }

    return company;
  }
}
