import { Test, TestingModule } from '@nestjs/testing';
import { AdminBlogsController } from './admin.blogs.controller';

describe('AdminBlogsController', () => {
  let controller: AdminBlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBlogsController],
    }).compile();

    controller = module.get<AdminBlogsController>(AdminBlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
