import { IsOptional, IsString } from 'class-validator';
import { IGetPagingQueryDto } from 'src/common/types/base.dto';

export class IGetBlogsQueryDto extends IGetPagingQueryDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsString()
  @IsOptional()
  folder?: string;
}
