import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BlogsController } from '../blogs.controller';
import { IGetBlogsQueryDto } from '../dto/get-blogs.dto';
import { Blog } from '../entities/blog.entity';
import { Response } from 'express';
import { CheckAbilites } from 'src/modules/casl/abilities.decorator';
import {
  AbilititsGuard,
  Action,
  Subject,
} from 'src/modules/casl/abilitits.guard';
import { BlogsCommentsService } from 'src/modules/blogs-comments/blogs-comments.service';
import { AdminBlogsService } from './admin.blogs.service';
import { JwtGuard } from 'src/modules/auth/jwt.guard';
import { IUpdateBlogDto } from '../dto/update-blog.dto';
import { IAddBlogDto } from '../dto/add-blog.dto';

@Controller('admin/blogs')
@UseGuards(JwtGuard, AbilititsGuard)
export class AdminBlogsController extends BlogsController {
  constructor(
    protected readonly blogService: AdminBlogsService,
    protected readonly blogsCommentsService: BlogsCommentsService,
  ) {
    super(blogService, blogsCommentsService);
  }

  @Get()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getBlogsByPaging(
    @Query() query: IGetBlogsQueryDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Blog[]> {
    const blogs = await super.getBlogsByPaging(query, res);
    return blogs;
  }

  @Get('count')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getBlogsTotoalCount() {
    const total = await super.getBlogsTotoalCount();
    return total;
  }

  @Get(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getBlogById(@Param('id', ParseIntPipe) id: number) {
    const blog = await super.getBlogById(id);
    return blog;
  }

  @Post()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async addBlog(@Body() addBlogDto: IAddBlogDto) {
    const blog = await this.blogService.add(addBlogDto);
    return blog;
  }

  @Put(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async updateBlog(@Body() dto: IUpdateBlogDto) {
    console.log(dto);
    const blog = await this.blogService.update(dto);
    return blog;
  }

  @Delete(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const status = await this.blogService.deleteById(id);
    return status;
  }
}
