import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesRepository extends Repository<Image> {
  private logger = new Logger('ImagesRepository');

  constructor(private dataSource: DataSource) {
    super(Image, dataSource.createEntityManager());
  }

  async findImageById(id: string): Promise<Image> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      const msg = `Image with id: ${id} not found!`;

      this.logger.log(msg);
      throw new NotFoundException(msg);
    }

    return found;
  }

  async createImage(path: string): Promise<Image> {
    const image = this.create({
      path,
    });

    try {
      await this.save(image);

      return image;
    } catch (err) {
      this.logger.log(`Internal error trying to create the image ${path}`);
      throw new InternalServerErrorException();
    }
  }
}
