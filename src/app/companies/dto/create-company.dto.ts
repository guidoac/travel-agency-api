import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/app/address/dto/create-address.dto';

export class CreateCompanyDto {
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
