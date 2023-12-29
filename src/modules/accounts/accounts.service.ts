import { Inject, Injectable } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY,
  PLATFORM_PROFILE_REPOSITORY,
} from 'src/common/constants/providers';
import { DeepPartial, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { PlatformProfile } from '../platform-profiles/entities/platform-profile.entity';
import { IAddAcountDto } from './dto/add-account.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { IPlatform } from 'src/common/types/base.type';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: Repository<Account>,
    @Inject(PLATFORM_PROFILE_REPOSITORY)
    private platformProfileRepository: Repository<PlatformProfile>,
  ) {}

  async add(accountDto: IAddAcountDto) {
    const createTime = getCurrentDatetime();
    const partialAccount: DeepPartial<Account> = {
      ...accountDto,
      createTime,
    };
    const account = await this.accountRepository.save(partialAccount);
    return account;
  }
  async getById(accountId: number) {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: ['platformProfile'],
    });
    return account;
  }
  async getByPlatformUserIdAndPlatform(
    platformUserId: number,
    platform: IPlatform,
  ) {
    const account = await this.accountRepository
      .createQueryBuilder('account')
      .innerJoinAndSelect('account.platformProfile', 'profile')
      .where('profile.platformUserId = :platformUserId', { platformUserId })
      .andWhere('profile.platform = :platform', { platform })
      .getOne();
    return account;
  }
}
