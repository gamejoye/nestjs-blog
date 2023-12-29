import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { blogsProviders } from './blogs.providers';
import { BlogsCommentsModule } from '../blogs-comments/blogs-comments.module';

@Module({
  imports: [DatabaseModule, BlogsCommentsModule],
  controllers: [BlogsController],
  providers: [...blogsProviders, BlogsService],
})
export class BlogsModule {}
