import { Global, Module } from '@nestjs/common';
import { PermissionManageService } from './permission-manage.service';
import { DatabaseModule } from '../database/database.module';
import { permissionManageProviders } from './permission-manage.providers';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [...permissionManageProviders, PermissionManageService],
  exports: [PermissionManageService],
})
export class PermissionManageModule {}
