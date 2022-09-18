import { Injectable } from '@nestjs/common';
import { ImageFileType } from 'src/utils/types/files';
import { DataSource, Repository } from 'typeorm';
import { CreateTourImageDto } from './dto/create-tour-image.dto';
import { TourImage } from './tour-image.entity';
import { ToursService } from './tours.service';

@Injectable()
export class TourImageRepository extends Repository<TourImage> {
  constructor(
    private dataSource: DataSource,
    private toursService: ToursService,
  ) {
    super(TourImage, dataSource.createEntityManager());
  }

  async createTourImage(
    createTourImageDto: CreateTourImageDto,
    tourId: string,
    file: ImageFileType,
  ): Promise<TourImage> {
    const tour = await this.toursService.findTourById(tourId);

    const { type } = createTourImageDto;

    const tourImage = this.create({
      id: file.filename,
      type,
      tour,
    });

    try {
      await this.save(tourImage);

      return tourImage;
    } catch (err) {
      throw err;
    }
  }
}
