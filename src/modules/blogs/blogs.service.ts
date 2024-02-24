import { Inject, Injectable } from '@nestjs/common';
import { BLOG_REPOSITORY, DATA_SOURCE } from 'src/common/constants/providers';
import { DataSource, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { IGetBlogsQueryDto } from './dto/get-blogs.dto';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IBlogService } from './interfaces/blogs.service.interface';

// TODO 处理角色认证
@Injectable()
export class BlogsService implements IBlogService {
  constructor(
    @Inject(DATA_SOURCE) protected dataSouce: DataSource,
    @Inject(BLOG_REPOSITORY) protected blogRepository: Repository<Blog>,
  ) {}

  async getByPagingAndFilter(paingQuery: IGetBlogsQueryDto) {
    const amount = paingQuery._end - paingQuery._start;
    const skip = paingQuery._start;
    const { _sort: sort, _order: order } = paingQuery;
    const query = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.tags', 'tag')
      .leftJoinAndSelect('blog.folders', 'folder');

    query.andWhere('blog.deleted = :deleted', { deleted: false });
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
    return await query.getMany();
  }

  async countAll(query: Omit<IGetBlogsQueryDto, keyof IGetPagingQueryDto>) {
    const select = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoin('blog.folders', 'folder')
      .leftJoin('blog.tags', 'tag');

    select.andWhere('blog.deleted = :deleted', { deleted: false });
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
    const blog = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.tags', 'tag', 'tag.deleted = :deleted', {
        deleted: false,
      })
      .leftJoinAndSelect(
        'blog.folders',
        'folder',
        'folder.deleted = :deleted',
        {
          deleted: false,
        },
      )
      .where('blog.id = :id', { id: blogId })
      .andWhere('blog.deleted = :deleted', { deleted: false })
      .getOne();
    return blog;
  }

  async getByFolderId(folderId: number) {
    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .innerJoin('blog.folders', 'folder')
      .where('folder.id = :folderId', { folderId })
      .andWhere('folder.deleted = :deleted', { deleted: false })
      .andWhere('blog.deleted = :deleted', { deleted: false })
      .getMany();
    return blogs;
  }

  async addOneView(blogId: number) {
    const blog = await this.blogRepository.findOneBy({
      id: blogId,
      deleted: false,
    });
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
