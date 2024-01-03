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
import { BlogsService } from './blogs.service';
import { IAddBlogDto } from './dto/add-blog.dto';
import { Blog } from './entities/blog.entity';
import { BlogsCommentsService } from '../blogs-comments/blogs-comments.service';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IUpdateBlogDto } from './dto/update-blog.dto';
import { AdminAuthGuard } from 'src/common/guards/admin-token-auto.guard';
import { IGetBlogsQueryDto } from './dto/get-blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogsService,
    private readonly blogsCommentsService: BlogsCommentsService,
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
    const count = await this.blogService.countAll();
    setXTotalCount(res, count);
    return blogs;
  }

  @Get('count')
  async getBlogsTotoalCount() {
    const total = await this.blogService.countAll();
    return total;
  }

  @Get(':id')
  async getBlogById(@Param('id', ParseIntPipe) id: number) {
    const blog = await this.blogService.getById(id);
    blog.commentsCount = await this.blogsCommentsService.countByBlogId(blog.id);
    return blog;
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async addBlog(@Body() addBlogDto: IAddBlogDto) {
    console.log('dto: ', addBlogDto);
    const blog = await this.blogService.add(addBlogDto);
    return blog;
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  async updateBlog(@Body() dto: IUpdateBlogDto) {
    console.log(dto);
    const blog = await this.blogService.update(dto);
    return blog;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const status = await this.blogService.deleteById(id);
    return status;
  }
}
