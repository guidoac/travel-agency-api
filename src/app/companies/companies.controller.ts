import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/user.entity';
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
    @GetUser() user: User,
  ): Promise<Company> {
    return this.companiesService.createCompany(createCompanyDto, user);
  }
}
