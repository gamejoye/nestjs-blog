import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class IAddTagDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;
}
