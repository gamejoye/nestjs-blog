import { Type } from 'class-transformer';
import { IsIn, IsInt, IsString } from 'class-validator';

export class IGetPagingQueryDto {
  @IsInt()
  @Type(() => Number)
  _start: number;

  @IsInt()
  @Type(() => Number)
  _end: number;

  @IsString()
  @IsIn(['ASC', 'DESC'])
  _order: 'ASC' | 'DESC' = 'ASC';

  @IsString()
  _sort: string;
}
