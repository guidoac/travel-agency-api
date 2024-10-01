import { IsString, MinLength } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  country: string;
}
