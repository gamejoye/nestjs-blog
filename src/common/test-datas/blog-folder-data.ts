import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { blog1, blog2, blog3 } from './blog-data';
import { folder1, folder2, folder3, folder4 } from './folder-data';
import { Folder } from 'src/modules/folders/entities/folder.entity';

export const initialBlogsFolers: Array<[Blog, Folder]> = [
  [blog1, folder1],
  [blog1, folder3],
  [blog2, folder2],
  [blog2, folder3],
  [blog2, folder4],
  [blog3, folder3],
  [blog3, folder4],
];
