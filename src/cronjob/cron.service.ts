import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DATA_FETCH } from '@park/config';
import { Park } from '@park/park/entities/park.entity';
import { In, Repository } from 'typeorm';
import * as moment from 'moment';

type DataFecth = {
  items: {
    timestamp: Date;
    carpark_data: {
      carpark_info: {
        total_lots: string;
        lot_type: string;
        lots_available: string;
      }[];
      carpark_number: string;
    }[];
  }[];
};

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject('CAR_PARK_REPO') private carparkRepositoty: Repository<Park>,
  ) {}

  @Cron('3 * * * * *')
  async handleCron() {
    const currentDateInSTG = this.getTimeInSTG();

    const carparksInformation = await fetch(
      `${DATA_FETCH}?date_time=${currentDateInSTG}`,
    );

    const jsonData: DataFecth = await carparksInformation.json();
    if (!jsonData.items) return;

    const currentCarparks = jsonData.items[0].carpark_data;

    if (!currentCarparks.length) return;

    const oldCarparks: Park[] = await this.carparkRepositoty.findBy({
      carParkNo: In(currentCarparks.map((data: any) => data.carpark_number)),
    });

    for (const carpark of oldCarparks) {
      const currentCarpark = currentCarparks.find(
        (car) => car.carpark_number === carpark.carParkNo,
      );
      const availableSlot = Number(
        currentCarpark.carpark_info[0].lots_available,
      );
      const totalSlots = Number(currentCarpark.carpark_info[0].total_lots);
      if (carpark.availableLots !== availableSlot) {
        carpark.availableLots = availableSlot;
      }

      if (carpark.totalLots === 0 || carpark.totalLots !== totalSlots) {
        carpark.totalLots = totalSlots;
      }

      await this.carparkRepositoty.save(carpark);
    }
    this.logger.debug('updated all data carparks');
  }

  getTimeInSTG() {
    return moment().utcOffset('+0800').format('YYYY-MM-DDTHH:mm:ss');
  }
}
