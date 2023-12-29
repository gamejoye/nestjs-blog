import { Inject, Injectable } from '@nestjs/common';
import { INFORMATION_REPOSITORY } from 'src/common/constants/providers';
import { Repository } from 'typeorm';
import { Information } from './entities/information.entity';
import * as bcrypt from 'bcrypt';
import { IAddInformationDto } from './dto/add-information.dto';

@Injectable()
export class InformationService {
  constructor(
    @Inject(INFORMATION_REPOSITORY)
    private informationRepository: Repository<Information>,
  ) {}
  async getByName(name: string) {
    const information = await this.informationRepository.findOne({
      where: { name },
    });
    return information;
  }
  async add(dto: IAddInformationDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const information: Information = {
      ...dto,
      passwordHash,
    };
    return await this.informationRepository.save(information);
  }
}
