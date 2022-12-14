import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';
import { CountriesModule } from '../countries/countries.module';
import { ImagesModule } from '../images/images.module';
import { ImagesService } from '../images/images.service';
import { ImagesRepository } from '../images/images.repository';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour]),
    ImagesModule,
    CountriesModule,
    CompaniesModule,
  ],
  providers: [ToursService, ToursRepository],
  controllers: [ToursController],
})
export class ToursModule {}
