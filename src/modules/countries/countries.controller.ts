import { Body, Controller, Get, Post } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getAllCountries() {
    return this.countriesService.findAll();
  }

  @Post()
  createCountry(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countriesService.createCountry(createCountryDto);
  }
}
