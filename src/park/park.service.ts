import { Inject, Injectable } from '@nestjs/common';
import { FindCarParkQueryDto } from './dto/get-park.dto';
import { MoreThan, Repository } from 'typeorm';
import { Park } from './entities/park.entity';
import * as proj4 from 'proj4';

@Injectable()
export class ParkService {
  proj = null;
  constructor(
    @Inject('CAR_PARK_REPO') private carparkRepositoty: Repository<Park>,
  ) {
    this.proj = proj4;
    this.proj.defs(
      'EPSG:3414',
      '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs',
    );
    this.proj.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
  }
  async findAll(query: FindCarParkQueryDto) {
    const { latitude, longitude, page = 1, per_page = 3 } = query;
    const [lat, lng] = this.proj('EPSG:4326', 'EPSG:3414', [
      Number(latitude),
      Number(longitude),
    ]);
    const data = await this.carparkRepositoty
      .createQueryBuilder('carpark')
      .select('carpark.*')
      .addSelect(
        `earth_distance(ll_to_earth('${lat}', '${lng}'), ll_to_earth(carpark.x_coord, carpark.y_coord))`,
        'distance',
      )
      .limit(per_page)
      .where({ availableLots: MoreThan(0) })
      .skip(per_page * page)
      .orderBy('distance', 'DESC')
      .getRawMany();

    console.log(data);
    return {
      lat,
      lng,
      ...data,
    };
  }
}
