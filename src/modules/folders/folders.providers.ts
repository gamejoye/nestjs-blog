import { DATA_SOURCE, FOLDER_REPOSITORY } from 'src/common/constants/providers';
import { DataSource } from 'typeorm';
import { Folder } from './entities/folder.entity';

export const foldersProviders = [
  {
    provide: FOLDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Folder),
    inject: [DATA_SOURCE],
  },
];
