import { Test, TestingModule } from '@nestjs/testing';
import { InformationService } from './information.service';
import { initialInformation } from 'src/common/test-datas/information-data';
import { DatabaseModule } from 'src/modules/database/database.module';
import { initializeDatabase } from 'src/common/utils/test-helper';

describe('InformationService', () => {
  let service: InformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [InformationService],
    }).compile();

    service = module.get<InformationService>(InformationService);
    await initializeDatabase(module);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('information should to returned', async () => {
    const information = await service.get();
    expect(information).toEqual(initialInformation);
  });
});
