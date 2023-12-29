import { Module } from '@nestjs/common';
import { RedisCliService } from './redis-cli.service';

@Module({
  providers: [RedisCliService],
  exports: [RedisCliService],
})
export class RedisCliModule {}
