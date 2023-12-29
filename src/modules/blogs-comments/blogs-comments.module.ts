import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { BlogsCommentsController } from './blogs-comments.controller';
import { BlogsCommentsService } from './blogs-comments.service';
import { blogsCommentsProviders } from './blogs-comments.providers';
import { RedisCliModule } from '../redis-cli/redis-cli.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [DatabaseModule, RedisCliModule, AccountsModule],
  controllers: [BlogsCommentsController],
  providers: [...blogsCommentsProviders, BlogsCommentsService],
  exports: [BlogsCommentsService],
})
export class BlogsCommentsModule {}
