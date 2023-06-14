import { Test, TestingModule } from '@nestjs/testing';
import { ParkService } from './park.service';

describe('ParkService', () => {
  let service: ParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkService],
    }).compile();

    service = module.get<ParkService>(ParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get data', async () => {
    const latitude = 1.37326;
    const longitude = 103.897;

    const data = await service.findAll({
      latitude,
      longitude,
      page: 1,
      per_page: 3,
    });

    expect(data.length).toEqual(3);
  });

  it('can not get data', async () => {
    const latitude = null;
    const longitude = 103.897;

    const data = await service.findAll({
      latitude,
      longitude,
      page: 1,
      per_page: 3,
    });

    expect(data.length).toEqual(0);
  });
});
