import { Inject, Injectable } from '@nestjs/common';
import { IAddBlogDto } from './dto/add-blog.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { BLOG_REPOSITORY, DATA_SOURCE } from 'src/common/constants/providers';
import { DataSource, DeepPartial, Like, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { Folder } from '../folders/entities/folder.entity';
import { Tag } from '../tags/entities/tag.entity';
import { IUpdateBlogDto } from './dto/update-blog.dto';
import { IGetBlogsQueryDto } from './dto/get-blogs.dto';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IBlogService } from './interfaces/blogs.service.interface';

// TODO 处理角色认证
@Injectable()
export class BlogsService implements IBlogService {
  constructor(
    @Inject(DATA_SOURCE) private dataSouce: DataSource,
    @Inject(BLOG_REPOSITORY) private blogRepository: Repository<Blog>,
  ) {}

  async update(updateBlogDto: IUpdateBlogDto) {
    return await this.dataSouce.transaction(async (manager) => {
      const createTime = getCurrentDatetime();
      const partialBlog: DeepPartial<Blog> = {
        ...updateBlogDto,
      };
      partialBlog.tags = await Promise.all(
        updateBlogDto.tags.map(async (tag) => {
          const foundTag = await manager.findOne(Tag, {
            where: { name: tag.name },
          });
          if (!foundTag) {
            const resultTag: Partial<Tag> = {
              name: tag.name,
              createTime,
              deleted: false,
            };
            const newTag = await manager.save(Tag, resultTag);
            return newTag;
          }
          return foundTag;
        }),
      );

      partialBlog.folders = await Promise.all(
        updateBlogDto.folders.map(async (folder) => {
          const foundFolder = await manager.findOne(Folder, {
            where: { name: folder.name },
          });
          if (!foundFolder) {
            const resultFolder: Partial<Folder> = {
              name: folder.name,
              createTime,
              deleted: false,
            };
            const newFolder = await manager.save(Folder, resultFolder);
            return newFolder;
          }
          return foundFolder;
        }),
      );

      return await manager.save(Blog, partialBlog);
    });
  }

  async add(addBlogDto: IAddBlogDto) {
    return await this.dataSouce.transaction(async (manager) => {
      const createTime = getCurrentDatetime();
      const partialBlog: Partial<Blog> = {
        ...addBlogDto,
        createTime,
        views: 0,
        deleted: false,
      };
      partialBlog.tags = await Promise.all(
        addBlogDto.tags.map(async (tag) => {
          let foundTag = await manager.findOne(Tag, {
            where: { name: tag.name },
          });
          if (!foundTag) {
            foundTag = { ...tag, createTime, deleted: false };
            const newTag = await manager.save(Tag, foundTag);
            return newTag;
          }
          return foundTag;
        }),
      );

      partialBlog.folders = await Promise.all(
        addBlogDto.folders.map(async (folder) => {
          let foundFolder = await manager.findOne(Folder, {
            where: { name: folder.name },
          });
          if (!foundFolder) {
            foundFolder = { ...folder, createTime, deleted: false };
            const newFolder = await manager.save(Folder, foundFolder);
            return newFolder;
          }
          return foundFolder;
        }),
      );
      return await manager.save(Blog, partialBlog);
    });
  }

  async getByPagingAndFilter(paingQuery: IGetBlogsQueryDto) {
    const amount = paingQuery._end - paingQuery._start;
    const skip = paingQuery._start;
    const { _sort: sort, _order: order } = paingQuery;
    const query = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.tags', 'tag')
      .leftJoinAndSelect('blog.folders', 'folder');
    if (paingQuery.q !== undefined) {
      query.andWhere(`blog.content like :q`, { q: `%${paingQuery.q}%` });
    }
    if (paingQuery.folder !== undefined) {
      query.andWhere(`folder.name = :folder`, { folder: paingQuery.folder });
    }
    if (paingQuery.tag !== undefined) {
      query.andWhere(`tag.name = :tag`, { tag: paingQuery.tag });
    }
    query.orderBy(`blog.${sort}`, order).skip(skip).take(amount);
    return query.getMany();
  }

  async countAll(query: Omit<IGetBlogsQueryDto, keyof IGetPagingQueryDto>) {
    const select = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoin('blog.folders', 'folder')
      .leftJoin('blog.tags', 'tag');
    if (query.q !== undefined) {
      select.andWhere('blog.content like :q', { q: `%${query.q}%` });
    }
    if (query.folder !== undefined) {
      select.andWhere('folder.name = :folder', { folder: query.folder });
    }
    if (query.tag !== undefined) {
      select.andWhere('tag.name = :tag', { tag: query.tag });
    }
    return await select.getCount();
  }

  async getById(blogId: number) {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['tags', 'folders'],
    });
    return blog;
  }

  async deleteById(blogId: number) {
    const blog = await this.blogRepository.findOneBy({ id: blogId });
    if (blog) {
      const partialBlog: Partial<Blog> = {
        deleted: true,
      };
      Object.assign(blog, partialBlog);
      await this.blogRepository.save(blog);
      return true;
    }
    throw new Error('blog not found');
  }

  async getByFolderId(folderId: number) {
    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .innerJoin('blog.folders', 'folder')
      .where('folder.id = :folderId', { folderId })
      .getMany();
    return blogs;
  }

  async addOneView(blogId: number) {
    const blog = await this.blogRepository.findOneBy({ id: blogId });
    if (blog) {
      const partialBlog: Partial<Blog> = {
        views: blog.views + 1,
      };
      Object.assign(blog, partialBlog);
      await this.blogRepository.save(blog);
      return true;
    }
    throw new Error('blog not found');
  }
}
