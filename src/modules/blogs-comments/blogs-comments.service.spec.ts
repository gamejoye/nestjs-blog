import { Test, TestingModule } from '@nestjs/testing';
import { BlogsCommentsService } from './blogs-comments.service';
import { DatabaseModule } from 'src/modules/database/database.module';

describe('BlogsCommentsService', () => {
  let service: BlogsCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [BlogsCommentsService],
    }).compile();

    service = module.get<BlogsCommentsService>(BlogsCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
