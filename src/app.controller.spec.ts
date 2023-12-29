import { Test, TestingModule } from '@nestjs/testing';
import { BlogsModule } from './modules/blogs/blogs.module';
import { InformationModule } from './modules/information/information.module';
import { UsersModule } from './modules/users/users.module';

describe('App test start!', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [BlogsModule, InformationModule, UsersModule],
    }).compile();
  });

  it('AppModule should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
