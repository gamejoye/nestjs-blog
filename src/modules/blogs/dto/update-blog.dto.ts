import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class IUpdateBlogDto {
  @IsInt()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsInt()
  readonly priority: number;

  @IsInt()
  @Min(0)
  readonly views: number;

  @IsDateString()
  readonly createTime: string;

  @IsBoolean()
  readonly deleted: boolean;

  @IsArray()
  @ValidateNested()
  @Type(() => ITagForUpdateBlogDto)
  readonly tags: ITagForUpdateBlogDto[];

  @IsArray()
  @ValidateNested()
  @Type(() => IFolderForUpdateBlogDto)
  readonly folders: IFolderForUpdateBlogDto[];
}

class ITagForUpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

class IFolderForUpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
