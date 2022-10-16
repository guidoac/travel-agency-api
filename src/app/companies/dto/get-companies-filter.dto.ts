import { IsOptional } from 'class-validator';

export class GetCompaniesFilterDto {
  @IsOptional()
  search?: string;
}
