import { IsNumber, IsString } from 'class-validator';

export class ILoginUserDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;
}
