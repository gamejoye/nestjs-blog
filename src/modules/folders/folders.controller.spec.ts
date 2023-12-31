import { Test, TestingModule } from '@nestjs/testing';
import { FoldersController } from './folders.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { FoldersService } from './folders.service';

describe('FoldersController', () => {
  let controller: FoldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [FoldersController],
      providers: [FoldersService],
    }).compile();

    controller = module.get<FoldersController>(FoldersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
