import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesRepository } from './companies.repository';
import { AddressModule } from '../address/address.module';
import { AddressService } from '../address/address.service';
import { AddressRepository } from '../address/address.repository';
import { CountriesService } from '../countries/countries.service';
import { CountriesRepository } from '../countries/countries.repository';
import { Company } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AddressModule],
  providers: [
    CompaniesService,
    CompaniesRepository,
    AddressRepository,
    CountriesRepository,
  ],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
