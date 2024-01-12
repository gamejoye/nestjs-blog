import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BlogsModule } from './modules/blogs/blogs.module';
import { InformationModule } from './modules/information/information.module';
import { FoldersModule } from './modules/folders/folders.module';
import { TagsModule } from './modules/tags/tags.module';
import { BlogsCommentsModule } from './modules/blogs-comments/blogs-comments.module';
import { LoggerMiddleWare } from './common/middlewares/logger.middleware';
import { GithubAuthModule } from './modules/github-auth/github-auth.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { RedisCliModule } from './modules/redis-cli/redis-cli.module';
import { GithubAuthMiddleWare } from './common/middlewares/github-auth.middleware';
import { EnvConfigModule } from './modules/env-config/env-config.module';
import { PermissionManageModule } from './modules/permission-manage/permission-manage.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    BlogsModule,
    BlogsCommentsModule,
    FoldersModule,
    TagsModule,
    InformationModule,
    AccountsModule,
    RedisCliModule,
    GithubAuthModule,
    EnvConfigModule,
    PermissionManageModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(GithubAuthMiddleWare)
      .forRoutes({ path: 'auth/github/*', method: RequestMethod.GET });
  }
}
