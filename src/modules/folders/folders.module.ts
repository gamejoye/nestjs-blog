import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { foldersProviders } from './folders.providers';
import { AdminFoldersController } from './admin/admin.folders.controller';
import { AdminFoldersService } from './admin/admin.folders.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FoldersController, AdminFoldersController],
  providers: [...foldersProviders, FoldersService, AdminFoldersService],
})
export class FoldersModule {}
