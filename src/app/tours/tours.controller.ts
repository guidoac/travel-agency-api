import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ImageFileType } from 'src/utils/types/files';
import { User } from '../users/user.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { GetToursFilterDto } from './dto/get-tours-filter.dto';
import { ToursService } from './tours.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get()
  findTours(
    @Body() getToursFilterDto: GetToursFilterDto,
    @GetUser() user: User,
  ) {
    return this.toursService.findTours(getToursFilterDto, user);
  }

  @Post()
  createTour(@Body() createTourDto: CreateTourDto, @GetUser() user: User) {
    return this.toursService.createTour(createTourDto, user);
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('file'))
  createTourImage(
    @UploadedFile() file: ImageFileType,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.toursService.createTourImage(id, file, user);
  }
}
