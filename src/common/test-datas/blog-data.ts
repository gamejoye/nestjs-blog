import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { tag1, tag2, tag3, tag4, tag5, tag6, tag7 } from './tag-data';
import { folder1, folder2, folder3, folder4 } from './folder-data';
import { getCurrentDatetime } from '../utils/dayjs-helper';

export const blog1: Blog = {
  id: 1,
  title: '如何学习好react',
  content: '尝试阅读源码',
  tags: [tag1, tag2, tag3],
  priority: 0,
  views: 99,
  folders: [folder1, folder3],
  createTime: getCurrentDatetime(),
  deleted: false,
  comments: [],
  commentsCount: 0,
};

export const blog2: Blog = {
  id: 2,
  title: '如何进行反向传播',
  content:
    '应用链式法则， 缓存正向传播的数值， 在从深层向低层反向传播的时候求偏导计算即可',
  tags: [tag3, tag4, tag5, tag7],
  priority: 1,
  views: 288,
  folders: [folder2, folder3, folder4],
  createTime: getCurrentDatetime(),
  deleted: false,
  comments: [],
  commentsCount: 0,
};

export const blog3: Blog = {
  id: 3,
  title: '如何学习acm算法',
  content: '刷题刷题刷题 vpvpvp 还是刷题刷题刷题 还是vpvpvp',
  tags: [tag3, tag6, tag7],
  priority: 0,
  views: 77,
  folders: [folder3, folder4],
  createTime: getCurrentDatetime(),
  deleted: false,
  comments: [],
  commentsCount: 0,
};

export const initialBlogs: Blog[] = [blog1, blog2, blog3];
