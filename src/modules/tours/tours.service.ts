import { Injectable, Logger } from '@nestjs/common';
import { ImageFileType } from 'src/modules/common/types/files';
import { Auth } from '../common/types/req-auth';
import { CountriesService } from '../countries/countries.service';
import { ImagesService } from '../images/images.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { GetToursFilterDto } from './dto/get-tours-filter.dto';
import { Tour } from './tour.entity';
import { ToursRepository } from './tours.repository';

@Injectable()
export class ToursService {
  private logger = new Logger('ToursService');

  constructor(
    private toursRepository: ToursRepository,
    private imagesService: ImagesService,
  ) {}

  async findTours(
    getToursFilterDto: GetToursFilterDto,
    auth: Auth,
  ): Promise<Tour[]> {
    return await this.toursRepository.findTours(getToursFilterDto, auth);
  }

  async findTourById(id: string, auth: Auth): Promise<Tour> {
    return await this.toursRepository.findTourById(id, auth);
  }

  async createTour(createTourDto: CreateTourDto, auth: Auth): Promise<Tour> {
    return await this.toursRepository.createTour(createTourDto, auth);
  }

  async createTourImage(tourId: string, file: ImageFileType, auth: Auth) {
    const tourFound = await this.toursRepository.findTourById(tourId, auth);
    const image = await this.imagesService.createImage(file.path);

    if (image) {
      await this.toursRepository.createTourImage(tourId, image, auth);

      this.logger.log(
        `Image with file name ${file.filename} for Tour ${tourFound.id} created`,
      );

      return image.path;
    }
  }
}
