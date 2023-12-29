import { DATA_SOURCE, TAG_REPOSITORY } from 'src/common/constants/providers';
import { DataSource } from 'typeorm';
import { Tag } from './entities/tag.entity';

export const tagsProviders = [
  {
    provide: TAG_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: [DATA_SOURCE],
  },
];
