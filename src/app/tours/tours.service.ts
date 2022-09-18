import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageFileType } from 'src/utils/types/files';
import { CountriesService } from '../countries/countries.service';
import { User } from '../users/user.entity';
import { CreateTourImageDto } from './dto/create-tour-image.dto';
import { CreateTourDto } from './dto/create-tour.dto';
import { GetToursFilterDto } from './dto/get-tours-filter.dto';
import { TourImage } from './tour-image.entity';
import { TourImageRepository } from './tour-image.repository';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';

@Injectable()
export class ToursService {
  constructor(
    private countriesService: CountriesService,
    private toursRepository: ToursRepository,
    @InjectRepository(TourImage)
    private tourImagesRepository: TourImageRepository,
  ) {}

  async findTours(getToursFilterDto: GetToursFilterDto): Promise<Tour[]> {
    return await this.toursRepository.findTours(getToursFilterDto);
  }

  async findTourById(id: string): Promise<Tour> {
    return await this.toursRepository.findTourById(id);
  }

  async createTour(createTourDto: CreateTourDto, user: User): Promise<Tour> {
    return await this.toursRepository.createTour(createTourDto, user);
  }

  async createTourImage(
    createTourImage: CreateTourImageDto,
    id: string,
    file: ImageFileType,
  ) {
    return await this.tourImagesRepository.createTourImage(
      createTourImage,
      id,
      file,
    );
  }
}
