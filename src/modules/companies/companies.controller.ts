import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuth } from '../common/decorators/get-auth.decorator';
import { Auth } from '../common/types/req-auth';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetAuth() auth: Auth,
  ): Promise<Company> {
    return this.companiesService.createCompany(createCompanyDto, auth);
  }

  @Get()
  getCompaniesByFilter(
    @Query() getCompaniesFilterDto: GetCompaniesFilterDto,
    @GetAuth() auth: Auth,
  ) {
    return this.companiesService.getCompaniesByFilter(
      getCompaniesFilterDto,
      auth,
    );
  }
}
