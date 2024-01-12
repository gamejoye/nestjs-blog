import { Test, TestingModule } from '@nestjs/testing';
import { PermissionManageService } from './permission-manage.service';

describe('PermissionManageService', () => {
  let service: PermissionManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionManageService],
    }).compile();

    service = module.get<PermissionManageService>(PermissionManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
