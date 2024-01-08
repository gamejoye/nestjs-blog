import { IAuthGithubCallbackDto } from 'src/modules/github-auth/dto/auth-github-callback.dto';
import { PlatformProfile } from '../entities/platform-profile.entity';

export interface IPlatformProfilesService {
  createByGithubAuthCallbackDto(
    dto: IAuthGithubCallbackDto,
  ): Promise<PlatformProfile>;
}
