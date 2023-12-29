import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IUpdateTagDto } from './dto/update-tag.dto';
import { AdminAuthGuard } from 'src/common/guards/admin-token-auto.guard';
import { IAddTagDto } from './dto/add-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getAllTags(@Res({ passthrough: true }) res: Response) {
    const tags = await this.tagsService.getAll();
    setXTotalCount(res, tags.length);
    return tags;
  }

  @Get(':id')
  async getTagById(@Param('id', ParseIntPipe) id: number) {
    const tag = await this.tagsService.getById(id);
    return tag;
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async addTag(@Body() addTagDto: IAddTagDto) {
    const tag = await this.tagsService.add(addTagDto);
    return tag;
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  async updateTag(@Body() dto: IUpdateTagDto) {
    const tag = await this.tagsService.update(dto);
    return tag;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    await this.tagsService.deleteById(id);
  }
}
