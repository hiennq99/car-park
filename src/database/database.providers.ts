import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ORM_CONFIG } from '@park/config';

const dataSource = new DataSource({
  type: 'postgres',
  ...ORM_CONFIG,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  logging: true,
  migrations: [__dirname + '/migrations/*.ts'],
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];

export default dataSource;
