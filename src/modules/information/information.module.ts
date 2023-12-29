import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { informationProviders } from './information.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InformationController],
  providers: [...informationProviders, InformationService],
  exports: [InformationService],
})
export class InformationModule {}
