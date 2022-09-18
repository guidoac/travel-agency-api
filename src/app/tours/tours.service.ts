import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { User } from '../users/user.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { GetToursFilterDto } from './dto/get-tours-filter.dto';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';

@Injectable()
export class ToursService {
  constructor(
    private countriesService: CountriesService,
    private toursRepository: ToursRepository,
  ) {}

  async findTours(getToursFilterDto: GetToursFilterDto): Promise<Tour[]> {
    return await this.toursRepository.findTours(getToursFilterDto);
  }

  async createTour(createTourDto: CreateTourDto, user: User): Promise<Tour> {
    return await this.toursRepository.createTour(createTourDto, user);
  }
}
