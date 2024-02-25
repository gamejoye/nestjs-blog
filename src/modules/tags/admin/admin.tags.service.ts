import { Injectable } from '@nestjs/common';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { TagsService } from '../tags.service';
import { IAdminTagsService } from '../interfaces/admin.tags.service.interface';
import { IUpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../entities/tag.entity';
import { IAddTagDto } from '../dto/add-tag.dto';

@Injectable()
export class AdminTagsService extends TagsService implements IAdminTagsService {
  async countAll() {
    return await this.tagRepository.count();
  }
  async getByPaging(query: IGetPagingQueryDto) {
    const amount = query._end - query._start;
    const skip = query._start;
    const { _sort: sort, _order: order } = query;
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .orderBy(`tag.${sort}`, order)
      .skip(skip)
      .take(amount)
      .getMany();
    return tags;
  }
  async getById(id: number) {
    const tag = await this.tagRepository.findOne({
      where: {
        id,
      },
    });
    return tag;
  }
  async update(updateTagDto: IUpdateTagDto) {
    const partialTag: Partial<Tag> = {
      id: updateTagDto.id,
      name: updateTagDto.name,
      createTime: updateTagDto.createTime,
      deleted: updateTagDto.deleted,
    };
    const newTag = await this.tagRepository.save(partialTag);
    return newTag;
  }
  async add(addTagdto: IAddTagDto) {
    const partialTag: Partial<Tag> = {
      ...addTagdto,
      createTime: getCurrentDatetime(),
      deleted: false,
    };
    const tag = await this.tagRepository.save(partialTag);
    return tag;
  }
  async deleteById(tagId: number) {
    const tag = await this.tagRepository.findOneBy({ id: tagId });
    if (tag) {
      const partialTag: Partial<Tag> = {
        deleted: true,
      };
      Object.assign(tag, partialTag);
      await this.tagRepository.save(tag);
      return true;
    }
    throw new Error();
  }
  async getByBlogIds(blogIds: number[]) {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .innerJoin('blogs', 'blog')
      .where('blog.id IN (:...blogIds)', { blogIds })
      .getMany();
    return tags;
  }
}
