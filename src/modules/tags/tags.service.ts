import { Inject, Injectable } from '@nestjs/common';
import { IAddTagDto } from './dto/add-tag.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { TAG_REPOSITORY } from 'src/common/constants/providers';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { IUpdateTagDto } from './dto/update-tag.dto';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';

@Injectable()
export class TagsService {
  constructor(
    @Inject(TAG_REPOSITORY)
    private tagRepository: Repository<Tag>,
  ) {}
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
  async getAll() {
    const tags = await this.tagRepository.find();
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
