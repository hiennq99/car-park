import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkModule } from './park/park.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cronjob/cron.module';

@Module({
  imports: [ParkModule, CronModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
