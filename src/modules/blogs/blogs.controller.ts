import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { IAddBlogDto } from './dto/add-blog.dto';
import { Blog } from './entities/blog.entity';
import { BlogsCommentsService } from '../blogs-comments/blogs-comments.service';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IUpdateBlogDto } from './dto/update-blog.dto';
import { IGetBlogsQueryDto } from './dto/get-blogs.dto';
import { CheckAbilites } from '../casl/abilities.decorator';
import { Action, Subject } from '../casl/abilitits.guard';
import { JwtGuard } from '../auth/jwt.guard';
import { AbilititsGuard } from '../casl/abilitits.guard';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected readonly blogService: BlogsService,
    protected readonly blogsCommentsService: BlogsCommentsService,
  ) {}

  @Get()
  async getBlogsByPaging(
    @Query() query: IGetBlogsQueryDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Blog[]> {
    const blogs = await this.blogService.getByPagingAndFilter(query);
    const counts = await Promise.all(
      blogs.map((blog) => this.blogsCommentsService.countByBlogId(blog.id)),
    );
    blogs.forEach((blog, index) => (blog.commentsCount = counts[index]));
    const count = await this.blogService.countAll(query);
    setXTotalCount(res, count);
    return blogs;
  }

  @Get('count')
  async getBlogsTotoalCount() {
    const total = await this.blogService.countAll({});
    return total;
  }

  @Get(':id')
  async getBlogById(@Param('id', ParseIntPipe) id: number) {
    const blog = await this.blogService.getById(id);
    if (blog === null) {
      throw new HttpException('文章不存在或者已经删除', HttpStatus.NOT_FOUND);
    }
    blog.commentsCount = await this.blogsCommentsService.countByBlogId(blog.id);
    return blog;
  }
}
