import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsCommentsService } from './blogs-comments.service';
import { IGetCommentsQueryDto } from './dto/get-comments.dto';
import { IAddCommentDto } from './dto/add-comment.dto';
import { AccountsService } from '../accounts/accounts.service';
import { JwtGuard } from '../auth/jwt.guard';
import { AbilititsGuard } from '../casl/abilitits.guard';
import { CheckAbilites } from '../casl/abilities.decorator';
import { Action, Subject } from '../casl/abilitits.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Account } from '../accounts/entities/account.entity';
import { IUpdateBlogCommentDto } from './dto/update.comment.dto';

@Controller('blogs/:blogId/comments')
export class BlogsCommentsController {
  constructor(
    private blogsCommentsService: BlogsCommentsService,
    private accountsService: AccountsService,
  ) {}

  @Get()
  async getCommentsByBlogId(
    @Param('blogId', ParseIntPipe) blogId: number,
    @Query() query: IGetCommentsQueryDto,
  ) {
    const {
      timestamp = '',
      amount,
      parent_comment_id: ParentCommentId,
    } = query;
    let comments = await this.blogsCommentsService.getByBlogId(
      blogId,
      timestamp,
      amount + 1,
      ParentCommentId,
    );
    let more = false;
    if (comments.length === amount + 1) {
      more = true;
      comments = comments.slice(0, amount);
    }
    return { more, comments };
  }

  @Post()
  @CheckAbilites({
    action: Action.Create,
    subject: Subject.BlogComment,
  })
  @UseGuards(JwtGuard, AbilititsGuard)
  async addComment(
    @GetUser() account: Account,
    @Body() addCommentDto: IAddCommentDto,
  ) {
    const comment = await this.blogsCommentsService.add(
      addCommentDto,
      account.id,
    );
    return comment;
  }

  @Put(':id')
  @CheckAbilites({
    action: Action.Update,
    subject: Subject.BlogComment,
  })
  @UseGuards(JwtGuard, AbilititsGuard)
  async updateComment(
    @GetUser() account: Account,
    @Body() dto: IUpdateBlogCommentDto,
  ) {
    const comment = await this.blogsCommentsService.update(dto, account.id);
    return comment;
  }
}
