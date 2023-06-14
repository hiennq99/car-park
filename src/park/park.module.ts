import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '@park/database/database.module';
import { Park } from './entities/park.entity';

@Module({
  controllers: [ParkController],
  providers: [
    ParkService,
    {
      provide: 'CAR_PARK_REPO',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Park),
      inject: ['DATA_SOURCE'],
    },
  ],
  imports: [DatabaseModule],
})
export class ParkModule {}
