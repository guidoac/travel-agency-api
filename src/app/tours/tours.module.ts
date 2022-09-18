import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';
import { CountriesModule } from '../countries/countries.module';
import { TourImage } from './tour-image.entity';
import { TourImageRepository } from './tour-image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tour, TourImage]), CountriesModule],
  providers: [ToursService, ToursRepository, TourImageRepository],
  controllers: [ToursController],
})
export class ToursModule {}
