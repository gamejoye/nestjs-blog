import { Inject, Injectable } from '@nestjs/common';
import { TAG_REPOSITORY } from 'src/common/constants/providers';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';
import { ITagsService } from './interfaces/tags.service.interface';

@Injectable()
export class TagsService implements ITagsService {
  constructor(
    @Inject(TAG_REPOSITORY)
    protected tagRepository: Repository<Tag>,
  ) {}
  async countAll() {
    return await this.tagRepository.count({ where: { deleted: false } });
  }
  async getByPaging(query: IGetPagingQueryDto) {
    const amount = query._end - query._start;
    const skip = query._start;
    const { _sort: sort, _order: order } = query;
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.deleted = :deleted', { deleted: false })
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
        deleted: false,
      },
    });
    return tag;
  }
  async getByBlogIds(blogIds: number[]) {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .innerJoin('tag.blogs', 'blog', 'blog.deleted = :deleted', {
        deleted: false,
      })
      .where('blog.id IN (:...blogIds)', { blogIds })
      .getMany();
    return tags;
  }
}
