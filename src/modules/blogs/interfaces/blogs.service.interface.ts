import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IGetBlogsQueryDto } from '../dto/get-blogs.dto';
import { Blog } from '../entities/blog.entity';

export interface IBlogService {
  getByPagingAndFilter(paingQuery: IGetBlogsQueryDto): Promise<Blog[]>;
  countAll(
    query: Omit<IGetBlogsQueryDto, keyof IGetPagingQueryDto>,
  ): Promise<number>;
  getById(blogId: number): Promise<Blog>;
  getByFolderId(folderId: number): Promise<Blog[]>;
  addOneView(blogId: number): Promise<boolean>;
}
