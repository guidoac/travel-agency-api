import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuth } from 'src/modules/common/decorators/get-auth.decorator';
import { ImageFileType } from 'src/modules/common/types/files';
import { TheAuthGuard } from '../common/guards/auth.guard';
import { TheCompanyGuard } from '../common/guards/company.guard';
import { TheFileInterceptor } from '../common/interceptors/file-upload.interceptor';
import { Auth } from '../common/types/req-auth';
import { CreateTourDto } from './dto/create-tour.dto';
import { GetToursFilterDto } from './dto/get-tours-filter.dto';
import { ToursService } from './tours.service';

@UseGuards(TheAuthGuard, TheCompanyGuard)
@Controller(':companyAlias/tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get()
  findTours(
    @Body() getToursFilterDto: GetToursFilterDto,
    @GetAuth() auth: Auth,
  ) {
    return this.toursService.findTours(getToursFilterDto, auth);
  }

  @Post()
  createTour(@Body() createTourDto: CreateTourDto, @GetAuth() auth: Auth) {
    return this.toursService.createTour(createTourDto, auth);
  }

  @Post('/:id/image')
  @UseInterceptors(TheFileInterceptor())
  createTourImage(
    @UploadedFile() file: ImageFileType,
    @Param('id') tourId: string,
    @GetAuth() auth: Auth,
  ) {
    return this.toursService.createTourImage(tourId, file, auth);
  }
}
