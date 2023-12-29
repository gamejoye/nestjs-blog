import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { blog1, blog2, blog3 } from './blog-data';
import { tag1, tag2, tag3, tag4, tag5, tag6, tag7 } from './tag-data';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export const initialBlogsTags: Array<[Blog, Tag]> = [
  [blog1, tag1],
  [blog1, tag2],
  [blog1, tag3],
  [blog2, tag4],
  [blog2, tag5],
  [blog2, tag7],
  [blog2, tag3],
  [blog3, tag7],
  [blog3, tag6],
  [blog3, tag3],
];
