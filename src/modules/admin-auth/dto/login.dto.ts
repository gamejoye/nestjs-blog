import { IsNotEmpty, IsString } from 'class-validator';

export class ILoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
