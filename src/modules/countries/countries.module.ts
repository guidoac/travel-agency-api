import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { ImagesModule } from '../images/images.module';
import { ImagesService } from '../images/images.service';
import { ImagesRepository } from '../images/images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), ImagesModule],
  providers: [CountriesService, CountriesRepository, ImagesRepository],
  exports: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}
