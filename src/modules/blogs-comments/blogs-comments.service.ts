import { Inject, Injectable } from '@nestjs/common';
import { IAddCommentDto } from './dto/add-comment.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { DeepPartial, Repository } from 'typeorm';
import { BlogComment } from './entities/blog-comment.entity';
import { BLOG_COMMENT_REPOSITORY } from 'src/common/constants/providers';
import { IBlogsCommentsService } from './interfaces/blogs-comments.service.interface';
import { IUpdateBlogCommentDto } from './dto/update.comment.dto';

@Injectable()
export class BlogsCommentsService implements IBlogsCommentsService {
  constructor(
    @Inject(BLOG_COMMENT_REPOSITORY)
    private blogCommentRepository: Repository<BlogComment>,
  ) {}

  async getByBlogId(
    blogId: number,
    timestamp: string,
    amount = 10,
    parentCommentId?: number,
  ) {
    const query = this.blogCommentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.account', 'account')
      .innerJoinAndSelect('account.platformProfile', 'platformProfile')
      .where('comment.blog.id = :blogId', { blogId })
      .orderBy('comment.createTime', 'DESC')
      .take(amount);

    if (parentCommentId !== undefined) {
      query.andWhere('comment.parentCommentId = :parentCommentId', {
        parentCommentId,
      });
    }

    if (timestamp !== '') {
      query.andWhere('comment.createTime < :timestamp', { timestamp });
    }

    return await query.getMany();
  }

  async add(addCommentDto: IAddCommentDto, accountId: number) {
    const createTime = getCurrentDatetime();
    const partialComment: DeepPartial<BlogComment> = {
      createTime,
      deleted: false,
      blog: addCommentDto.blog,
      account: {
        id: accountId,
      },
      parentComment: addCommentDto.parentComment,
      content: addCommentDto.content,
    };
    const commentWithoutAccount =
      await this.blogCommentRepository.save(partialComment);

    const query = this.blogCommentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.account', 'account')
      .innerJoinAndSelect('account.platformProfile', 'platformProfile')
      .where('comment.id = :id', { id: commentWithoutAccount.id });

    const comment = await query.getOne();
    return comment;
  }

  async getById(id: number) {
    const comment = await this.blogCommentRepository.findOne({
      where: {
        id: id,
      },
    });
    return comment;
  }

  async countByBlogId(blogId: number) {
    return this.blogCommentRepository
      .createQueryBuilder('comment')
      .where('comment.blog.id = :blogId', { blogId })
      .getCount();
  }

  async deleteById(commentId: number, accountId: number) {
    const existingComment = await this.blogCommentRepository.findOneBy({
      id: commentId,
      account: {
        id: accountId,
      },
    });
    if (existingComment) {
      existingComment.deleted = true;
      await this.blogCommentRepository.save(existingComment);
      return true;
    }
    throw new Error('Comment not found or permission denied');
  }

  async update(updatedComment: IUpdateBlogCommentDto, accountId: number) {
    const existingComment = await this.blogCommentRepository.findOneBy({
      id: updatedComment.id,
      account: {
        id: accountId,
      },
    });
    if (existingComment) {
      Object.assign(existingComment, updatedComment);
      return await this.blogCommentRepository.save(existingComment);
    }
    throw new Error('Comment not found or permission denied');
  }
}
