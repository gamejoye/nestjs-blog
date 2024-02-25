import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';

@Controller('tags')
export class TagsController {
  constructor(protected readonly tagsService: TagsService) {}

  @Get()
  async getAllTags(
    @Query() query: IGetPagingQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const [tags, count] = await Promise.all([
      this.tagsService.getByPaging(query),
      this.tagsService.countAll(),
    ]);
    setXTotalCount(res, count);
    return tags;
  }

  @Get('count')
  async getBlogsTotoalCount() {
    const total = await this.tagsService.countAll();
    return total;
  }

  @Get(':id')
  async getTagById(@Param('id', ParseIntPipe) id: number) {
    const tag = await this.tagsService.getById(id);
    return tag;
  }
}
