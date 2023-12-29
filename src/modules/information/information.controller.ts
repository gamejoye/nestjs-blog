import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InformationService } from './information.service';
import { AdminAuthGuard } from 'src/common/guards/admin-token-auto.guard';
import * as jwt from 'jsonwebtoken';
import { getTokenFromRequest } from 'src/common/utils/auth';
import { Request } from 'express';

@Controller('informations')
export class InformationController {
  constructor(private informationService: InformationService) {}

  @Get('')
  @UseGuards(AdminAuthGuard)
  async getInformationByName(@Req() req: Request) {
    // console.log('in');
    const token = getTokenFromRequest(req);
    // console.log('token', token);
    const { name } = jwt.verify(token, process.env.SECRET) as {
      name: string | null;
    };
    // console.log('name', name);
    const information = await this.informationService.getByName(name);
    // console.log('info', information);
    return information;
  }
}
