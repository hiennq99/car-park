import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindCarParkQueryDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsOptional()
  page: number;

  @IsOptional()
  per_page: number;
}
