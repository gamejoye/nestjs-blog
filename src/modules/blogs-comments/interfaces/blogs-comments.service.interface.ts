import { IAddCommentDto } from '../dto/add-comment.dto';
import { BlogComment } from '../entities/blog-comment.entity';

export interface IBlogsCommentsService {
  getByBlogId(
    blogId: number,
    timestamp: string,
    amount: number,
    parentCommentId?: number,
  ): Promise<BlogComment[]>;
  add(addCommentDto: IAddCommentDto): Promise<BlogComment>;
  getById(id: number): Promise<BlogComment>;
  countByBlogId(blogId: number): Promise<number>;
  deleteById(commentId: number): Promise<boolean>;
}
