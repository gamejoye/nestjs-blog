import {
  BLOG_COMMENT_REPOSITORY,
  DATA_SOURCE,
} from 'src/common/constants/providers';
import { BlogComment } from './entities/blog-comment.entity';
import { DataSource } from 'typeorm';

export const blogsCommentsProviders = [
  {
    provide: BLOG_COMMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BlogComment),
    inject: [DATA_SOURCE],
  },
];
