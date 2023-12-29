import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class IAddInformationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  sex: 'w' | 'm';

  @IsString()
  @IsOptional()
  address: string;

  @IsDateString()
  @IsOptional()
  birthday: string;

  @IsString()
  @IsOptional()
  aboutMe: string;
}
