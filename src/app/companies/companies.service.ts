import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { CompaniesRepository } from './companies.repository';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    companyAddress: CreateAddressDto,
  ): Promise<Company> {
    return await this.companiesRepository.createCompany(
      createCompanyDto,
      companyAddress,
    );
  }
}
