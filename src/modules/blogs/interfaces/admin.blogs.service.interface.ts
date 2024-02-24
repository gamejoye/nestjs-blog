import { Blog } from '../entities/blog.entity';
import { IBlogService } from './blogs.service.interface';
import { IUpdateBlogDto } from '../dto/update-blog.dto';
import { IAddBlogDto } from '../dto/add-blog.dto';

export interface IAdminBlogService extends IBlogService {
  update(updateBlogDto: IUpdateBlogDto): Promise<Blog>;
  add(addBlogDto: IAddBlogDto): Promise<Blog>;
  deleteById(blogId: number): Promise<boolean>;
}
