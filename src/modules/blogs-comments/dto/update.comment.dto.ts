import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class IBlogForUpdateBlogCommentDto {
  @IsInt()
  id: string;
}

export class IUpdateBlogCommentDto {
  @IsInt()
  readonly id: number;

  @ValidateNested()
  @Type(() => IBlogForUpdateBlogCommentDto)
  readonly blog: IBlogForUpdateBlogCommentDto;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => IUpdateBlogCommentDto)
  readonly parentComment: IUpdateBlogCommentDto;

  @IsDateString()
  readonly createTime: string;

  @IsDateString()
  @IsOptional()
  readonly editTime: string;

  @IsBoolean()
  readonly deleted: boolean;
}
