import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ILoginDto } from './dto/login.dto';
import { InformationService } from '../information/information.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Information } from '../information/entities/information.entity';
import { TOKEN_EXPIRATION } from 'src/common/constants/redis';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private informationService: InformationService) { }

  @Post('login')
  async login(@Body() { name, password }: ILoginDto) {
    const information = await this.informationService.getByName(name);
    console.log(information);
    const passwordCorrect =
      information === null
        ? false
        : await bcrypt.compare(password, information.passwordHash);
    if (!passwordCorrect) {
      throw new HttpException(
        'name or password invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = jwt.sign({ name }, process.env.SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });
    const json: Partial<Information & { token: string }> = {
      name: information.name,
      avatarUrl: information.avatarUrl,
      sex: information.sex,
      address: information.address,
      birthday: information.birthday,
      aboutMe: information.aboutMe,
      token,
    };
    return json;
  }
}
