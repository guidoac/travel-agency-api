import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';

@Injectable()
export class ToursService {
  constructor(
    private countriesService: CountriesService,
    private toursRepository: ToursRepository,
  ) {}

  async createTour(createTourDto: CreateTourDto): Promise<Tour> {
    return await this.toursRepository.createTour(createTourDto);
  }
}
