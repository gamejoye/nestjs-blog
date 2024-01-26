import { Inject, Injectable } from '@nestjs/common';
import { PLATFORM_PROFILE_REPOSITORY } from 'src/common/constants/providers';
import { Repository } from 'typeorm';
import { PlatformProfile } from './entities/platform-profile.entity';
import { IAuthGithubCallbackDto } from '../auth/dto/auth-github-callback.dto';
import { GITHUB } from 'src/common/constants/platforms';
import { IPlatformProfilesService } from './interfaces/platform-profiles.service.interface';

@Injectable()
export class PlatformProfilesService implements IPlatformProfilesService {
  constructor(
    @Inject(PLATFORM_PROFILE_REPOSITORY)
    private platformProfileRepository: Repository<PlatformProfile>,
  ) {}
  async createByGithubAuthCallbackDto(dto: IAuthGithubCallbackDto) {
    const partialProfile: Partial<PlatformProfile> = {
      platform: GITHUB,
      platformUserId: dto.id,
      username: dto.username,
      avatarUrl: dto.photos[0].value,
      accessToken: dto.accessToken,
    };
    const profile = await this.platformProfileRepository.save(partialProfile);
    return profile;
  }
}
