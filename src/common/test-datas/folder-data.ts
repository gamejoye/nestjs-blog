import { Folder } from 'src/modules/folders/entities/folder.entity';
import { getCurrentDatetime } from '../utils/dayjs-helper';
import { blog1, blog2, blog3 } from './blog-data';

export const folder1: Folder = {
  id: 1,
  name: '前端',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog1],
};

export const folder2: Folder = {
  id: 2,
  name: '深度学习',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog2],
};

export const folder3: Folder = {
  id: 3,
  name: '兴趣',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog1, blog2, blog3],
};

export const folder4: Folder = {
  id: 4,
  name: '算法',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog2, blog3],
};

export const initialFolders: Folder[] = [folder1, folder2, folder3, folder4];
