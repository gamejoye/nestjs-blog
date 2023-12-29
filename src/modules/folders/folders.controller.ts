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
import { FoldersService } from './folders.service';
import { IAddFolderDto } from './dto/add-folder.dto';
import { Response } from 'express';
import { setXTotalCount } from 'src/common/utils/response-transform';
import { IUpdateFolderDto } from './dto/update-folder.dto';
import { AdminAuthGuard } from 'src/common/guards/admin-token-auto.guard';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Get()
  async getAllFolders(@Res({ passthrough: true }) res: Response) {
    const folders = await this.foldersService.getAll();
    setXTotalCount(res, folders.length);
    return folders;
  }

  @Get(':id')
  async getFolderById(@Param('id', ParseIntPipe) id: number) {
    const folder = await this.foldersService.getById(id);
    return folder;
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async addFolder(@Body() addFolderDto: IAddFolderDto) {
    const folder = await this.foldersService.add(addFolderDto);
    return folder;
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  async updateFolder(@Body() updateFolderDto: IUpdateFolderDto) {
    const folder = await this.foldersService.update(updateFolderDto);
    return folder;
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async deleteFolder(@Param('id', ParseIntPipe) id: number) {
    await this.foldersService.deleteById(id);
  }
}
