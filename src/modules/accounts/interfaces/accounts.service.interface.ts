import { IPlatform } from 'src/common/types/base.type';
import { IAddAcountDto } from '../dto/add-account.dto';
import { Account } from '../entities/account.entity';

export interface IAccountsService {
  add(accountDto: IAddAcountDto): Promise<Account>;
  getById(accountId: number): Promise<Account>;
  getByPlatformUserIdAndPlatform(
    platformUserId: number,
    platform: IPlatform,
  ): Promise<Account>;
  getByUsername(userName: string): Promise<Account>;
}
