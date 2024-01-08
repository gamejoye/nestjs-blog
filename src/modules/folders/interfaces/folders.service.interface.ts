import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { IUpdateFolderDto } from '../dto/update-folder.dto';
import { Folder } from '../entities/folder.entity';
import { IAddFolderDto } from '../dto/add-folder.dto';

export interface IFoldersService {
  update(updateFolderDto: IUpdateFolderDto): Promise<Folder>;
  deleteById(folderId: number): Promise<boolean>;
  getById(id: number): Promise<Folder>;
  countAll(): Promise<number>;
  getByPaging(query: IGetPagingQueryDto): Promise<Folder[]>;
  getByBlogIds(blogIds: number[]): Promise<Folder[]>;
  add(addFolderDto: IAddFolderDto): Promise<Folder>;
}
