import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { GITHUB, QQ, WECHAT } from 'src/common/constants/platforms';
import { IPlatform } from 'src/common/types/base.type';

class IPlatformProfileForAddAccount {
  @IsString()
  @IsIn([QQ, WECHAT, GITHUB])
  platform: IPlatform;

  @IsInt()
  @Type(() => Number)
  platformUserId: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @IsString()
  accessToken: string;
}

export class IAddAcountDto {
  @IsString()
  @IsOptional()
  webUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ValidateNested()
  @Type(() => IPlatformProfileForAddAccount)
  platformProfile: IPlatformProfileForAddAccount;
}
