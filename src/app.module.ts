import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkModule } from './park/park.module';

@Module({
  imports: [ParkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
