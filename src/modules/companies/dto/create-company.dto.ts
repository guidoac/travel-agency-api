import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { Generated } from 'typeorm';

export class CreateCompanyDto {
  @IsString()
  alias: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  logo: string;

  @IsObject()
  company_address: CreateAddressDto;
}
