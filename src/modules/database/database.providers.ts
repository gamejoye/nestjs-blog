import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/common/constants/providers';
import { EnvConfigService } from '../env-config/env-config.service';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (envConfigService: EnvConfigService) => {
      const config = envConfigService.getDatabaseConfig();
      const dataSource = new DataSource({
        type: config.type,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        extra: {
          dateStrings: true,
        },
      });
      return dataSource.initialize();
    },
    inject: [EnvConfigService],
  },
];
