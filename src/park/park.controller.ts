import { Controller, Get, Query } from '@nestjs/common';
import { ParkService } from './park.service';
import { FindCarParkQueryDto } from './dto/get-park.dto';

@Controller('carparks')
export class ParkController {
  constructor(private readonly parkService: ParkService) {}
  @Get('nearest')
  findAll(@Query() query: FindCarParkQueryDto) {
    console.log(query);
    return this.parkService.findAll(query);
  }
}
