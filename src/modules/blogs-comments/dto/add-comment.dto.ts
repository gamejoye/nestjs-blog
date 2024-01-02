import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { BlogComment } from '../entities/blog-comment.entity';
import { Type } from 'class-transformer';

class IAccountForAddCommentDto {
  @IsInt()
  id: number;
}

class IBlogForAddCommentDto {
  @IsInt()
  id: number;
}

export class IAddCommentDto {
  @ValidateNested()
  @Type(() => IBlogForAddCommentDto)
  readonly blog: IBlogForAddCommentDto;

  @ValidateNested()
  @Type(() => IAccountForAddCommentDto)
  readonly account: IAccountForAddCommentDto;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsInt()
  @IsOptional()
  readonly parentComment?: BlogComment;
}
