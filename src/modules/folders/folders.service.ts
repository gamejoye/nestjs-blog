import { Inject, Injectable } from '@nestjs/common';
import { IAddFolderDto } from './dto/add-folder.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { FOLDER_REPOSITORY } from 'src/common/constants/providers';
import { IUpdateFolderDto } from './dto/update-folder.dto';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IFoldersService } from './interfaces/folders.service.interface';

@Injectable()
export class FoldersService implements IFoldersService {
  constructor(
    @Inject(FOLDER_REPOSITORY)
    private folderRepository: Repository<Folder>,
  ) {}
  async update(updateFolderDto: IUpdateFolderDto) {
    const partialFolder: Partial<Folder> = {
      id: updateFolderDto.id,
      name: updateFolderDto.name,
      createTime: updateFolderDto.createTime,
      deleted: updateFolderDto.deleted,
    };
    const folder = await this.folderRepository.save(partialFolder);
    return folder;
  }
  async deleteById(folderId: number) {
    const folder = await this.folderRepository.findOneBy({ id: folderId });
    if (folder) {
      const partialFolder: Partial<Folder> = {
        deleted: true,
      };
      Object.assign(folder, partialFolder);
      console.log('folder: ', folder);
      await this.folderRepository.save(folder);
      return true;
    }
    throw new Error('folder not found');
  }
  async getById(id: number) {
    const folder = await this.folderRepository.findOne({
      where: {
        id,
      },
    });
    return folder;
  }
  async countAll() {
    return await this.folderRepository.count();
  }
  async getByPaging(query: IGetPagingQueryDto) {
    const amount = query._end - query._start;
    const skip = query._start;
    const { _sort: sort, _order: order } = query;
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .orderBy(`folder.${sort}`, order)
      .skip(skip)
      .take(amount)
      .getMany();
    return folders;
  }
  async getByBlogIds(blogIds: number[]) {
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .innerJoin('folder.blogs', 'blog')
      .where('blog.id IN (:...blogIds)', { blogIds })
      .getMany();
    return folders;
  }

  async add(addFolderDto: IAddFolderDto) {
    const partialBlog: Partial<Folder> = {
      ...addFolderDto,
      createTime: getCurrentDatetime(),
      deleted: false,
    };
    const folder = await this.folderRepository.save(partialBlog);
    return folder;
  }
}
