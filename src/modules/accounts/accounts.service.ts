import { Inject, Injectable } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY,
  DATA_SOURCE,
  ROLE_REPOSITORY,
} from 'src/common/constants/providers';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { IAddAcountDto } from './dto/add-account.dto';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { IPlatform } from 'src/common/types/base.type';
import { IAccountsService } from './interfaces/accounts.service.interface';
import { Role } from '../permission-manage/entitits/role.entity';

@Injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @Inject(DATA_SOURCE) private dataSouce: DataSource,
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: Repository<Account>,
    @Inject(ROLE_REPOSITORY) private roleRepository: Repository<Role>,
  ) {}
  async getByUsername(username: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        username,
      },
      relations: ['platformProfile'],
    });
    return account;
  }

  async add(accountDto: IAddAcountDto) {
    const createTime = getCurrentDatetime();
    const defaultRole = await this.roleRepository.findOne({
      where: {
        roleName: '普通用户',
      },
    });
    const partialAccount: DeepPartial<Account> = {
      ...accountDto,
      createTime,
      roles: [defaultRole],
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
