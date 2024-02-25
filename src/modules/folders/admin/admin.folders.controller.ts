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
import { CheckAbilites } from 'src/modules/casl/abilities.decorator';
import {
  AbilititsGuard,
  Action,
  Subject,
} from 'src/modules/casl/abilitits.guard';
import { JwtGuard } from 'src/modules/auth/jwt.guard';
import { IAddFolderDto } from '../dto/add-folder.dto';
import { IUpdateFolderDto } from '../dto/update-folder.dto';
import { FoldersController } from '../folders.controller';
import { AdminFoldersService } from './admin.folders.service';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { Response } from 'express';

@Controller('admin/folders')
@UseGuards(JwtGuard, AbilititsGuard)
export class AdminFoldersController extends FoldersController {
  constructor(protected readonly foldersService: AdminFoldersService) {
    super(foldersService);
  }

  @Get()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getFoldersByPaging(
    @Query() query: IGetPagingQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const folders = await super.getFoldersByPaging(query, res);
    return folders;
  }

  @Get('count')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getBlogsTotoalCount() {
    const total = await super.getBlogsTotoalCount();
    return total;
  }

  @Get(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async getFolderById(@Param('id', ParseIntPipe) id: number) {
    const folder = await super.getFolderById(id);
    return folder;
  }

  @Post()
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async addFolder(@Body() addFolderDto: IAddFolderDto) {
    const folder = await this.foldersService.add(addFolderDto);
    return folder;
  }

  @Put(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async updateFolder(@Body() updateFolderDto: IUpdateFolderDto) {
    const folder = await this.foldersService.update(updateFolderDto);
    return folder;
  }

  @Delete(':id')
  @CheckAbilites({ action: Action.Manage, subject: Subject.All })
  async deleteFolder(@Param('id', ParseIntPipe) id: number) {
    await this.foldersService.deleteById(id);
  }
}
