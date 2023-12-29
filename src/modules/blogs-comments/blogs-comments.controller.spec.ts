import { Test, TestingModule } from '@nestjs/testing';
import { BlogsCommentsController } from './blogs-comments.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { BlogsCommentsService } from './blogs-comments.service';

describe('BlogsCommentsController', () => {
  let controller: BlogsCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [BlogsCommentsController],
      providers: [BlogsCommentsService],
    }).compile();

    controller = module.get<BlogsCommentsController>(BlogsCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
