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
import { FoldersService } from './folders.service';
import { IAddFolderDto } from './dto/add-folder.dto';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IUpdateFolderDto } from './dto/update-folder.dto';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { CheckAbilites } from '../casl/abilities.decorator';
import { Action, Subject } from '../casl/abilitits.guard';
import { JwtGuard } from '../auth/jwt.guard';
import { AbilititsGuard } from '../casl/abilitits.guard';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

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

  @Post()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  @UseGuards(JwtGuard, AbilititsGuard)
  async addFolder(@Body() addFolderDto: IAddFolderDto) {
    const folder = await this.foldersService.add(addFolderDto);
    return folder;
  }

  @Put(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  @UseGuards(JwtGuard, AbilititsGuard)
  async updateFolder(@Body() updateFolderDto: IUpdateFolderDto) {
    const folder = await this.foldersService.update(updateFolderDto);
    return folder;
  }

  @Delete(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  @UseGuards(JwtGuard, AbilititsGuard)
  async deleteFolder(@Param('id', ParseIntPipe) id: number) {
    await this.foldersService.deleteById(id);
  }
}
