import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]), CountriesModule],
  providers: [ToursService, ToursRepository],
  controllers: [ToursController],
})
export class ToursModule {}
