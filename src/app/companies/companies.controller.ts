import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Body('company_address') companyAddress: CreateAddressDto,
  ): Promise<Company> {
    return this.companiesService.createCompany(
      createCompanyDto,
      companyAddress,
    );
  }
}
