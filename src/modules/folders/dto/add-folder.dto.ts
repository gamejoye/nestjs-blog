import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class IAddFolderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;
}
