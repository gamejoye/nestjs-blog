import { DataSource } from 'typeorm';
import config from 'src/common/config/mysql';
import { DATA_SOURCE } from 'src/common/constants/providers';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        username: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        extra: {
          dateStrings: true,
        },
      });
      return dataSource.initialize();
    },
  },
];
