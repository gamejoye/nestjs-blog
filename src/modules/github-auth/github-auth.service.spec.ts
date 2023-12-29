import { Test, TestingModule } from '@nestjs/testing';
import { GithubAuthService } from './github-auth.service';

describe('GithubAuthService', () => {
  let service: GithubAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubAuthService],
    }).compile();

    service = module.get<GithubAuthService>(GithubAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
