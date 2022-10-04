import { Injectable, Logger } from '@nestjs/common';
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
  private logger = new Logger('ToursService');

  constructor(
    private countriesService: CountriesService,
    private toursRepository: ToursRepository,
    private imagesService: ImagesService,
  ) {}

  async findTours(
    getToursFilterDto: GetToursFilterDto,
    user: User,
  ): Promise<Tour[]> {
    return await this.toursRepository.findTours(getToursFilterDto, user);
  }

  async findTourById(id: string, user: User): Promise<Tour> {
    return await this.toursRepository.findTourById(id, user);
  }

  async createTour(createTourDto: CreateTourDto, user: User): Promise<Tour> {
    return await this.toursRepository.createTour(createTourDto, user);
  }

  async createTourImage(tourId: string, file: ImageFileType, user: User) {
    const tourFound = await this.toursRepository.findTourById(tourId, user);
    const image = await this.imagesService.createImage(file.filename);
    if (tourFound) {
      await this.toursRepository.createTourImage(tourId, image, user);

      this.logger.log(
        `Image with file name ${file.filename} for Tour ${tourFound.id} created`,
      );
    }
  }
}
