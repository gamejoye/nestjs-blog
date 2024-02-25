import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';

@Controller('folders')
export class FoldersController {
  constructor(protected readonly foldersService: FoldersService) {}

  @Get()
  async getFoldersByPaging(
    @Query() query: IGetPagingQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const folders = await this.foldersService.getByPaging(query);
    const count = await this.foldersService.countAll();
    setXTotalCount(res, count);
    return folders;
  }

  @Get('count')
  async getBlogsTotoalCount() {
    const total = await this.foldersService.countAll();
    return total;
  }

  @Get(':id')
  async getFolderById(@Param('id', ParseIntPipe) id: number) {
    const folder = await this.foldersService.getById(id);
    return folder;
  }
}
