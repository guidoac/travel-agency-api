import { Injectable } from '@nestjs/common';
import { Image } from './image.entity';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(private imagesRepository: ImagesRepository) {}

  async findImageById(id: string): Promise<Image> {
    return await this.imagesRepository.findImageById(id);
  }

  async createImage(filename: string): Promise<Image> {
    return await this.imagesRepository.createImage(filename);
  }
}
