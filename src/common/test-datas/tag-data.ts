import { Tag } from 'src/modules/tags/entities/tag.entity';
import { getCurrentDatetime } from '../utils/dayjs-helper';
import { blog1, blog2, blog3 } from './blog-data';

export const tag1: Tag = {
  id: 1,
  name: '前端',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog1],
};

export const tag2: Tag = {
  id: 2,
  name: 'react',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog1],
};

export const tag3: Tag = {
  id: 3,
  name: '兴趣',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog1, blog2, blog3],
};

export const tag4: Tag = {
  id: 4,
  name: '深度学习',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog2],
};

export const tag5: Tag = {
  id: 5,
  name: 'math',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog2],
};

export const tag6: Tag = {
  id: 6,
  name: 'acm',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog3],
};

export const tag7: Tag = {
  id: 7,
  name: '算法',
  createTime: getCurrentDatetime(),
  deleted: false,
  blogs: [blog2, blog3]
};

export const initialTags = [tag1, tag2, tag3, tag4, tag5, tag6, tag7];
