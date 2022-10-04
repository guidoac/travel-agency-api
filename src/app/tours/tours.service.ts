import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageFileType } from 'src/utils/types/files';
import { CountriesService } from '../countries/countries.service';
import { ImagesService } from '../images/images.service';
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
    private imagesService: ImagesService,
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

  async createTourImage(id: string, file: ImageFileType) {
    const tourFound = await this.toursRepository.findTourById(id);
    const image = await this.imagesService.createImage(file.filename);

    if (tourFound) {
      this.toursRepository.createTourImage(id, image);
    }
  }
}
