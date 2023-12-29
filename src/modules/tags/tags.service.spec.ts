import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { DatabaseModule } from 'src/modules/database/database.module';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TagsService],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
