import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { Tag } from '../entities/tag.entity';
import { IUpdateTagDto } from '../dto/update-tag.dto';
import { IAddTagDto } from '../dto/add-tag.dto';

export interface ITagsService {
  countAll(): Promise<number>;
  getByPaging(query: IGetPagingQueryDto): Promise<Tag[]>;
  getById(id: number): Promise<Tag>;
  update(updateTagDto: IUpdateTagDto): Promise<Tag>;
  add(addTagdto: IAddTagDto): Promise<Tag>;
  deleteById(tagId: number): Promise<boolean>;
  getByBlogIds(blogIds: number[]): Promise<Tag[]>;
}
