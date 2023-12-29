import { Test, TestingModule } from '@nestjs/testing';
import { FoldersService } from './folders.service';
import { DatabaseModule } from 'src/modules/database/database.module';

describe('FoldersService', () => {
  let service: FoldersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [FoldersService],
    }).compile();

    service = module.get<FoldersService>(FoldersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
