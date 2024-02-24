import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { blogsProviders } from './blogs.providers';
import { BlogsCommentsModule } from '../blogs-comments/blogs-comments.module';
import { AdminBlogsController } from './admin/admin.blogs.controller';
import { AdminBlogsService } from './admin/admin.blogs.service';

@Module({
  imports: [DatabaseModule, BlogsCommentsModule],
  controllers: [BlogsController, AdminBlogsController],
  providers: [...blogsProviders, BlogsService, AdminBlogsService],
})
export class BlogsModule {}
