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
import { TagsService } from './tags.service';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IUpdateTagDto } from './dto/update-tag.dto';
import { IAddTagDto } from './dto/add-tag.dto';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { CheckAbilites } from '../casl/abilities.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { AbilititsGuard } from '../casl/abilitits.guard';
import { Action, Subject } from '../casl/abilitits.guard';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getAllTags(
    @Query() query: IGetPagingQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tags = await this.tagsService.getByPaging(query);
    const count = await this.tagsService.countAll();
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

  @Post()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  @UseGuards(JwtGuard, AbilititsGuard)
  async addTag(@Body() addTagDto: IAddTagDto) {
    const tag = await this.tagsService.add(addTagDto);
    return tag;
  }

  @Put(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  @UseGuards(JwtGuard, AbilititsGuard)
  async updateTag(@Body() dto: IUpdateTagDto) {
    const tag = await this.tagsService.update(dto);
    return tag;
  }

  @Delete(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  @UseGuards(JwtGuard, AbilititsGuard)
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    await this.tagsService.deleteById(id);
  }
}
