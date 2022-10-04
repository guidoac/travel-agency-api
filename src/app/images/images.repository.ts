import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesRepository extends Repository<Image> {
  constructor(private dataSource: DataSource) {
    super(Image, dataSource.createEntityManager());
  }

  async findImageById(id: string): Promise<Image> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Image with id: ${id} not found!`);
    }

    return found;
  }

  async createImage(name: string): Promise<Image> {
    const image = this.create({
      file_name: name,
    });

    try {
      await this.save(image);

      return image;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
