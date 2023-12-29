import { Test, TestingModule } from '@nestjs/testing';
import { PlatformProfilesService } from './platform-profiles.service';

describe('PlatformProfilesService', () => {
  let service: PlatformProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformProfilesService],
    }).compile();

    service = module.get<PlatformProfilesService>(PlatformProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
