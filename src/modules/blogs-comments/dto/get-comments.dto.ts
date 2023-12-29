import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class IGetCommentsQueryDto {
  @IsDateString()
  @IsOptional()
  readonly timestamp?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  readonly amount?: number = 10;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly parent_comment_id?: number;
}
