import { Test, TestingModule } from '@nestjs/testing';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { DatabaseModule } from 'src/modules/database/database.module';

describe('InformationController', () => {
  let controller: InformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [InformationController],
      providers: [InformationService],
    }).compile();

    controller = module.get<InformationController>(InformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
