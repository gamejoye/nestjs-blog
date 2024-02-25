import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { tagsProviders } from './tags.providers';
import { AdminTagsController } from './admin/admin.tags.controller';
import { AdminTagsService } from './admin/admin.tags.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController, AdminTagsController],
  providers: [...tagsProviders, TagsService, AdminTagsService],
})
export class TagsModule {}
