import { Account } from 'src/modules/accounts/entities/account.entity';
import { PlatformProfile } from 'src/modules/platform-profiles/entities/platform-profile.entity';

export const initialAccount1: Account = {
  id: 1,
  platformProfile: { id: 1 } as PlatformProfile,
  webUrl: 'https://gamejoye.top',
  description: '哲的第一章',
  createTime: new Date().toISOString(),
};

export const initialAccount2: Account = {
  id: 2,
  platformProfile: { id: 2 } as PlatformProfile,
  webUrl: 'https://www.example.com',
  description: '示例网站',
  createTime: new Date().toISOString(),
};

export const initialAccount3: Account = {
  id: 3,
  platformProfile: { id: 3 } as PlatformProfile,
  webUrl: 'https://ai.calculate.fast',
  description: 'ai云计算',
  createTime: new Date().toISOString(),
};
