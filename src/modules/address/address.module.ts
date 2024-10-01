import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from '../countries/countries.module';
import { CountriesRepository } from '../countries/countries.repository';
import { CountriesService } from '../countries/countries.service';
import { Address } from './address.entity';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), CountriesModule],
  providers: [AddressService, AddressRepository, CountriesRepository],
  exports: [AddressService],
})
export class AddressModule {}
