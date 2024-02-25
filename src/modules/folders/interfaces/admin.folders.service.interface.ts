import { IUpdateFolderDto } from '../dto/update-folder.dto';
import { Folder } from '../entities/folder.entity';
import { IAddFolderDto } from '../dto/add-folder.dto';
import { IFoldersService } from './folders.service.interface';

export interface IAdminFoldersService extends IFoldersService {
  update(updateFolderDto: IUpdateFolderDto): Promise<Folder>;
  deleteById(folderId: number): Promise<boolean>;
  add(addFolderDto: IAddFolderDto): Promise<Folder>;
}
