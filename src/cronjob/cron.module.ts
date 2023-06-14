import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '@park/database/database.module';
import { TasksService } from './cron.service';
import { Park } from '@park/park/entities/park.entity';

@Module({
  providers: [
    TasksService,
    {
      provide: 'CAR_PARK_REPO',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Park),
      inject: ['DATA_SOURCE'],
    },
  ],
  imports: [DatabaseModule],
})
export class CronModule {}
