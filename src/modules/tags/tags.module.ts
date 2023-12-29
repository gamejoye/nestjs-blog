import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { tagsProviders } from './tags.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [...tagsProviders, TagsService],
})
export class TagsModule {}
