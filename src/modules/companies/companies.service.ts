import { Injectable } from '@nestjs/common';
import { Auth } from '../common/types/req-auth';
import { User } from '../users/user.entity';
import { CompaniesRepository } from './companies.repository';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    auth: Auth,
  ): Promise<Company> {
    return await this.companiesRepository.createCompany(createCompanyDto, auth);
  }

  async getCompaniesByFilter(
    getCompaniesFilterDto: GetCompaniesFilterDto,
    auth: Auth,
  ) {
    return await this.companiesRepository.getCompanies(
      getCompaniesFilterDto,
      auth,
    );
  }

  async getCompanyByAlias(alias: string, user: User): Promise<Company> {
    return await this.companiesRepository.getCompanyByAlias(alias, user);
  }
}
