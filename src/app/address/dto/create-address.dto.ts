import {
  IsNumber,
  IsNumberString,
  isString,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  country: string;

  @IsString()
  @MinLength(6)
  address: string;

  @IsNumberString()
  @MaxLength(10)
  number: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @Length(8)
  @IsString()
  zipcode: string;

  @IsString()
  state: string;
}
