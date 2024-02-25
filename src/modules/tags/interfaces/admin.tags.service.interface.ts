import { Tag } from '../entities/tag.entity';
import { IUpdateTagDto } from '../dto/update-tag.dto';
import { IAddTagDto } from '../dto/add-tag.dto';
import { ITagsService } from './tags.service.interface';

export interface IAdminTagsService extends ITagsService {
  update(updateTagDto: IUpdateTagDto): Promise<Tag>;
  add(addTagdto: IAddTagDto): Promise<Tag>;
  deleteById(tagId: number): Promise<boolean>;
}
