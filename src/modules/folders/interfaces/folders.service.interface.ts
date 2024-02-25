import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { Folder } from '../entities/folder.entity';

export interface IFoldersService {
  getById(id: number): Promise<Folder>;
  countAll(): Promise<number>;
  getByPaging(query: IGetPagingQueryDto): Promise<Folder[]>;
  getByBlogIds(blogIds: number[]): Promise<Folder[]>;
}
