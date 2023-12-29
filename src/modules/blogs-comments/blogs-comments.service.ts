import { Inject, Injectable } from '@nestjs/common';
import { IAddCommentDto } from './dto/add-comment.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { DeepPartial, Repository } from 'typeorm';
import { BlogComment } from './entities/blog-comment.entity';
import { BLOG_COMMENT_REPOSITORY } from 'src/common/constants/providers';

@Injectable()
export class BlogsCommentsService {
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

  async add(addCommentDto: IAddCommentDto) {
    const createTime = getCurrentDatetime();
    const partialComment: DeepPartial<BlogComment> = {
      createTime,
      deleted: false,
      blog: addCommentDto.blog,
      account: addCommentDto.account,
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

  async deleteById(commentId: number) {
    const comment = await this.blogCommentRepository.findOneBy({
      id: commentId,
    });
    if (comment) {
      const partialComment: Partial<BlogComment> = {
        deleted: true,
      };
      Object.assign(comment, partialComment);
      await this.blogCommentRepository.save(comment);
      return true;
    }
    throw new Error('blog not found');
  }
}
