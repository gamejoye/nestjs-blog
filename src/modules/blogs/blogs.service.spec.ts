import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { initialBlogs } from 'src/common/test-datas/blog-data';
import {
  allProvidersForTypeorm,
  initializeDatabase,
} from 'src/common/utils/test-helper';

describe('BlogsService', () => {
  let service: BlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...allProvidersForTypeorm, BlogsService],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    await initializeDatabase(module);
  }, 10000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('blogs should be return', async () => {});
});
