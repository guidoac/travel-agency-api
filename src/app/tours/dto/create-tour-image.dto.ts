import { IsString } from 'class-validator';

export class CreateTourImageDto {
  @IsString()
  type: string;
}
