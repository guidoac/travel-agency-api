import { Injectable } from '@nestjs/common';
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
    user: User,
  ): Promise<Company> {
    return await this.companiesRepository.createCompany(createCompanyDto, user);
  }

  async getCompanies(getCompaniesFilterDto: GetCompaniesFilterDto, user: User) {
    return await this.companiesRepository.getCompanies(
      getCompaniesFilterDto,
      user,
    );
  }
}
