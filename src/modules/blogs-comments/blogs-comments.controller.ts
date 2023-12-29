import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsCommentsService } from './blogs-comments.service';
import { IGetCommentsQueryDto } from './dto/get-comments.dto';
import { IAddCommentDto } from './dto/add-comment.dto';
import { BearerTokenAuthGuard } from 'src/common/guards/bearer-token-auth.guard';
import { AccountsService } from '../accounts/accounts.service';

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
  @UseGuards(BearerTokenAuthGuard)
  async addComment(@Body() addCommentDto: IAddCommentDto) {
    const comment = await this.blogsCommentsService.add(addCommentDto);
    return comment;
  }
}
