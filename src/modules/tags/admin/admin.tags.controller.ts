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
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { AdminTagsService } from './admin.tags.service';
import { TagsController } from '../tags.controller';
import { CheckAbilites } from 'src/modules/casl/abilities.decorator';
import {
  AbilititsGuard,
  Action,
  Subject,
} from 'src/modules/casl/abilitits.guard';
import { JwtGuard } from 'src/modules/auth/jwt.guard';
import { IAddTagDto } from '../dto/add-tag.dto';
import { IUpdateTagDto } from '../dto/update-tag.dto';

@Controller('admin/tags')
@UseGuards(JwtGuard, AbilititsGuard)
export class AdminTagsController extends TagsController {
  constructor(protected readonly tagsService: AdminTagsService) {
    super(tagsService);
  }
  @Get()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getAllTags(
    @Query() query: IGetPagingQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tags = await super.getAllTags(query, res);
    return tags;
  }

  @Get('count')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getBlogsTotoalCount() {
    const total = await super.getBlogsTotoalCount();
    return total;
  }

  @Get(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getTagById(@Param('id', ParseIntPipe) id: number) {
    const tag = await super.getTagById(id);
    return tag;
  }

  @Post()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async addTag(@Body() addTagDto: IAddTagDto) {
    const tag = await this.tagsService.add(addTagDto);
    return tag;
  }

  @Put(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async updateTag(@Body() dto: IUpdateTagDto) {
    const tag = await this.tagsService.update(dto);
    return tag;
  }

  @Delete(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    await this.tagsService.deleteById(id);
    return { id };
  }
}
