import { Inject, Injectable } from '@nestjs/common';
import { IAddBlogDto } from './dto/add-blog.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { BLOG_REPOSITORY, DATA_SOURCE } from 'src/common/constants/providers';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { Folder } from '../folders/entities/folder.entity';
import { Tag } from '../tags/entities/tag.entity';
import { IUpdateBlogDto } from './dto/update-blog.dto';

// TODO 处理角色认证
@Injectable()
export class BlogsService {
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

  async add(addBlogDto: IAddBlogDto): Promise<Partial<Blog>> {
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

  async getAll() {
    const blogs = await this.blogRepository.find({
      relations: ['tags', 'folders'],
    });
    return blogs;
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

// @Injectable()
// export class BlogsService {}
