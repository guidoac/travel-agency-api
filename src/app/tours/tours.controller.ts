import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';
import { ToursService } from './tours.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Post()
  createTour(@Body() createTourDto: CreateTourDto) {
    return this.toursService.createTour(createTourDto);
  }
}
