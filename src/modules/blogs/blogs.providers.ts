import {
  BLOG_REPOSITORY,
  DATA_SOURCE,
  FOLDER_REPOSITORY,
  TAG_REPOSITORY,
} from 'src/common/constants/providers';
import { Blog } from './entities/blog.entity';
import { DataSource } from 'typeorm';
import { Folder } from '../folders/entities/folder.entity';
import { Tag } from '../tags/entities/tag.entity';

export const blogsProviders = [
  {
    provide: BLOG_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Blog),
    inject: [DATA_SOURCE],
  },
  {
    provide: FOLDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Folder),
    inject: [DATA_SOURCE],
  },
  {
    provide: TAG_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: [DATA_SOURCE],
  },
];
