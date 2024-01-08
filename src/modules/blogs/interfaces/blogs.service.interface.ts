import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IAddBlogDto } from '../dto/add-blog.dto';
import { IGetBlogsQueryDto } from '../dto/get-blogs.dto';
import { IUpdateBlogDto } from '../dto/update-blog.dto';
import { Blog } from '../entities/blog.entity';

export interface IBlogService {
  update(updateBlogDto: IUpdateBlogDto): Promise<Blog>;
  add(addBlogDto: IAddBlogDto): Promise<Blog>;
  getByPagingAndFilter(paingQuery: IGetBlogsQueryDto): Promise<Blog[]>;
  countAll(
    query: Omit<IGetBlogsQueryDto, keyof IGetPagingQueryDto>,
  ): Promise<number>;
  getById(blogId: number): Promise<Blog>;
  deleteById(blogId: number): Promise<boolean>;
  getByFolderId(folderId: number): Promise<Blog[]>;
  addOneView(blogId: number): Promise<boolean>;
}
