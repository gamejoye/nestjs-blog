import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { FOLDER_REPOSITORY } from 'src/common/constants/providers';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IFoldersService } from './interfaces/folders.service.interface';

@Injectable()
export class FoldersService implements IFoldersService {
  constructor(
    @Inject(FOLDER_REPOSITORY)
    protected folderRepository: Repository<Folder>,
  ) {}
  async getById(id: number) {
    const folder = await this.folderRepository.findOne({
      where: {
        id,
        deleted: false,
      },
    });
    return folder;
  }
  async countAll() {
    return await this.folderRepository.count({
      where: {
        deleted: false,
      },
    });
  }
  async getByPaging(query: IGetPagingQueryDto) {
    const amount = query._end - query._start;
    const skip = query._start;
    const { _sort: sort, _order: order } = query;
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .where('folder.deleted = :deleted', { deleted: false })
      .orderBy(`folder.${sort}`, order)
      .skip(skip)
      .take(amount)
      .getMany();
    return folders;
  }
  async getByBlogIds(blogIds: number[]) {
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .innerJoin('folder.blogs', 'blog', 'blog.deleted = :deleted', {
        deleted: false,
      })
      .where('blog.id IN (:...blogIds)', { blogIds })
      .andWhere('folder.deleted = :deleted', { deleted: false })
      .getMany();
    return folders;
  }
}
