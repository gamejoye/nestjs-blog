import { BlogComment } from 'src/modules/blogs-comments/entities/blog-comment.entity';
import { blog1, blog2, blog3 } from './blog-data';
import {
  initialAccount1,
  initialAccount2,
  initialAccount3,
} from './account-data';
import { getCurrentDatetime } from '../utils/dayjs-helper';

export const blogComment1: BlogComment = {
  id: 1,
  blog: blog1,
  account: initialAccount1,
  content: '写的不错， 我已经准备去读源码了',
  createTime: getCurrentDatetime(),
  deleted: false,
};

export const blogComment2: BlogComment = {
  id: 2,
  blog: blog1,
  account: initialAccount2,
  content: 'react18的可中断恢复和优先级的源码也太难读懂了吧',
  createTime: getCurrentDatetime(),
  deleted: false,
};

export const blogComment3: BlogComment = {
  id: 3,
  blog: blog1,
  account: initialAccount3,
  content: '膜拜',
  parentComment: blogComment1,
  createTime: getCurrentDatetime(),
  deleted: false,
};

export const blogComment4: BlogComment = {
  id: 4,
  blog: blog1,
  account: initialAccount3,
  content: '我也是这么觉得的...',
  parentComment: blogComment2,
  createTime: getCurrentDatetime(),
  deleted: false,
};

export const blogComment5: BlogComment = {
  id: 5,
  blog: blog1,
  account: initialAccount3,
  content: '如果我也向你们一样强就好了',
  createTime: getCurrentDatetime(),
  deleted: false,
};

export const initialBlogComments: BlogComment[] = [
  blogComment1,
  blogComment2,
  blogComment3,
  blogComment4,
  blogComment5,
];
