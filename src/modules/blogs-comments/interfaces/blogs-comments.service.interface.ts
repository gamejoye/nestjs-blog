import { IAddCommentDto } from '../dto/add-comment.dto';
import { IUpdateBlogCommentDto } from '../dto/update.comment.dto';
import { BlogComment } from '../entities/blog-comment.entity';

export interface IBlogsCommentsService {
  getByBlogId(
    blogId: number,
    timestamp: string,
    amount: number,
    parentCommentId?: number,
  ): Promise<BlogComment[]>;
  add(addCommentDto: IAddCommentDto, accountId: number): Promise<BlogComment>;
  getById(id: number): Promise<BlogComment>;
  countByBlogId(blogId: number): Promise<number>;
  deleteById(commentId: number, accountId: number): Promise<boolean>;
  update(
    comment: IUpdateBlogCommentDto,
    accountId: number,
  ): Promise<BlogComment>;
}
