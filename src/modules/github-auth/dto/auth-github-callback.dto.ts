import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class IAuthGithubCallbackDto {
  @IsInt()
  @Type(() => Number)
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  readonly created_at: string;

  @IsDateString()
  @IsOptional()
  readonly updated_at?: string;

  @IsString()
  readonly accessToken: string;

  @IsString()
  @IsOptional()
  readonly refreshToken?: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly photos: IPhotoDto[];
}

class IPhotoDto {
  @IsString()
  value: string;
}
/**
 * id: '88575063',
  displayName: null,
  username: 'gamejoye',
  profileUrl: 'https://github.com/gamejoye',
  photos: [ { value: 'https://avatars.githubusercontent.com/u/88575063?v=4' } ]
  created_at: '2021-08-07T07:28:50Z',
    updated_at: '2023-11-18T14:05:33Z'
 */
