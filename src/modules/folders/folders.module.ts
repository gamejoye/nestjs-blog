import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { foldersProviders } from './folders.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FoldersController],
  providers: [...foldersProviders, FoldersService],
})
export class FoldersModule {}
