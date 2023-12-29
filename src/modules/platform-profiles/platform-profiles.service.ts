import { Inject, Injectable } from '@nestjs/common';
import { PLATFORM_PROFILE_REPOSITORY } from 'src/common/constants/providers';
import { Repository } from 'typeorm';
import { PlatformProfile } from './entities/platform-profile.entity';
import { IAuthGithubCallbackDto } from '../github-auth/dto/auth-github-callback.dto';
import { GITHUB } from 'src/common/constants/platforms';

@Injectable()
export class PlatformProfilesService {
  constructor(
    @Inject(PLATFORM_PROFILE_REPOSITORY)
    private platformProfileRepository: Repository<PlatformProfile>,
  ) {}
  async createByGithubAuthCallbackDto(dto: IAuthGithubCallbackDto) {
    const partialProfile: Partial<PlatformProfile> = {
      platform: GITHUB,
      platformUserId: dto.id,
      name: dto.username,
      createTime: dto.created_at,
      editTime: dto.updated_at,
      avatarUrl: dto.photos[0].value,
    };
    const profile = await this.platformProfileRepository.save(partialProfile);
    return profile;
  }
}
