import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { Tag } from '../entities/tag.entity';

export interface ITagsService {
  countAll(): Promise<number>;
  getByPaging(query: IGetPagingQueryDto): Promise<Tag[]>;
  getById(id: number): Promise<Tag>;
  getByBlogIds(blogIds: number[]): Promise<Tag[]>;
}
