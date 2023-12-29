import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class IUpdateTagDto {
  @IsInt()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDateString()
  readonly createTime: string;

  @IsBoolean()
  readonly deleted: boolean;
}
