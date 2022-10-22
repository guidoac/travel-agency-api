import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImagesRepository } from './images.repository';
import { ImagesService } from './images.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService, ImagesRepository],
  exports: [ImagesService, ImagesRepository],
})
export class ImagesModule {}
